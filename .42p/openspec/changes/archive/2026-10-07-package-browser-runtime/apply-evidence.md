# A-package Apply evidence

Apply executed on 2026-10-07 for `package-browser-runtime`, realizing `A-package`. The [coverage map](coverage.md) remains 100% in each direction for this unit. This records implementation and scoped execution evidence; it is not the distinct 42P Verification report or a product acceptance/publication verdict.

## Reconstruction and identities

Two detached checkouts started with empty generated state: `/tmp/sqlite-vec-wasm-package-clean` and `/tmp/sqlite-vec-wasm-package-final`. Each build acquired new digest-verified upstream sources and generated a new runtime. The first used a freshly installed qualified SDK; its log records generation of the required system-library cache. The second reused that integrity-checked SDK and its optional compiler cache, but no prior source, build or package output. Dependencies and smoke checks were also installed/run inside each checkout.

The final build used local checkpoint `063d0ef`, and packaging/checking used the implementation tree `a8fb2c3d6832d2dee46688f449f722f65086ce58`, published as commit `b1fb239c8fe950c9e19a844f00c66bb828287fa5`. Between those checkpoints only notice whitespace normalization and its documentation changed; A-build inputs/configuration did not. The content identities below identify the exact packaging/checking implementation, independently of subsequent task/evidence edits.

Commands ran from each checkout's repository root, with `HARNESS_STATE=/tmp/sqlite-vec-wasm-a-package-tools`. The SDK was freshly prepared with `bash tools/harness.sh install`, then independently identity-checked. In the final checkout:

```sh
bash tools/harness.sh deps
bash tools/harness.sh smoke
bash tools/build.sh > /tmp/sqlite-vec-wasm-package-final-build.json
bash tools/package.sh --build-handoff /tmp/sqlite-vec-wasm-package-final-build.json \
  --name sqlite-vec-wasm-packaging-fixture --version 0.0.0-test \
  > /tmp/sqlite-vec-wasm-package-final-package.json
bash tools/harness.sh exec node tools/package/check.mjs \
  /tmp/sqlite-vec-wasm-package-final-package.json
```

The final build command completed before notice normalization; the remaining commands consumed that newly built runtime. All commands succeeded. The fixture identity is nonpublished. Actual host/tool identities: Linux 6.18.44 x86_64; GCC 13.3.0; GNU Make 4.3; Emscripten 4.0.23; WABT 1.0.42; Binaryen 125; Node 24.19.0; npm 11.17.0; Chrome `153.0.8010.12`. Upstreams: SQLite `3.53.4` and sqlite-vec `0.1.9`. Source-lock SHA-256: `4dfa30a7af5cee2e09d7021a48f904de8f3d295367ccc80db95f9c448ebec1c8`.

The final archive is `sqlite-vec-wasm-packaging-fixture-0.0.0-test.tgz`, 1147732 bytes, SHA-256 `abff0c625484cca7eb942348bd90ffba135126b2ec314955fc392c223e394b80`. All 27 shipped files were inspected in the actual tarball, independently extracted and checked again after browser execution. The parsed package stdout equals the atomic success handoff. All eleven runtime records equal the consumed A-build handoff; no embedded runtime notice or asset byte changed.

