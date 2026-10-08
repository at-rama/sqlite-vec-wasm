// Executed inside the browser, using upstream APIs without runtime glue.
export async function probe(sqlite3, vector, worker) {
  const check = (value, label) => { if (!value) throw Error(label); };
  const { capi: c, wasm: w, oo1 } = sqlite3;
  const db = new oo1.DB(':memory:', 'c');
  try {
    const version = db.selectValue('select sqlite_version()');
    const vecVersion = vector ? db.selectValue('select vec_version()') : null;
    check(db.selectValue('select 9007199254740993') === 9007199254740993n, 'BigInt');
    db.exec("create virtual table f using fts5(text); insert into f values('browser vector'),('other');");
    check(db.selectValue("select count(*) from f where f match 'browser'") === 1, 'FTS5');
    if (vector) {
      check(db.selectValue('select vec_version()') === `v${vector}`, 'vec version/automatic OO1 initialization');
      db.exec("create virtual table v using vec0(embedding float[2]); insert into v(rowid,embedding) values(1,'[1,0]'),(2,'[0,1]');");
      const rows = db.selectArrays("select rowid,distance from v where embedding match '[1,0]' and k=2 order by distance");
      check(rows[0][0] === 1 && rows[0][1] === 0 && rows[1][0] === 2 && Math.abs(rows[1][1]-Math.SQRT2)<0.00001, 'vec0 deterministic nearest neighbors');
    }
    const pointer = w.allocPtr();
    let native;
    try {
      check(c.sqlite3_open_v2(':memory:', pointer, c.SQLITE_OPEN_READWRITE|c.SQLITE_OPEN_CREATE, null) === 0, 'C open');
      native = w.peekPtr(pointer);
      check(native !== db.pointer, 'independent connections');
      check(c.sqlite3_exec(native, 'create table independent(x)', 0, 0, 0) === 0, 'C execution');
      const statementPointer = w.allocPtr();
      let statement;
      try {
        check(c.sqlite3_prepare_v2(native, vector ? 'select sqlite_version(), vec_version()' : 'select sqlite_version()', -1, statementPointer, 0) === 0, 'C prepare versions');
        statement = w.peekPtr(statementPointer);
        check(c.sqlite3_step(statement) === c.SQLITE_ROW, 'C version row');
        check(c.sqlite3_column_text(statement, 0) === version, 'independent C SQLite version');
        if (vector) check(c.sqlite3_column_text(statement, 1) === `v${vector}`, 'independent C vec version');
      } finally { if (statement) c.sqlite3_finalize(statement); w.dealloc(statementPointer); }
      if (vector) check(c.sqlite3_exec(native, 'select vec_version(); create virtual table cv using vec0(x float[2])', 0, 0, 0) === 0, 'automatic C initialization');
      check(db.selectValue("select count(*) from sqlite_schema where name='independent'") === 0, 'connection separation');
    } finally { if (native) check(c.sqlite3_close_v2(native) === 0, 'C close'); w.dealloc(pointer); }
    const vfs = c.sqlite3_js_vfs_list().sort();
    check(vfs.includes('kvvfs'), 'kvvfs retained');
    if (!worker) {
      const kv = new oo1.DB('session', 'c', 'kvvfs');
      try { kv.exec('create table if not exists build_probe(x); delete from build_probe; insert into build_probe values(17)'); check(kv.selectValue('select x from build_probe') === 17, 'kvvfs storage'); }
      finally { kv.close(); }
      for (const name of ['opfs','opfs-wl','opfs-sahpool']) {
        check(!c.sqlite3_vfs_find(name), `${name} unavailable on main thread`);
        let failed = false;
        try { const unavailable = new oo1.DB('/unavailable.db', 'c', name); unavailable.close(); } catch { failed = true; }
        check(failed, `${name} request must not fall back`);
      }
    } else {
      check(globalThis.isSecureContext && globalThis.crossOriginIsolated, 'secure isolated Worker');
      check(typeof Atomics.waitAsync === 'function' && !!navigator.locks, 'opfs-wl prerequisites');
      for (const name of ['opfs','opfs-wl']) {
        check(vfs.includes(name), `${name} initialization`);
        const persistent = new oo1.DB(`/build-${name}.db`, 'c', name);
        try { persistent.exec('create table if not exists probe(x); delete from probe; insert into probe values(23)'); check(persistent.selectValue('select x from probe') === 23, `${name} read/write`); }
        finally { persistent.close(); }
      }
      const pool = await sqlite3.installOpfsSAHPoolVfs({ initialCapacity: 3 });
      const pooled = new pool.OpfsSAHPoolDb('/build-pool.db');
      try { pooled.exec('create table if not exists probe(x); delete from probe; insert into probe values(29)'); check(pooled.selectValue('select x from probe') === 29, 'SAH pool read/write'); }
      finally { pooled.close(); }
    }
    return { version, vecVersion, independentVersionsChecked: true, capi: Object.keys(c).sort(), oo1: Object.keys(oo1).sort(),
      dbMethods: Object.getOwnPropertyNames(oo1.DB.prototype).sort(),
      exports: Object.keys(w.exports).sort(), vfs: c.sqlite3_js_vfs_list().sort(),
      options: db.selectArrays('pragma compile_options').flat().sort(),
      functions: db.selectArrays("select name || '/' || narg from pragma_function_list").flat().sort() };
  } finally { db.close(); }
}
