import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, mkdir, copyFile, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { repositoryRoot as root, commandRunner, buildEnvironment, runtimeInventory, checkRecipe, checkRelease } from './build.mjs';
import { configureOptions, hostOptions, targets, wasmOptions } from './config.mjs';
import { serveAssets } from '../harness/server.mjs';
import { launchBrowser } from '../harness/browser.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export async function reference(workspace) {
  const run = commandRunner(join(workspace, 'reference.log'));
  const env = buildEnvironment(process.env);
  const execute = (command,args,cwd=root,capture=false)=>run(command,args,{cwd,env,capture});
  const inputs = JSON.parse(await execute('bash',[join(root,'tools/inputs.sh'),'acquire','--lock',join(root,'inputs/sources.lock.json')],root,true));
  await checkRecipe(inputs.sqlite.sourcePath);
  await execute('env',[...hostOptions,'./configure',...configureOptions],inputs.sqlite.sourcePath);
  await execute('make',['sqlite3.c'],inputs.sqlite.sourcePath);
  await checkRelease(inputs.sqlite.sourcePath,inputs.sqlite.version);
  await execute('make',[...targets,...wasmOptions],join(inputs.sqlite.sourcePath,'ext/wasm'));
  const runtimeDirectory=join(inputs.sqlite.sourcePath,'ext/wasm/jswasm');
  return {inputs,runtimeDirectory,runtimeFiles:await runtimeInventory(runtimeDirectory)};
}

export async function fixture(workspace,label,handoff) {
  const directory=join(workspace,label); await mkdir(directory);
  for(const file of handoff.runtimeFiles) {
    const bytes=await readFile(join(handoff.runtimeDirectory,file.name));
    assert.equal(bytes.length,file.size); assert.equal(hash(bytes),file.sha256);
    await copyFile(join(handoff.runtimeDirectory,file.name),join(directory,file.name));
  }
  await copyFile(join(root,'tools/build/browser-probe.mjs'),join(directory,'probe.mjs'));
  await writeFile(join(directory,'index.html'),'<!doctype html><meta charset="utf-8"><title>A-build fixture</title>');
  for(const [mode,loader] of [['vanilla','sqlite3.js'],['esm','sqlite3.mjs'],['bundler','sqlite3-bundler-friendly.mjs']]) {
    const initialize=mode==='vanilla' ? `importScripts('./${loader}'); const initialize=globalThis.sqlite3InitModule;` : `import initialize from './${loader}';`;
    const probeImport=mode==='vanilla' ? `const {probe}=await import('./probe.mjs');` : '';
    await writeFile(join(directory,`probe-${mode}.${mode==='vanilla'?'js':'mjs'}`),
      `${mode==='vanilla'?'':"import {probe} from './probe.mjs';"}${initialize}\nonmessage=async ev=>{try{${probeImport} const s=await initialize(); postMessage({result:await probe(s,ev.data.vector,true)});}catch(e){postMessage({error:e.stack});}};`);
  }
  return directory;
}