| Runtime file | Bytes | SHA-256 |
| --- | --- | --- |
| `sqlite3.js` | 814746 | `8f0b0b7ef084c0b9af79479388be14392be37c6cf83663803138e90286f2f40d` |
| `sqlite3.mjs` | 813270 | `94c311c377bf09a7a34b13bc2fb8ab7e2cd33fe864ce8e4eb04bcd51386c643e` |
| `sqlite3-bundler-friendly.mjs` | 809831 | `121202cbe0f09a9f1aef5ef65cad1cf10d432e06be7f573224eb7fd71c9d72b0` |
| `sqlite3.wasm` | 945443 | `25ddbb6fccc11fea625cbaa435ef579ba559c66f89ad127bedd4506a8574c906` |
| `sqlite3-worker1.js` | 1791 | `131a835d991f750ab5090a9617bf06f586c42301d9648f7d2f887b275365713c` |
| `sqlite3-worker1.mjs` | 1499 | `aeeb5f492b283a00fe275bd667711031c72b5acc45b06483b527d62f6f9cc28b` |
| `sqlite3-worker1-bundler-friendly.mjs` | 1516 | `c043fcfadc1ded8e248ef032a27b6fcda4d66f9eee4b2a27acba02b85d17764f` |
| `sqlite3-worker1-promiser.js` | 12908 | `a8ad8b0b053515fb8bb4846edd2f36dfda6ec7ac80b726c081c339906f2f99e5` |
| `sqlite3-worker1-promiser.mjs` | 12675 | `3e72060ed48c77495472ca8f331c289240ed694761377ed80142b97c94791aec` |
| `sqlite3-worker1-promiser-bundler-friendly.mjs` | 12692 | `f0b85e6e08abc012f071bd40e44d9b07f30cc00799fde113270569991d548c99` |
| `sqlite3-opfs-async-proxy.js` | 41758 | `0afe66f23424456c0eb1de5f599075fd676d869044a017a1058888007e2dbf92` |

| Controlled implementation/input | SHA-256 |
| --- | --- |
| `tools/package.sh` | `a8db45f4af04bdfc2fd900bb94f8a3da7001939fa6d253ed897a3d020bfc9906` |
| `tools/package/package.mjs` | `928bf868950df2fcdce2a80053aaaf4c9d17ba75db53d6c81eba880b7d59bf0e` |
| `tools/package/check.mjs` | `ca19047b4d8655c83989ff1acca5963b392c5facc90b52d68cb0281278fb5482` |
| `tools/package/archive.py` | `3e27c2f497a54d770345c1fa0061970e74a6ba4160e2801f9590048a5db9dc0a` |
| `tools/package/notices.json` | `381db9306c99ac6d97fc328b9593fb6131cadd50b24168c0d9fa1faa6f90138d` |
| `tools/package/README.md` | `c08013e93851a0d841cb67e51a79bbdc9b435c59741e27e43d67f7932a636c78` |
| `docs/packaging.md` | `a77798981c61eaea287603221cf28fb57915b58e67e4b3048b60b018f3b1f6a1` |

## Scoped browser and consumption results

All twelve surfaces succeeded: conventional, ESM and bundler-friendly main-thread loaders, standalone Workers, Worker1 and promisers. The six direct main/Worker probes exercised usable C-style/OO1 SQL, automatic vec initialization, FTS5, BigInt and deterministic vec0 queries. Worker1/promiser queries returned the pinned SQLite/vec versions. An offline local npm install with lifecycle scripts disabled resolved every exported runtime filename with matching bytes; no product Node.js execution was performed.

The tarball was independently hosted at `/runtime/` on a loopback HTTP origin, with test pages/probes outside that mount, JavaScript/WASM MIME types, COOP `same-origin` and COEP `require-corp`. Every runtime response stayed on that origin/mount; every one of the eleven assets was actually requested successfully. Worker probes read/wrote `opfs`, `opfs-wl` and explicitly initialized `opfs-sahpool`; main-thread persistent-VFS requests failed without transient substitution, while `kvvfs` was usable.

Four disposable negative copies behaved as required: missing WASM returned 404 and did not initialize; missing Worker1 returned 404 and raised a Worker load error; missing OPFS proxy returned 404 and a requested `opfs` connection failed with `no such vfs`; corrupt WASM returned 200 but did not initialize. The two pending WASM initialization promises were bounded at five seconds and recorded as unavailable, never as initialized or skipped.

The report contains all twelve positive results, four negative results, archive/file identities, browser/hosting conditions and unchanged post-check hashes. These checks do not establish Hamming fixtures, persistence after runtime restart, universal bundler/browser compatibility or complete hosted CI acceptance; those remain with A-acceptance.

