# A-build Apply evidence

Implementation evidence recorded on 2026-10-06 for `build-canonical-browser`, allocation unit `A-build`. This records Apply execution; it is not the distinct post-Apply 42P Verification report and carries no release/acceptance verdict.

## Candidate and environment

The exercised construction/check code is at local execution commit `fda98b1` on `feat/a-build`, following implementation commit `b69ca8c`. Subsequent candidate changes add offline negative tests, completion tracking and this evidence; producer/browser code is unchanged. The original source authority snapshots in [coverage](coverage.md) remain unchanged, with 100% bidirectional unit-scoped planning coverage.

Environment: Linux x86-64, kernel 6.18.44; native GCC 13.3.0 (Ubuntu 13.3.0-6ubuntu2~24.04), GNU Make 4.3. Harness installation checked Emscripten 4.0.23, SDK Node 24.19.0/npm 11.17.0, WABT 1.0.42 and Chrome 153.0.8010.12. The executed SDK Binaryen reports `wasm-opt version 125 (version_125-81-gf4138bbbe)`. Dependency reconstruction installed locked playwright-core 1.63.0. Archive/member/tool checks remain those in the unchanged existing harness.

Sources: SQLite 3.53.4, sqlite-vec 0.1.9, consumed through the tracked A-inputs lock. The SQLite archive digest is SHA3-256 `b834d474b9b393d85a9e3ee4cc11f1329e007e9376a424ee740796f5c4bda3a8`; the sqlite-vec archive digest is SHA-256 `3acd67cb4aff080c7050926fd3cf8227905fe5b7ee3829d8ee5024ab1283cf61`.

The following source-byte identities bind the exercised producer/check code independently of local Git commit metadata:

| Exercised file | SHA-256 |
| --- | --- |
| `tools/build.sh` | `53affa32f99fec28e75ca347e028a52581f62128aa77d398d1df8cac3350399b` |
| `tools/build/build.mjs` | `d4061aff2d79bd8d4e776b9829231ad4e20a1dabf12f4143de44a8f4c89ca15e` |
| `tools/build/config.mjs` | `52ba36be0d44e4fefa6c43c0e1401685f07355a85137ea1e22d40b0182c31329` |
| `tools/build/extra-init.c.in` | `6e54ccc35d429c2269a57d0528f6d208d17a96e29685e8c5738f543f162727be` |
| `tools/build/check.mjs` | `40924428f19f97bc6a8b64a688eac8d0afc6921ac1fd65deda8743f0b4d37979` |
| `tools/build/browser-probe.mjs` | `660cf451a41a2f149edf706876e0de9c4aa4589839e7d0667f775161a0c41526` |
| `tools/harness.sh` | `ad90771a9d419eee395ab7191539b650462810a604c90cd17eb76e7e2ab607a2` |
| `tools/harness/package-lock.json` | `76ec8c5268c3686c1c10e0647fe6cbec2a88dfb7c2ffed47893ca9b4f2d79d35` |

## Executed reconstruction

A local clone at `/tmp/sqlite-vec-wasm-a-build-clean` started with no tool, npm, source or output state. A new external `HARNESS_STATE=/tmp/sqlite-vec-wasm-a-build-clean-tools` was installed, dependencies reconstructed, and harness smoke passed. The first producer construction used the initial implementation; the checkout was then advanced to the exercised candidate and construction repeated, creating another fresh source/build workspace. Earlier state was not selected. Both installations/builds used the documented external-path workaround without weakening integrity checks.

```sh
export HARNESS_STATE=/tmp/sqlite-vec-wasm-a-build-clean-tools
bash tools/harness.sh install
bash tools/harness.sh deps
bash tools/harness.sh smoke
bash tools/build.sh > /tmp/sqlite-vec-wasm-a-build-clean-handoff.json
bash tools/harness.sh exec node tools/build/check.mjs /tmp/sqlite-vec-wasm-a-build-clean-handoff.json
```

The final producer consumed `acquire-u013navy`. Its native output is `/tmp/sqlite-vec-wasm-a-build-clean/.work/inputs/acquire-u013navy/sqlite/sqlite-src-3530400/ext/wasm/jswasm`. The checker constructed a separate unmodified reference in `acquire-6hfkfhp0`, with identical Configure/Make targets and optimization and no extra-init bridge. Its complete successful browser report is `/tmp/sqlite-vec-wasm-a-build-clean/.work/build-check/run-MU4rdx/checks.json`. These locations are retained temporary execution state, not tracked payloads or durable download promises.