export async function inspect(browser,directory,vector,version) {
  const server=await serveAssets(directory);
  const context=await browser.newContext();
  const results={};
  try {
    for(const mode of ['vanilla','esm','bundler']) {
      console.error(`Browser ${vector ? 'constructed' : 'baseline'}: ${mode} main/Worker/Worker1/promiser`);
      const page=await context.newPage(); await page.goto(server.origin);
      if(mode==='vanilla') await page.addScriptTag({url:`${server.origin}/sqlite3.js`});
      results[`${mode}-main`]=await page.evaluate(async ({mode,vector})=>{
        const init=mode==='vanilla'?globalThis.sqlite3InitModule:(await import(mode==='esm'?'./sqlite3.mjs':'./sqlite3-bundler-friendly.mjs')).default;
        const s=await init(); return (await import('./probe.mjs')).probe(s,vector,false);
      },{mode,vector});
      console.error(`  ${mode}: main passed`);
      results[`${mode}-worker`]=await page.evaluate(({mode,vector})=>new Promise((accept,reject)=>{
        const worker=new Worker(`./probe-${mode}.${mode==='vanilla'?'js':'mjs'}`,{type:mode==='vanilla'?'classic':'module'});
        const timer=setTimeout(()=>{worker.terminate();reject(Error('Worker probe timeout'));},30000);
        worker.onerror=ev=>{clearTimeout(timer);worker.terminate();reject(Error(ev.message));};
        worker.onmessage=ev=>{clearTimeout(timer);worker.terminate();ev.data.error?reject(Error(ev.data.error)):accept(ev.data.result);};
        worker.postMessage({vector});
      }),{mode,vector});
      console.error(`  ${mode}: Worker passed`);
      if(mode==='vanilla') await page.addScriptTag({url:`${server.origin}/sqlite3-worker1-promiser.js`});
      const workerResult=await page.evaluate(async ({mode,vector})=>{
        const file=mode==='vanilla'?'sqlite3-worker1.js':mode==='esm'?'sqlite3-worker1.mjs':'sqlite3-worker1-bundler-friendly.mjs';
        const worker=new Worker(`./${file}`,{type:mode==='vanilla'?'classic':'module'});
        const ready=new Promise((accept,reject)=>{
          const timer=setTimeout(()=>reject(Error('Worker1 ready timeout')),30000);
          worker.onerror=ev=>{clearTimeout(timer);reject(Error(ev.message));};
          worker.onmessage=ev=>{if(ev.data.result==='worker1-ready'){clearTimeout(timer);accept();}};
        });
        let serial=0;
        const request=(type,args,dbId)=>new Promise((accept,reject)=>{
          const messageId=`build-${++serial}`;
          const timer=setTimeout(()=>reject(Error(`Worker1 ${type} timeout`)),30000);
          worker.onmessage=ev=>{if(ev.data.messageId===messageId){clearTimeout(timer);ev.data.type==='error'?reject(Error(JSON.stringify(ev.data))):accept(ev.data);}};
          worker.postMessage({type,args,dbId,messageId});
        });
        try {
          await ready;
          const opened=await request('open',{filename:':memory:'});
          const sql=vector?'select sqlite_version(), vec_version()':'select sqlite_version()';
          const result=await request('exec',{sql,resultRows:[],rowMode:'array'},opened.dbId);
          await request('close',{},opened.dbId);
          return result.result.resultRows;
        } finally {worker.terminate();}
      },{mode,vector});
      assert.equal(workerResult[0][0],version);
      if(vector) assert.equal(workerResult[0][1],`v${vector}`);
      console.error(`  ${mode}: Worker1 passed`);
      const promiseResult=await page.evaluate(async ({mode,vector})=>{
        const factory=mode==='vanilla'?globalThis.sqlite3Worker1Promiser.v2:(await import(mode==='esm'?'./sqlite3-worker1-promiser.mjs':'./sqlite3-worker1-promiser-bundler-friendly.mjs')).default;
        const Original=globalThis.Worker, workers=[];
        globalThis.Worker=class extends Original {constructor(...args){super(...args);workers.push(this);}};
        try {
          const p=await Promise.race([factory(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Promiser init timeout')),30000))]);
          const opened=await p('open',{filename:':memory:'});
          const sql=vector?'select sqlite_version(), vec_version()':'select sqlite_version()';
          const result=await p({type:'exec',dbId:opened.dbId,args:{sql,resultRows:[],rowMode:'array'}});
          await p({type:'close',dbId:opened.dbId});
          return result.result.resultRows;
        } finally {globalThis.Worker=Original;for(const worker of workers)worker.terminate();}
      },{mode,vector});
      assert.equal(promiseResult[0][0],version);
      if(vector) assert.equal(promiseResult[0][1],`v${vector}`);
      console.error(`  ${mode}: promiser passed`);
      await page.close();
    }
    for(const result of Object.values(results)) assert.equal(result.version,version);
    return results;
  } finally { await context.close(); await server.close(); }
}

export async function checkConstructed(handoff,baseline,workspace) {
  assert.deepEqual(baseline.inputs.lockDigest,handoff.inputs.lockDigest);
  const browser=await launchBrowser();
  try {
    const expected=await inspect(browser,await fixture(workspace,'baseline',baseline),false,baseline.inputs.sqlite.version);
    const actual=await inspect(browser,await fixture(workspace,'constructed',handoff),handoff.inputs.sqliteVec.version,handoff.inputs.sqlite.version);
    for(const [context,inventory] of Object.entries(expected)) for(const key of ['capi','oo1','dbMethods','exports','vfs','options','functions']) {
      const missing=inventory[key].filter(value=>!actual[context][key].includes(value));
      assert.deepEqual(missing,[],`${context}: missing baseline ${key}`);
    }
    await brokenCompanions(browser,join(workspace,'constructed'));
    const report={workspace,baseline,expected,actual};
    await writeFile(join(workspace,'checks.json'),JSON.stringify(report,null,2)+'\n');
    return {checks:join(workspace,'checks.json'),contexts:Object.keys(actual)};
  } finally { await browser.close(); }
}

async function brokenCompanions(browser,directory) {
  const server=await serveAssets(directory);
  try {
    for(const asset of ['sqlite3.wasm','sqlite3-worker1.mjs','sqlite3-opfs-async-proxy.js','corrupt-wasm']) {
      console.error(`Missing-companion check: ${asset}`);
      const context=await browser.newContext();
      const file=join(directory,asset==='corrupt-wasm'?'sqlite3.wasm':asset);
      await rename(file,`${file}.excluded`);
      try {
        if(asset==='corrupt-wasm')await writeFile(file,'invalid WASM bytes');
        const page=await context.newPage(); await page.goto(server.origin);
        const failed=await page.evaluate(async asset=>{
          if(asset==='sqlite3.wasm'||asset==='corrupt-wasm') {
            // Upstream abort can leave its initialization Promise pending.
            // The targeted failed fetch plus bounded lack of initialization
            // is a load failure, not a successful runtime or skipped test.
            try {
              const init=(await import('./sqlite3.mjs')).default;
              return await Promise.race([init().then(()=>false,()=>true),new Promise(accept=>setTimeout(()=>accept(true),5000))]);
            }catch{return true;}
          }
          return new Promise(accept=>{
            const worker=new Worker(asset==='sqlite3-worker1.mjs'?'./sqlite3-worker1.mjs':'./probe-esm.mjs',{type:'module'});
            const timer=setTimeout(()=>{worker.terminate();accept(false);},30000);
            const finish=value=>{clearTimeout(timer);worker.terminate();accept(value);};
            worker.onerror=()=>finish(true);
            worker.onmessage=ev=>{if(ev.data.error)console.error(ev.data.error);finish(!!ev.data.error);};
            if(asset!=='sqlite3-worker1.mjs')worker.postMessage({vector:false});
          });
        },asset);
        assert.equal(failed,true,`${asset}: missing companion must fail required initialization`);
      } finally {await context.close();await rename(`${file}.excluded`,file);}
    }
  } finally {await server.close();}
}

if(process.argv[1]?.endsWith('/build/check.mjs')) try {
  assert.equal(process.argv.length,3,'Usage: harness exec node tools/build/check.mjs HANDOFF_JSON');
  const handoff=JSON.parse(await readFile(process.argv[2],'utf8'));
  await mkdir(join(root,'.work/build-check'),{recursive:true});
  const workspace=await mkdtemp(join(root,'.work/build-check/run-'));
  const baseline=await reference(workspace);
  await writeFile(join(workspace,'reference.json'),JSON.stringify(baseline,null,2)+'\n');
  console.log(JSON.stringify(await checkConstructed(handoff,baseline,workspace)));
} catch(error) { console.error(error); process.exitCode=1; }