## Notice audit and source boundary review

The emitted loader headers identify SQLite public-domain browser code and Emscripten MIT/Illinois-NCSA glue. sqlite-vec's verified amalgamation contains no license files, so both official `v0.1.9` license texts are controlled inputs. The qualified Emscripten `4.0.23` sources and build log were inspected: generated support includes musl libc, compiler-rt, default public-domain dlmalloc, LLVM libc, libc++ and libc++abi. Their applicable texts are included, with pinned origins/digests in `notices.json`; the full LLVM texts retain their exceptions and legacy terms. Build-only compiler/Node/browser executables are not shipped. Optional closure/mimalloc/unwind configurations are not selected by this build.

Trailing horizontal whitespace and blank EOF lines are removed where recorded in the notice manifest to meet repository checks; notice wording is preserved. Runtime embedded notices remain byte-identical because runtime files are copied without rewriting. Missing notices, altered texts, missing/duplicate associations, wrong versions and wrong project associations fail the offline tests.

Review against the eight delta requirements and all A-package obligations found no necessary semantic revision: explicit current handoff validation; complete conservative runtime; independent packaged asset resolution; consumer-ready common archive; direct upstream behavior/glue boundary; licensing; success-only final identities; generated-output exclusion. Only repository-controlled code, tests, notice inputs and documentation are tracked. The existing source lock, upstream build recipe and product authority are unchanged. No runtime wrapper, lifecycle build, dependency, root export or tree-shaking assertion is added.

## Checks and available execution records

- `sh tools/check-repository.sh`: passed after staging the controlled files. An initial whitespace failure in upstream notice texts was corrected through the recorded normalization, without weakening the check.
- `sh tools/test-repository.sh`: passed, 72 tests total (19 gate, 25 acquisition, 19 build, 9 packaging), zero skipped. A separate missing-packaging-suite invocation failed after all existing suites passed; the mandatory suite was then restored.
- `openspec validate package-browser-runtime --strict`, from `.42p` with official OpenSpec `1.14.0`: passed.
- Qualified SDK installation/checks, isolated-checkout dependencies and smoke: passed. The first isolated checker correctly failed before its checkout-local browser dependency installation; installing the documented locked dependencies resolved that prerequisite, without skipping checks.

Generated archives, handoffs, logs and JSON reports remain temporary and uncommitted. Available execution locations in this session:

| Evidence | Location |
| --- | --- |
| Initial SDK installation | `.work/package-harness-install.log` |
| Final build log | `/tmp/sqlite-vec-wasm-package-final/.work/build/run-Yxl5cY/build.log` |
| Final build handoff | `/tmp/sqlite-vec-wasm-package-final-build.json` |
| Final package handoff | `/tmp/sqlite-vec-wasm-package-final-package.json` |
| Final archive | `/tmp/sqlite-vec-wasm-package-final/.work/package/run-pJJWQX/sqlite-vec-wasm-packaging-fixture-0.0.0-test.tgz` |
| Package diagnostics | `/tmp/sqlite-vec-wasm-package-final/.work/package/run-pJJWQX/package.log` |
| Final checker report | `/tmp/sqlite-vec-wasm-package-final/.work/package-check/run-SLrugr/checks.json` |
| Final browser command diagnostics | `/tmp/sqlite-vec-wasm-package-final-check.log` |
| Repository check/tests | `.work/package-final-repository-check.log`, `.work/package-final-repository-tests.log` |
| Strict OpenSpec validation | `.work/package-final-openspec-validation.log` |
| Missing mandatory suite check | `/tmp/sqlite-vec-wasm-missing-package-suite.log` |

The next lifecycle action is distinct 42P Verification; it has not been invoked by this Apply. The active Change remains on its draft PR until the required Verification/Archive work and review are completed.
