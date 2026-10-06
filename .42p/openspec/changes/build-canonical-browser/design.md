# Design

## Context

See [the proposal](proposal.md#why) for motivation and [the delta spec](specs/browser-build/spec.md) for behavior. This design realizes only `A-build`, whose source identity is recorded in [coverage](coverage.md).

The baseline checkout already provides `tools/inputs.sh acquire --lock inputs/sources.lock.json`. It verifies the recorded lock against the Git index, downloads into a fresh ignored workspace and returns `workspace`, `lockDigest`, and SQLite/sqlite-vec entries containing `version`, `sourcePath`, `archivePath` and `digest`. It does not build or prove compatibility. The current lock selects SQLite 3.53.4 and sqlite-vec 0.1.9; these are observations, not a second source-selection registry.

The retained [harness architecture](../../../engineering/2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) supplies Linux x86-64 tooling, SDK activation, exact tool identities, integrity checks and a real-browser/loopback fixture. `tools/harness.sh exec` checks the environment and prioritizes SDK Node/npm and WABT. Its progress output must be redirected so the build command's stdout can contain only its result JSON. The harness itself implements neither product compilation nor sqlite-vec integration.

This design is required because the change connects acquisition, native generation, WASM recipes, static initialization and browser verification. The initial source-based exploration did not execute the proposed integration; [Apply evidence](apply-evidence.md) now records its construction and checks.

## Goals / Non-Goals

**Goals:** Keep orchestration small; retain upstream build recipes; compile one separate C integration input; obtain one fresh construction per invocation; preserve the browser baseline; deliver exact runtime locations and identities to packaging.

**Non-Goals:** Resuming arbitrary handoffs, incremental source/build caches, changing source selection, installing another build system, adding consumer APIs, generating npm/GitHub packages or implementing candidate/release workflows. A-build checks its constructed runtime; A-acceptance still owns all mandatory gates on final packaged assets, including persistence through runtime termination.

## Decisions

### 1. One command delegates acquisition and canonical construction

Provide `bash tools/build.sh` from the repository root. Use Bash for the entry point and plain SDK JavaScript for structured arguments, path handling, JSON, hashing and subprocess orchestration, following existing tooling without a new dependency. Preserve the system Python-based A-inputs implementation.

After prerequisites/harness checks, call A-inputs acquisition with the repository's recorded lock. Do not expose an arbitrary `--handoff` input or re-resolve versions. Missing prerequisites fail; installation remains the explicit prerequisite sequence in the harness architecture. Repeated construction may reuse integrity-checked installed tools but never prior source trees or build outputs. This avoids trust/lifetime rules for mutable historical acquisitions. Caller cleanup removes successful temporary state only after consumption; failed construction retains its available log and state. A-inputs continues to own its own failed-acquisition cleanup.

Generate SQLite in the verified temporary source tree using the qualified host path: `env CC=cc CC_FOR_BUILD=cc CXX=/bin/false ./configure --enable-all`, then `make sqlite3.c`. Run these through the verified harness environment. SQLite core/header generation and the WASM/JavaScript recipes all come from that tree. A second amalgamation or separately downloaded bindings would violate their common release identity.

Record the exact build options in repository-authored build configuration or constants used directly by execution and reporting. Keep tool pins authoritative in the existing harness and its manifest/lock; do not maintain a second mutable tool-version registry. Record observed host platform, native compiler and GNU Make identities alongside the pinned SDK identities. Existing system prerequisites are not represented as an immutable OS image or an already qualified hosted-CI environment. Detect or exclude ambient build overrides that would defeat the retained options rather than allowing an unrecorded configuration.

### 2. One generated C bridge, no upstream source edits

Keep a small repository-authored template, for example `tools/build/extra-init.c.in`. Materialize it as `.work/build/run-…/extra-init.c` with the absolute path to the just-acquired `sqlite-vec.c`:

```text
define SQLITE_CORE locally in this translation unit
include the verified absolute sqlite-vec.c path
define sqlite3_wasm_extra_init(argument ignored):
    return sqlite3_auto_extension(sqlite3_vec_init with the required API cast)
```

The path is a C include operand, not interpolated shell code. Encode it correctly or reject an unrepresentable path with a diagnostic; pass subprocess arguments as separate arguments. sqlite-vec's quoted include locates its generated `sqlite-vec.h` next to its C file. Under `SQLITE_CORE` it uses `sqlite3.h`, found through SQLite's existing canonical include flags. No additional `-I`, global `CPATH`, replacement `cflags.common` or feature-removal macro is needed.

Pass the bridge path with the supported Make variable `sqlite3_wasm_extra_init.c`. The pinned recipe compiles it as a separate input beside `api/sqlite3-wasm.c` and selects its supported extra-initialization hook. Library initialization registers sqlite-vec; SQLite calls its entry point for every new connection. Return the registration result so errors are not suppressed. Preserve extension entry-point failure behavior. The generated bridge is execution-local; its absolute path is not a consumer asset or an upstream patch.

The relevant release sources are [SQLite GNUmakefile](https://github.com/sqlite/sqlite/blob/version-3.53.4/ext/wasm/GNUmakefile), [SQLite WASM support](https://github.com/sqlite/sqlite/blob/version-3.53.4/ext/wasm/api/sqlite3-wasm.c), [sqlite-vec C](https://github.com/asg017/sqlite-vec/blob/v0.1.9/sqlite-vec.c) and its [header template](https://github.com/asg017/sqlite-vec/blob/v0.1.9/sqlite-vec.h.tmpl). The official amalgamation archive supplies the generated header; do not regenerate it from the template or use the upstream repository as build input.

### 3. Select explicit upstream browser targets

From `ext/wasm`, request `b-vanilla b-esm b-bundler` with `emcc_opt=-Oz` and the bridge path. Retain the canonical full-featured settings, BigInt and memory defaults. Do not override the common C/JS flags or export lists. The [target generator](https://github.com/sqlite/sqlite/blob/version-3.53.4/ext/wasm/mkwasmbuilds.c) and Makefile establish the following release-specific output inventory:

| Runtime files in jswasm | Role |
| --- | --- |
| `sqlite3.js`, `sqlite3.mjs`, `sqlite3-bundler-friendly.mjs` | Conventional, ESM and bundler-friendly initialization |
| `sqlite3.wasm` | Shared browser engine containing sqlite-vec |
| `sqlite3-worker1.js`, `sqlite3-worker1.mjs`, `sqlite3-worker1-bundler-friendly.mjs` | Worker1 variants |
| `sqlite3-worker1-promiser.js`, `sqlite3-worker1-promiser.mjs`, `sqlite3-worker1-promiser-bundler-friendly.mjs` | Promise-interface variants |
| `sqlite3-opfs-async-proxy.js` | Upstream OPFS proxy |

Each main target depends on the auxiliary workers/promisers/proxy. Upstream transforms the bundler loader to refer to the shared WASM. Keep filenames and relative placement unchanged; do not introduce a consumer asset resolver. Build subdirectories and additional WASM intermediates remain build state, not additional distributable engines.

`all` also builds demos/benchmarks and omits the main bundler target; `oz` cleans and rebuilds the default set. Neither describes the selected browser output. Requesting the three explicit targets with the optimization variable preserves the intended recipes. Upstream adds `-g3` and performs WABT stripping and its normal Binaryen/JS postprocessing. The existing verified WABT prerequisite is mandatory even though explicit targets do not have all protections associated with upstream distribution targets. Do not replace these postprocessing operations with locally reconstructed ones. Start sequentially; parallel tuning is unnecessary for this realization.

Eleven filenames describe the inspected 3.53.4 output, not an immutable definition of every future release's baseline. Keep the expected inventory in one build configuration, check required companions against the pinned recipe, and fail if an upstream change requires reconsideration instead of silently omitting new baseline capabilities.

### 4. Preserve storage and API behavior without runtime glue

FTS5 and the default APIs/VFSes stay enabled through the canonical recipes. For the current release, OPFS includes `opfs`, `opfs-sahpool` and `opfs-wl`; they are implemented within the JS bindings and their companion proxy rather than separate vector engines. The full baseline also retains other default capabilities and applicable VFSes such as `kvvfs`, not just the named minimum features.

Document secure-context and Worker requirements. `opfs` and `opfs-wl` require their upstream isolation/SharedArrayBuffer conditions; the retained loopback fixture emits COOP `same-origin` and COEP `require-corp`. `opfs-wl` also depends on Web Locks and `Atomics.waitAsync()`. `opfs-sahpool` does not require these isolation headers and has its own pool, connection and concurrency limitations. Preserve release-specific restrictions; do not promise main-thread OPFS, arbitrary cross-VFS concurrency or a transient fallback. These conditions must be checked against the pinned sources and official documentation, rather than copied from newer moving documentation.

### 5. Emit an atomic, success-only build handoff

Create fresh `.work/build/run-…/` state containing the bridge, diagnostic log and final `handoff.json`. Keep generated runtime assets in the acquired SQLite tree's native `ext/wasm/jswasm/` directory. This avoids another staging copy; A-package will assemble its own consumer payload from the inventory.

Use schema version 1 with this minimal field contract:

| Field | Recorded value |
| --- | --- |
| `schemaVersion` | Integer `1` |
| `inputs` | The consumed A-inputs lock digest and SQLite/sqlite-vec version, archive digest and source/archive locations |
| `build` | Actual selected targets, Configure/Make options, checked tool identities and observed host environment |
| `runtimeDirectory` | Absolute native upstream output directory |
| `runtimeFiles` | Eleven relative runtime names, each with nonzero byte size and SHA-256 digest |
| `logPath` | Absolute log path for this invocation |

Verify every expected output is a regular, nonempty file before hashing and completion. Produce metadata from the parameters actually executed and identities actually checked. Write the completed handoff atomically and emit the same parsed JSON on stdout; progress/tool output goes to stderr and the diagnostic log. Failed steps return nonzero, retain available diagnostic state and never emit or select an older successful result. No acceptance verdict, package version, tag or publication status is present. Packaging can validate the declared bytes; build hashes do not institute a release or require byte-identical rebuilding.

### 6. Verify the constructed engine within A-build

Add offline orchestration tests for acquisition delegation, paths/arguments, inherited canonical flags, missing tools, failed generation/compilation and incomplete output/handoff behavior. Register applicable offline tests in the existing test entry point during Apply; no SDK/network installation enters the lightweight gateway.

Run a real clean-checkout build with the retained harness. Browser checks use the generated eleven-file runtime directly and existing browser/server helpers: conventional/ESM loading on main thread and Worker; multiple independent C-style/OO1 connections with pinned SQL versions; BigInt, FTS5 and a deterministic vec0 operation; Worker1/promiser open/execute/results/close; expected VFS initialization under the appropriate conditions. Check all expected variant files and their companion references, including the bundler files, without claiming compatibility with every bundler.

Use the same-release canonical recipe/API inventories and an unmodified same-release baseline reference for omission detection. Any reference construction uses a separate fresh temporary tree and identical retained options without the C bridge; it must not replace the production build or serve as acceptance evidence for it. Differences are limited to added upstream sqlite-vec functionality and corresponding binary/code-generation differences. Record what was compared: public exports/APIs, loading assets, default SQL capabilities and VFS availability. Avoid a bytes-equal JS/WASM requirement. The reference and checks are validation support, not a second product runtime or package.

These checks establish A-build behavior. They do not replace A-acceptance's complete final-package suite, independently known vector/Hamming fixtures, persistence through shutdown/reopen or full hosted-CI production proof. Later packaging must preserve these exact runtime bytes and rerun applicable final-asset checks.

## Risks / Trade-offs

- Static integration has been inspected but not compiled → validate against the acquired release archives and retained SDK; report incompatibility without patches or automatic pin fallback.
- Future SQLite releases can alter targets, runtime files or VFSes → compare the selected pinned baseline and fail on unsupported changes instead of treating eleven files as universal coverage.
- Temporary absolute paths complicate escaping and output lifetime → generate one bridge with explicit path handling; retain successful source/build workspaces until consumption and record failures independently.
- Missing `wasm-strip` can break optimized output despite Make's warnings → retain mandatory harness verification before compilation.
- The qualification observed managed-workspace extraction anomalies → use the documented external `HARNESS_STATE` workaround when needed and continue to fail altered member checks; do not weaken integrity.
- Installed tools are pinned while host system prerequisites remain environmental → record actual host tools and document their role; broader bare-OS and hosted-CI qualification is not claimed by this plan.

## Migration Plan

No published consumer API exists to migrate. Apply was authorized after coverage confirmation, and its execution is recorded in [Apply evidence](apply-evidence.md). Distinct 42P Verification and archive under repository rules remain required before human merge. Reverting the build implementation leaves the existing A-inputs/harness available; source and generated outputs remain ignored temporary material.
