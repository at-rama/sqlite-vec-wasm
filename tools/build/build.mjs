import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { appendFileSync } from 'node:fs';
import { lstat, readFile, writeFile, mkdir, mkdtemp, rename, realpath, readdir } from 'node:fs/promises';
import { isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { configureOptions, hostOptions, targets, wasmOptions, runtimeNames } from './config.mjs';

export const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

export function buildEnvironment(environment) {
  // Keep SDK activation, PATH and ordinary system settings, not ambient recipes.
  return Object.fromEntries(Object.entries(environment).filter(([name]) =>
    !/^(?:MAKEFLAGS|MAKEFILES|MFLAGS|GNUMAKEFLAGS|CC|CC_FOR_BUILD|CXX|CFLAGS|CPPFLAGS|CXXFLAGS|LDFLAGS|CPATH|C_INCLUDE_PATH|CPLUS_INCLUDE_PATH|OBJC_INCLUDE_PATH|LIBRARY_PATH)$/.test(name)
    && !/^(?:EMCC_|EMMAKEN_|SQLITE_|emcc[._]|cflags\.)/.test(name)));
}

export function cInclude(path) {
  // Both C #include and GNU Make input lists have path syntax constraints.
  // Reject rather than reinterpret an unsupported workspace path.
  if (!isAbsolute(path) || /[^A-Za-z0-9_./-]/u.test(path)) {
    throw new Error(`Unsupported source/build path: ${path}`);
  }
  return `"${path}"`;
}

export async function generateBridge(source, destination, template) {
  const path = await realpath(join(source, 'sqlite-vec.c'));
  const content = await readFile(template, 'utf8');
  if (content.split('@SQLITE_VEC_SOURCE@').length !== 2) throw new Error('Invalid extra-init template');
  await writeFile(destination, content.replace('@SQLITE_VEC_SOURCE@', cInclude(path)), { flag: 'wx' });
}

export function commandRunner(logPath) {
  return async (command, args, { cwd, env, capture = false } = {}) => {
    appendFileSync(logPath, `${JSON.stringify({ command, args, cwd })}\n`);
    return new Promise((accept, reject) => {
      const child = spawn(command, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
      let output = '';
      const log = bytes => { appendFileSync(logPath, bytes); process.stderr.write(bytes); };
      child.stdout.on('data', bytes => { log(bytes); if (capture) output += bytes; });
      child.stderr.on('data', log);
      child.once('error', reject);
      child.once('close', (code, signal) => code === 0
        ? accept(output.trim())
        : reject(new Error(`${command} failed (${signal || code}); see ${logPath}`)));
    });
  };
}

export async function runtimeInventory(directory) {
  const actual = (await readdir(directory)).filter(name => /\.(?:js|mjs|wasm)$/.test(name)).sort();
  if (JSON.stringify(actual) !== JSON.stringify([...runtimeNames].sort())) {
    throw new Error('Unsupported runtime inventory: expected the complete pinned browser asset set');
  }
  const result = [];
  for (const name of runtimeNames) {
    const file = join(directory, name);
    const info = await lstat(file);
    if (!info.isFile() || info.size === 0) throw new Error(`Missing/nonregular/empty runtime file: ${name}`);
    const bytes = await readFile(file);
    result.push({ name, size: bytes.length, sha256: sha256(bytes) });
  }
  return result;
}

export async function checkRecipe(sqliteSource) {
  const make = await readFile(join(sqliteSource, 'ext/wasm/GNUmakefile'), 'utf8');
  const generator = await readFile(join(sqliteSource, 'ext/wasm/mkwasmbuilds.c'), 'utf8');
  const wasm = await readFile(join(sqliteSource, 'ext/wasm/api/sqlite3-wasm.c'), 'utf8');
  for (const [label, present] of [
    ['static initialization hook', make.includes('sqlite3_wasm_extra_init.c ?=') && wasm.includes('SQLITE_WASM_EXTRA_INIT')],
    ['canonical browser modes', ['.vanilla =', '.esm =', '.bundler ='].every(value => generator.includes(value))],
    ['FTS5 default', make.includes('-DSQLITE_ENABLE_FTS5')],
    ['BigInt default', /emcc\.WASM_BIGINT\s*\?=\s*1/.test(make)],
    ['default persistence', ['sqlite3-vfs-kvvfs.c-pp.js', 'sqlite3-vfs-opfs.c-pp.js', 'sqlite3-vfs-opfs-sahpool.c-pp.js', 'sqlite3-vfs-opfs-wl.c-pp.js'].every(value => make.includes(value))],
  ]) if (!present) throw new Error(`Unsupported pinned baseline: ${label}`);
}

export async function checkRelease(sqliteSource, version) {
  const header = await readFile(join(sqliteSource, 'sqlite3.h'), 'utf8');
  const core = await readFile(join(sqliteSource, 'sqlite3.c'), 'utf8');
  const expression = /#define SQLITE_VERSION\s+"([^"]+)"/;
  if (header.match(expression)?.[1] !== version || core.match(expression)?.[1] !== version) {
    throw new Error('Generated SQLite core/header do not match the acquired release');
  }
}

export async function atomicHandoff(path, handoff) {
  const temporary = `${path}.tmp`;
  await writeFile(temporary, JSON.stringify(handoff, null, 2) + '\n', { flag: 'wx' });
  await rename(temporary, path);
}

// run is an explicit dependency for offline fixtures, never a production CLI option.
export async function construct({ root = repositoryRoot, environment = process.env,
  run: injectedRunner, saveHandoff = atomicHandoff } = {}) {
  const parent = join(root, '.work/build');
  await mkdir(parent, { recursive: true });
  const workspace = await mkdtemp(join(parent, 'run-'));
  const logPath = join(workspace, 'build.log');
  await writeFile(logPath, '');
  const run = injectedRunner || commandRunner(logPath);
  const env = buildEnvironment(environment);
  const execute = (command, args, options = {}) => run(command, args, { cwd: root, env, ...options });
  try {
    cInclude(workspace);
    const tools = {};
    for (const command of ['cc', 'make', 'emcc', 'wasm-strip', 'wasm-opt', 'node', 'npm']) {
      const executable = command === 'wasm-opt' && env.EMSDK
        ? join(env.EMSDK, 'upstream/bin/wasm-opt') : command;
      tools[command] = await execute(executable, ['--version'], { capture: true });
    }
    const platform = await execute('uname', ['-srm'], { capture: true });
    const inputs = JSON.parse(await execute('bash', [join(root, 'tools/inputs.sh'), 'acquire', '--lock', join(root, 'inputs/sources.lock.json')], { capture: true }));
    if (!inputs.lockDigest?.value || !inputs.sqlite?.sourcePath || !inputs.sqliteVec?.sourcePath) throw new Error('Incomplete acquisition handoff');
    const lock = await readFile(join(root, 'inputs/sources.lock.json'));
    const pins = JSON.parse(lock);
    if (inputs.lockDigest.algorithm !== 'sha256' || inputs.lockDigest.value !== sha256(lock)) throw new Error('Source lock changed after acquisition');
    for (const key of ['sqlite', 'sqliteVec']) {
      if (inputs[key].version !== pins[key].version || inputs[key].digest?.algorithm !== pins[key].digest.algorithm
          || inputs[key].digest?.value !== pins[key].digest.value) throw new Error(`Wrong acquired ${key} identity`);
      cInclude(inputs[key].sourcePath);
    }
    await checkRecipe(inputs.sqlite.sourcePath);
    const bridge = join(workspace, 'extra-init.c');
    await generateBridge(inputs.sqliteVec.sourcePath, bridge, join(root, 'tools/build/extra-init.c.in'));
    const configure = ['env', ...hostOptions, './configure', ...configureOptions];
    await execute(configure[0], configure.slice(1), { cwd: inputs.sqlite.sourcePath });
    await execute('make', ['sqlite3.c'], { cwd: inputs.sqlite.sourcePath });
    await checkRelease(inputs.sqlite.sourcePath, inputs.sqlite.version);
    const wasmArguments = [...targets, ...wasmOptions, `sqlite3_wasm_extra_init.c=${bridge}`];
    await execute('make', wasmArguments, { cwd: join(inputs.sqlite.sourcePath, 'ext/wasm') });
    const runtimeDirectory = join(inputs.sqlite.sourcePath, 'ext/wasm/jswasm');
    const handoff = {
      schemaVersion: 1,
      inputs,
      build: { tools, platform, configure, amalgamation: ['make', 'sqlite3.c'], wasm: ['make', ...wasmArguments],
        harnessSha256: sha256(await readFile(join(root, 'tools/harness.sh'))),
        configSha256: sha256(await readFile(join(root, 'tools/build/config.mjs'))),
        templateSha256: sha256(await readFile(join(root, 'tools/build/extra-init.c.in'))),
        dependencyLockSha256: sha256(await readFile(join(root, 'tools/harness/package-lock.json'))) },
      runtimeDirectory,
      runtimeFiles: await runtimeInventory(runtimeDirectory),
      logPath,
    };
    await saveHandoff(join(workspace, 'handoff.json'), handoff);
    return handoff;
  } catch (error) {
    appendFileSync(logPath, `Build failed: ${error.message}\n`);
    error.message = `${error.message}; retained workspace: ${workspace}`;
    throw error;
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    if (process.argv.length !== 2 || process.version !== 'v24.19.0') throw new Error('Use bash tools/build.sh with the qualified SDK');
    console.log(JSON.stringify(await construct()));
  } catch (error) {
    console.error(`Build: ${error.message}`);
    process.exitCode = 1;
  }
}
