# Tasks

Tasks track Apply completion. [Coverage](coverage.md) is the prerequisite unit-scoped planning gate; [Apply evidence](apply-evidence.md) records implementation and execution. Task completion does not replace the distinct post-Apply 42P Verification and archive required before human merge.

## 1. Fresh construction entry point

- [x] 1.1 Add `tools/build.sh` and the minimal SDK JavaScript orchestrator with existing harness checks, explicit argument handling and stderr/log progress; verify offline tests reject missing/wrong tooling and stdout remains reserved for result JSON.
- [x] 1.2 Delegate fresh acquisition to `tools/inputs.sh acquire --lock inputs/sources.lock.json` and consume its complete handoff without resolving versions or accepting old handoffs; verify offline cases for recorded pair, acquisition failure and existing temporary state.
- [x] 1.3 Add the repository-authored C template and generation into a fresh `.work/build/run-…/` directory using the acquired absolute sqlite-vec C path, local `SQLITE_CORE` and propagated auto-registration result; verify path handling, no shell interpolation and unchanged upstream source content in focused tests.
- [x] 1.4 Register the group's offline tests in the existing test entry point and add contributor build setup/output-lifetime instructions linked from existing development documentation; verify `sh tools/test-repository.sh` and repository links, keeping SDK/network reconstruction outside the lightweight check.

## 2. Canonical generation and browser targets

- [x] 2.1 Record Configure/Make options once and invoke the same-release qualified host configuration and `make sqlite3.c` in the freshly acquired SQLite tree; verify offline invocation/failure cases and release/header identity in real construction.
- [x] 2.2 Invoke `b-vanilla b-esm b-bundler` with `emcc_opt=-Oz` and the generated bridge path, retaining upstream full-featured flags, BigInt, memory, exports and postprocessing; verify canonical arguments, required WABT integrity and nonzero propagation without older-output fallback.
- [x] 2.3 Define the eleven-file runtime inventory for the inspected pinned baseline and detect missing/empty required files and unsupported baseline changes; verify tests cover a missing loader, worker, proxy and WASM, and no Node/native/WASI/experimental engine enters the handoff.
- [x] 2.4 Add the group's recipe/output checks and document build commands, common SQLite release identity and upstream integration boundary; verify offline tests and a real compile with sources unchanged, stopping for contract escalation if a patch would be needed.

## 3. Traceable handoff and failure state

- [x] 3.1 Implement the version-1 build handoff with consumed input identities, actual checked tools/host environment/options, native output directory, runtime sizes/SHA-256 and log path; verify offline fixtures hash the actual files and reporting uses executed parameters rather than duplicate metadata.
- [x] 3.2 Atomically write the success-only handoff and emit matching JSON while retaining failed state/diagnostics and successful state until caller cleanup; verify failures during generation, compilation, inventory and handoff writing return nonzero without success JSON or selection of an earlier result.
- [x] 3.3 Add focused handoff/lifetime tests and document downstream locations, fields, cleanup and the lack of an acceptance/publication verdict; verify the tests and that a consumer can check every listed file's size/digest against the handoff.

## 4. Constructed-runtime behavior and baseline preservation

- [x] 4.1 Add same-release baseline omission checks using the canonical recipe/API inventories and a separate unmodified reference with identical retained options; verify public APIs/exports, loading assets, default SQL capabilities and VFS surfaces remain present, allowing upstream sqlite-vec additions and code-generation differences without byte-equality assertions.
- [x] 4.2 Add real-browser checks using the existing harness helpers for conventional/ESM main-thread and Worker loading, independent C-style/OO1 connections, pinned SQL versions and automatic sqlite-vec registration; verify BigInt, expected FTS5 matches and deterministic vec0 behavior on the constructed runtime.
- [x] 4.3 Exercise Worker1 and its promise interface through open/execute/results/close using sqlite-vec, and validate all loading variants and companion references including bundler files; verify missing/wrong companion assets fail without claiming universal bundler support.
- [x] 4.4 Check every retained default VFS in its applicable context, including `kvvfs`, `opfs`, `opfs-sahpool` and `opfs-wl` for the current release; verify required capabilities actually initialize in the selected browser and unsupported persistence requests retain upstream unavailability/failure without transient fallback.
- [x] 4.5 Document release-specific secure-context, Worker, header/isolation and VFS/browser/concurrency limitations, plus the build-check commands; verify them against the pinned sources and executed hosting conditions, distinguishing A-build evidence from A-acceptance's final-package and restart-persistence suite.

## 5. Integrated reconstruction evidence

- [x] 5.1 Reconstruct the documented harness/dependency/build path in an isolated clean checkout with empty tool/npm/source/output state, using the documented external harness location if required; verify all eleven outputs, source/tool identities and browser checks and record failures as failures rather than skipped passes.
- [x] 5.2 Run `sh tools/check-repository.sh`, `sh tools/test-repository.sh` and strict OpenSpec validation from `.42p`, then record requirement/scenario/task evidence and actual environment/commands for this candidate; verify no upstream trees or generated artifacts are tracked and all A-build obligations have evidence before requesting distinct 42P Verification.
