# SQLite browser runtime with sqlite-vec

This package contains SQLite's browser/WASM distribution with sqlite-vec
statically integrated. Every new connection has the extension available;
no consumer compilation or extension registration is needed.

Keep all eleven runtime files together when copying them to your static
server. Serve `.js` and `.mjs` as JavaScript and `.wasm` as `application/wasm`.
Installing with npm supplies files; it does not configure browser hosting.
The package exports each runtime file by its upstream filename. It has no
root initialization wrapper and no Node.js runtime support.

For ESM, with these assets served under `/sqlite/`:

```js
import sqlite3InitModule from '/sqlite/sqlite3.mjs';
const sqlite3 = await sqlite3InitModule();
const db = new sqlite3.oo1.DB(':memory:');
console.log(db.selectValue('select vec_version()'));
db.close();
```

For a conventional script, load `/sqlite/sqlite3.js` with a script tag and
call `globalThis.sqlite3InitModule()`. In a classic Worker, use
`importScripts('/sqlite/sqlite3.js')` before calling that initializer. Keep
the Worker entry beside those assets, or pass the upstream URL parameter
`sqlite3.dir=/sqlite` on its URL when its entry lives elsewhere.
A module Worker can use the ESM initializer above.

Worker1 has classic `sqlite3-worker1.js` and module `sqlite3-worker1.mjs`
entries. For its promise interface, load `sqlite3-worker1-promiser.js` and
call `sqlite3Worker1Promiser.v2()`, or import the default factory from
`sqlite3-worker1-promiser.mjs` and await it. Keep the companions at the
same URL directory: the promiser constructs its own Worker using upstream
relative-URL behavior. The conventional promiser captures its script URL
when loaded in a document; in other contexts use upstream location options.

The `*-bundler-friendly.mjs` variants remain available for tools that can
handle upstream asset URLs. This does not promise compatibility with every
bundler. Do not drop the WASM, Workers, promisers or OPFS proxy during copying.

Browser storage remains subject to
[SQLite's persistence prerequisites](https://sqlite.org/wasm/doc/trunk/persistence.md).
OPFS requires Workers and a secure context. The `opfs` and `opfs-wl` VFSes
require applicable cross-origin isolation; `opfs-wl` also needs Web Locks and
`Atomics.waitAsync()`. The explicitly initialized `opfs-sahpool` VFS does not
require those isolation headers. Main-thread OPFS is not supported. A requested
unavailable persistent VFS is not silently replaced with transient storage.

See [SQLite browser APIs](https://sqlite.org/wasm/doc/trunk/api-index.md) for
upstream initialization, Worker1 and asset-location mechanisms. The included
`runtime.json` identifies versions, runtime files and build options. See
`NOTICE`, `LICENSE` and `licenses/` for the distinct upstream license terms.
