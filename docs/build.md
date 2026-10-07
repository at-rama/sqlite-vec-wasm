# Canonical browser construction

Run from the repository root on the harness's qualified Linux x86-64 host. Install the system prerequisites described in the [harness architecture](../.42p/engineering/2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md), including a native C compiler and GNU Make. Their actual versions are recorded; they are not an immutable OS image.

```sh
export HARNESS_STATE=/tmp/sqlite-vec-wasm-tools
bash tools/harness.sh install
bash tools/harness.sh check
bash tools/harness.sh deps
bash tools/harness.sh smoke
bash tools/build.sh > /tmp/sqlite-vec-wasm-build.json
```

Use an empty external tool directory for initial reconstruction on managed workspaces; retain it for subsequent integrity-checked executions. SDK Node is development tooling. No Node product runtime is built.

Every construction delegates to [verified acquisition](source-acquisition.md) with the tracked source lock and creates new source and build directories. It does not consume an older handoff. Progress goes to stderr and the invocation's log; stdout contains only the success JSON. Missing tools and failed commands return nonzero without a success result.

The orchestrator runs `env CC=cc CC_FOR_BUILD=cc CXX=/bin/false ./configure --enable-all`, then `make sqlite3.c` in the acquired SQLite tree. The generated core/header must identify that same acquired release. From its `ext/wasm` directory it runs `make b-vanilla b-esm b-bundler emcc_opt=-Oz sqlite3_wasm_extra_init.c=ABSOLUTE_BRIDGE_PATH`. Options are defined in [config.mjs](../tools/build/config.mjs) and used directly for execution and reporting. Ambient compiler/include/Make/SQLite overrides are excluded.

The bridge is a separate generated translation unit from [extra-init.c.in](../tools/build/extra-init.c.in). It defines `SQLITE_CORE` locally, includes the verified absolute sqlite-vec C path, and returns `sqlite3_auto_extension`'s registration result. Neighboring sqlite-vec headers and canonical SQLite include flags supply headers. No upstream source is edited, and no upstream flags or exports are replaced. Source/build paths must contain only ASCII letters, digits, `_`, `.`, `/` and `-`; other paths are rejected explicitly because C include, Make and upstream shell recipe syntax cannot safely represent them here.

## Output and lifetime

```text
.work/
  build/run-<unique>/
    extra-init.c
    build.log
    handoff.json
  inputs/acquire-<unique>/
    <verified archives and source trees>
    <SQLite source>/ext/wasm/jswasm/
      <eleven browser runtime files>
```

The native output retains conventional, ESM and bundler-friendly loaders, their Worker1 and promiser companions, the shared `sqlite3.wasm`, and `sqlite3-opfs-async-proxy.js`. [The inventory](../tools/build/config.mjs) defines the eleven files for this pinned release. A missing, empty, nonregular or unexpected runtime file fails construction. Build intermediates are not additional distributable engines.

The version-1 handoff contains `inputs` (the complete acquisition handoff), `build` (actual tools, platform and executed options plus repository configuration hashes), `runtimeDirectory`, `runtimeFiles` (relative names, sizes and SHA-256), and `logPath`. The completed file is written atomically; its parsed JSON equals stdout. Consumers must validate every declared file's size/hash before using it. These identities contain no acceptance or publication verdict and do not require byte-identical rebuilds.

Keep both the handoff's build directory and `inputs.workspace` until downstream consumption finishes. Afterwards the caller can delete those exact invocation directories. Failed builds retain their available build log/state; acquisition owns its own failure cleanup. All generated material stays ignored and outside source control.

## Offline checks

```sh
sh tools/test-repository.sh
sh tools/check-repository.sh
```

The offline suite needs system Node 18 or newer and `cc`, in addition to the existing Python/Bash/archive prerequisites. The packaging suite additionally uses npm for local archive packing/installation and Python for archive inspection. These suites neither install the SDK nor download sources. Stage new repository files before the repository check.

Browser construction checks are implemented separately from these lightweight checks. A-build evidence uses raw constructed assets. A-acceptance will test final packaged bytes, the complete known vector/Hamming fixtures and persistence through runtime shutdown/reopen.

```sh
bash tools/harness.sh exec node tools/build/check.mjs /tmp/sqlite-vec-wasm-build.json
```

This command constructs a separate fresh, unmodified SQLite reference with the same retained options, then checks both distributions in the qualified Chrome. It compares API, WASM export, SQL function/compile-option and VFS inventories by inclusion, allowing sqlite-vec additions and code-generation differences. It exercises all three loader/Worker1/promiser variants, independent C-style and OO1 connections, BigInt, FTS5 and deterministic vec0 queries. Missing WASM, Worker1 and OPFS-proxy companions and corrupt WASM must prevent the requested runtime capability from initializing. Upstream initialization can leave a pending Promise after a failed WASM fetch; this negative check uses a bounded wait and never treats that as successful initialization. The command returns nonzero on a failed check and stores its report under `.work/build-check/run-<unique>/checks.json` only after all checks pass.

## Browser storage conditions

These conditions follow the pinned SQLite sources, especially `ext/wasm/api/sqlite3-vfs-*.c-pp.js` and the OPFS common/proxy code. Keep the eleven companion files together, with correct JavaScript and WASM MIME types. The check fixture uses HTTP loopback (a trustworthy secure context), Workers, COOP `same-origin` and COEP `require-corp`. Production hosting must provide its own applicable secure-context and isolation conditions.

| VFS | Context and limits |
| --- | --- |
| `kvvfs` | Retained key/value API. Browser `localStorage`/`sessionStorage` are main-thread facilities; version 2 also supports Storage-like objects. Browser quotas apply; this VFS is intended for small databases rather than heavy workloads. |
| `opfs` | Worker-only OPFS access through the companion async proxy, SharedArrayBuffer and isolation. Browser OPFS and synchronous access-handle availability are required. |
| `opfs-wl` | Same OPFS requirements, with Web Locks and `Atomics.waitAsync()`. Locking uses browser-managed FIFO requests; this does not promise fairness under every contention pattern. |
| `opfs-sahpool` | Worker-only synchronous access handles; does not require SharedArrayBuffer or isolation headers. Explicit `installOpfsSAHPoolVfs()` initialization locks the pool's resources. Engines sharing its storage directory can collide; use separate directories for separate pools. File paths must be absolute and pool capacity must cover open files. |

The checks actually initialize and read/write each applicable persistent VFS in the selected browser, and request unavailable OPFS VFSes on the main thread to confirm failure. Pool initialization is explicit, matching upstream behavior. Databases in different VFS storage layouts are not interchangeable. Browser/version support, quotas, locking and concurrency constraints remain upstream constraints; no fallback silently substitutes transient storage for a requested unavailable persistent VFS. These checks do not establish persistence across runtime restart or support every browser/bundler.
