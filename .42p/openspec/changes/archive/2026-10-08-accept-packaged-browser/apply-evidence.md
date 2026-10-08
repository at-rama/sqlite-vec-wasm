# Apply execution evidence

## Scope and evaluated state

This account records implementation and Apply checks for `accept-packaged-browser` / `A-acceptance`, under the [planning coverage](coverage.md) source snapshots. The Allocation and Distribution Capture hashes remain unchanged from planning; all twelve requirements, 21 scenarios and 21 tasks retain their original scope. Implementation changes no source pins, upstream runtime behavior or other allocated unit. This is not the subsequent 42P Verification report, Archive or publication authorization.

The implementation was committed locally at `1d04caee9ec4fbbb1cd7facf567974bfaf66a4e3`, then transferred to the working branch through GitHub's contents API. Git object comparison established that [remote implementation head bf3776f](https://github.com/at-rama/sqlite-vec-wasm/commit/bf3776f130da4e1f518dcc039bbfaf8edbb73e21) and the local implementation have the identical complete tree `dc09ca9e1ad417ce8f4ef7bba58ef0704ca1b9fe`. GitHub PR evaluation actually checked out synthetic merge revision `aa92e6199846257b224a4dff4602064c67244010`, whose recorded tree is that same value. The report identifies that evaluated revision explicitly; it is not relabeled as the PR head or future authoritative `main` revision.

Later task-checkbox and evidence-account commits change the repository tree and do not retrospectively change these evaluated identities. This account reports the successful implementation snapshots and their limits. It does not transfer acceptance to a future authoritative revision or repacked publication payload. The implemented workflow renews acceptance on `main` or an explicitly selected revision with the intended package identity; A-release must use applicable evidence and exact accepted bytes.

## Implementation

`tools/acceptance.sh` and `tools/acceptance/run.mjs` compose fresh tool/dependency installation, harness checks/smoke, verified source acquisition through the existing build, packaging and final-browser checks. Ambient Node is bootstrap-only; production/browser stages use the existing pinned SDK. Clean Git state and empty producer/tool/npm state are mandatory. The versioned report retains failed/not-executed stages and diagnostics rather than emitting partial success.

`tools/acceptance/check.mjs` consumes the real archive, reuses packaging resolution/negative controls, compares its results against a freshly constructed unmodified pinned SQLite reference, checks independent FTS/Float32/Hamming fixtures and runs separate write/reopen Workers for every default OPFS VFS. Exporting existing reference helpers preserves their behavior. The shared raw probe additionally checks exact versions on its independent C connection, and package Worker1/promiser probes execute a known vector SQL expression alongside version checks.

`tools/acceptance/contracts.mjs` requires every production/browser case and checks revision/archive applicability. `fixtures.mjs`, `oracles.mjs` and `persistence-worker.mjs` keep browser data operations separate from host arithmetic expectations. The reopen path only selects existing data. A deliberate missing-table case must fail without repair. The eight new offline tests enter `tools/test-repository.sh`; contributor commands, prerequisites, identity/retention and evidence boundaries live in `docs/acceptance.md`.

`.github/workflows/acceptance.yml` installs explicit Ubuntu 24.04 system prerequisites, uses fully pinned checkout/upload actions and runs the same command without restored caches. It supports PR, `main` and manual revision evaluation, records the actual checkout and retains available reports/logs plus exact accepted payload for 30 days. It has read-only repository permissions and performs no merge, tagging, publication or npm setup. Workflow YAML alone does not register a branch-protection requirement; later candidate/release consumers remain responsible for enforcing the mandatory outcome.

## Local clean-production results

The command `bash tools/acceptance.sh` succeeded from the isolated `/tmp/sqlite-vec-wasm-explore` checkout at the local implementation commit above. The clean-state gate confirmed no prior tool/dependency/source/build/package state required by the production path. Fresh tools were installed under `/tmp/sqlite-vec-wasm-acceptance-nH5P3M/tools`. A separately reconstructed earlier harness probe did not supply those production tools. All nine production stages and 22 browser cases passed.