All eleven output sizes/SHA-256 were recomputed from files and checked against the handoff before browser fixture copying. JSON stdout equals the atomically written handoff. The same release generates core, header, WASM support and bindings; the generated core/header release check passed. Original archive-member comparison after construction found:

- sqlite: 2208 original regular archive members compared byte-for-byte; zero changed members.
- sqliteVec: 2 original regular archive members compared byte-for-byte; zero changed members.

The canonical build completed all three targets and upstream WABT stripping/Binaryen/JavaScript postprocessing. No upstream patch, feature removal, added include path, replacement flags or consumer registration was needed. No incompatible case requiring a contract change was encountered; guards fail unsupported recipes/inventory/releases instead of patching them.

## Browser and omission checks

For both reference and constructed engine, conventional, ESM and bundler-friendly loaders initialize on main thread and Workers. Each mode's Worker1 and default promiser factory completed open/execute/result/close. Six context inventories show zero missing baseline C API keys, OO1 keys/DB methods, WASM exports, SQL compile options/functions or registered VFSes. Binary and code-generation bytes are not compared for equality.

The constructed engine exposes 262 WASM exports and 195 SQL function inventory entries. Main-thread C API inventories contain 663 keys and Worker inventories 661 keys, matching the reference's context-specific surfaces. `sqlite_version()` returns `3.53.4`, and `vec_version()` returns `v0.1.9`. Independent C-style and OO1 databases automatically receive sqlite-vec; their memory schemas remain independent. BigInt `9007199254740993`, a known FTS5 match, and a vec0 nearest-neighbor fixture (distances 0 and square root of 2) passed.

Every loader context retains `kvvfs`, `memdb`, `unix`, `unix-dotfile`, `unix-excl`, `unix-none`; Workers additionally initialize `opfs` and `opfs-wl`, and explicit pool installation initializes `opfs-sahpool`. Main-thread kvvfs session storage and Worker OPFS, Web-Locks OPFS and SAH-pool read/write probes passed. Main-thread requests for all three unavailable OPFS VFSes fail without fallback. The hosting fixture is secure loopback with COOP `same-origin`/COEP `require-corp`; isolation, Web Locks and `Atomics.waitAsync()` are checked in Workers.

On separate fixture copies, removing WASM, Worker1 or the OPFS proxy, and replacing WASM with invalid bytes prevents the requested runtime capability from initializing. Upstream can leave its failed WASM-initialization Promise pending, so that negative case uses a five-second bounded lack of initialization; it is not an accepted usable runtime. Required normal-context checks passed without skip or fallback.

## Requirement, scenario and task mapping

| Delta requirement and all its scenarios | Implementation/execution evidence | Tasks |
| --- | --- | --- |
| Fresh verified build inputs: Recorded pair is built; Acquisition fails; Previous sources exist | Locked fresh acquisition; offline failure/old-state fixtures; repeated fresh real constructions | 1.1, 1.2, 2.1, 5.1 |
| Common SQLite release identity: Consistent source generation; Missing release component | Same acquired tree; core/header checks; negative release/recipe fixtures and read failures | 2.1, 2.4, 5.1 |
| Static registration on every connection: Independent connections; Worker connections; Registration cannot complete | Generated bridge, C/OO1/Worker/Worker1/Promiser probes; native compiled bridge propagates injected registration error | 1.3, 2.2, 2.4, 4.2, 4.3 |
| Canonical browser baseline is retained: Loading and API surface; SQL and extension semantics; Worker1 surface; Baseline omissions | Three modes/six contexts, SQL probes, twelve reference/constructed Worker1/promiser cycles; subset omission checks against separate same-release reference | 2.2, 2.3, 4.1, 4.2, 4.3 |
| Upstream storage conditions are preserved: Default VFS availability; Unsupported persistence context | Context-specific VFS inventories, actual persistent VFS reads/writes, explicit pool install and failing main-thread OPFS requests; documented constraints | 2.2, 4.1, 4.4, 4.5 |
| Recorded reproducible construction: Clean reconstruction; Tool integrity failure; Actual build parameters | Empty-state harness/dependency installation, isolated construction, checked tools; wrapper missing/wrong SDK fixtures; handoff uses executed arguments | 1.1, 1.4, 2.1, 2.2, 3.1, 5.1 |
| Integration and runtime boundaries: Unmodified upstream sources; Unsupported runtime outputs; Incompatibility requires a patch | Original-member byte comparison; local bridge; exact eleven-file inventory rejects extra Node asset; release/recipe guards, no patch needed | 1.3, 2.2, 2.3, 2.4, 5.2 |
| Traceable runtime handoff: Complete successful output; Missing runtime file; Packaging boundary | Actual eleven-file size/hash checks; missing loader/worker/proxy/WASM fixtures; documented handoff schema/lifetime with no acceptance/publication verdict | 2.3, 3.1, 3.3, 4.1, 5.2 |
| Failure does not reuse previous output: Compilation failure with earlier success; Diagnostic retention; Successful workspace lifetime | Negative command/generation/inventory/write fixtures retain logs without handoff; earlier success untouched; real success retained for caller | 1.1, 1.2, 2.1, 2.2, 3.2, 3.3 |
| Reproduction and browser prerequisites are documented: Reproduction instructions; Storage prerequisites | README links [build instructions](../../../../../docs/build.md); executed isolated sequence and pinned source-informed storage table | 1.4, 2.4, 3.3, 4.5, 5.1 |

## Repository checks

`sh tools/test-repository.sh`: 44 existing Python tests and 19 Node build tests pass, zero skipped tests. The offline suites install/download nothing. They additionally cover missing/wrong SDK state, argument handling, bridge generation errors and shell-metacharacter path rejection.

`sh tools/check-repository.sh`: PASS after staging new files. `openspec validate build-canonical-browser --strict`, executed from `.42p`: PASS. Repository prose links resolve. Generated sources, SDKs, browser binaries, dependencies, logs and runtime files remain ignored/untracked. `SPEC.md`, Allocation/Capture, source pins and the harness are unchanged.

Early development attempts detected a missing PATH entry for SDK Binaryen (resolved by using its activated SDK absolute executable), two probe mistakes (corrected to the actual `sqlite3_close_v2` API and SQL single-quote syntax), and a routing limitation for sub-Worker negative tests (replaced by removing companions from copied fixtures). These were failed attempts, not successful runs; the final documented command passes all checks.

## Runtime inventory

| Runtime file | Bytes | SHA-256 |
| --- | ---: | --- |
| `sqlite3.js` | 814746 | `8f0b0b7ef084c0b9af79479388be14392be37c6cf83663803138e90286f2f40d` |
| `sqlite3.mjs` | 813270 | `94c311c377bf09a7a34b13bc2fb8ab7e2cd33fe864ce8e4eb04bcd51386c643e` |
| `sqlite3-bundler-friendly.mjs` | 809831 | `121202cbe0f09a9f1aef5ef65cad1cf10d432e06be7f573224eb7fd71c9d72b0` |
| `sqlite3.wasm` | 945443 | `f3782cb4a7949af5d863daad07e8e0d6b287a7dbf87f764016d11e0e955fa8e0` |
| `sqlite3-worker1.js` | 1791 | `131a835d991f750ab5090a9617bf06f586c42301d9648f7d2f887b275365713c` |
| `sqlite3-worker1.mjs` | 1499 | `aeeb5f492b283a00fe275bd667711031c72b5acc45b06483b527d62f6f9cc28b` |
| `sqlite3-worker1-bundler-friendly.mjs` | 1516 | `c043fcfadc1ded8e248ef032a27b6fcda4d66f9eee4b2a27acba02b85d17764f` |
| `sqlite3-worker1-promiser.js` | 12908 | `a8ad8b0b053515fb8bb4846edd2f36dfda6ec7ac80b726c081c339906f2f99e5` |
| `sqlite3-worker1-promiser.mjs` | 12675 | `3e72060ed48c77495472ca8f331c289240ed694761377ed80142b97c94791aec` |
| `sqlite3-worker1-promiser-bundler-friendly.mjs` | 12692 | `f0b85e6e08abc012f071bd40e44d9b07f30cc00799fde113270569991d548c99` |
| `sqlite3-opfs-async-proxy.js` | 41758 | `0afe66f23424456c0eb1de5f599075fd676d869044a017a1058888007e2dbf92` |

## Remaining lifecycle

The 18 Apply tasks are complete. The distinct repository-owned 42P Verification must still be invoked and committed before archive/human merge. No Verification, archive, merge, package, publication or final-package A-acceptance is claimed here. A-acceptance still owns its complete known vector/Hamming fixtures and persistence across runtime shutdown/reopen.