Primary local records remain session-local at `.work/acceptance/run-3SfZvi/`: `acceptance.json`, `browser.json`, `build.json`, `package.json`, `payload.tgz` and logs. The exact archive is **1,147,755 bytes**, SHA-256 **`aa519dac41f35c870bd324dad77db16540ed96d3ac3f0743d2e082b5bc138478`**. SQLite `3.53.4` and sqlite-vec `v0.1.9` matched the pins, including independent C/OO1 connections; Chrome was `153.0.8010.12`. Loopback serving supplied COOP `same-origin` and COEP `require-corp`, with actual secure-context and isolation results recorded.

## Hosted CI and downloaded primary artifact

[Acceptance run 37833418168, attempt 1](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37833418168) completed successfully, including system prerequisites, full clean production/browser execution and evidence upload. Its primary [artifact 11574711775](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37833418168/artifacts/11574711775), `acceptance-37833418168-1`, was downloaded and inspected. The downloaded ZIP SHA-256 matched GitHub's artifact digest **`1d83ef6cba45a833dfd32884cdb224e7744c4a420dece173fbfb28c7ad84d656`**.

The downloaded `payload.tgz` is **1,147,737 bytes**, SHA-256 **`f981e39a49dc0bf5898e049416403f6d31804af7cd7157c813bdf5f18ee59fb5`**. Actual downloaded bytes passed `assertApplicable` against the report's evaluated revision and archive identity. Python tarfile/hashlib inspection independently checked all eleven runtime archive members against the recorded sizes and digests. Deliberately substituted revision and archive identities were rejected against that downloaded real report. Downloaded primary records were available at `/tmp/a-acceptance-ci/run-qjcUGB/` when this account was drafted. The artifact expires on 2026-11-07; unavailable primary evidence requires renewal. The local and hosted archive digests need not be identical: reproduction requires defined function/contents, and each archive is separately identified and accepted.

| Gate | Hosted observation |
| --- | --- |
| Clean production | Checkout, install, tool checks, locked deps, smoke, verified acquisition/build, package, browser and bundle stages passed |
| Loading/API surfaces | All twelve conventional/ESM/bundler main, Worker, Worker1 and promiser cases passed; independent versions and BigInt checked |
| Baseline | Fresh unmodified same-pin reference compared to packaged API/WASM/SQL/VFS inventories; no omitted retained capability |
| FTS5 | Query returned fixture identifiers `1,3` |
| Float32 vec0 | Neighbor identifiers `1,2,3`; distances `0,1.4142135381698608,2` within `1e-5` of independent arithmetic |
| Binary bit/Hamming | Identifiers `1,2,3,4,5`; exact independent distances `0,1,2,3,4`, no ties |
| OPFS runtime restart | `opfs`, `opfs-wl` and `opfs-sahpool` each retained committed ordinary, Float32 and bit data after close/Worker termination/fresh reopen under the same origin |
| Negative controls | Missing/corrupt companions, wrong SQL expectations and deliberately removed persistence table rejected; no fixture repair or skipped mandatory VFS |
| Final payload | Actual archive and extracted-file hashes unchanged; downloaded runtime members matched accepted identities |

The hosted browser was Chrome `153.0.8010.12`. Actual Worker storage/isolation/SAB/Web Locks/waitAsync conditions and unique database/pool identities are in the downloaded browser report. Every mandatory gate ran; none counted unavailable OPFS as success. This establishes orderly Worker/runtime restart under the recorded conditions, not whole-browser/process-crash recovery or universal browser/bundler support. Reference/probe/report helpers and authorship are partly shared; independent arithmetic and direct archive inspection do not establish independent authorship.

## Repository and planning checks

All **97 registered offline tests** passed: 36 repository/gate, 25 input, 19 build, nine package and eight acceptance tests. The canonical repository check passed. Strict OpenSpec validation passed the active Change and all three durable specs (four items). The hosted Repository workflow's `check` and `tests` jobs passed; `verification` and `archive` failed as expected because this active Change has not undergone those subsequent operations.

Review of the implementation against the unchanged unit and all delta scenarios retains **100% unit-to-Change and 100% Change-to-unit coverage**. The implementation and its tests/documentation remain scoped to A-acceptance. Planning coverage is not promoted to post-Apply Verification. No report named `verification.md` was invented, no specs were synchronized, and no archive, merge, tag or publication was performed.
