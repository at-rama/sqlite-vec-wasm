# Design

## Context

See [proposal](proposal.md) for motivation and [delta](specs/browser-acceptance/spec.md) for obligations. The current producers emit version-1 build/package handoffs with inventories and digests. `tools/package/check.mjs` exercises twelve packaged loading contexts and companion-failure cases but explicitly excludes Hamming, restart persistence and complete production CI. `tools/build/check.mjs` constructs an unmodified reference and compares C/OO1/WASM/VFS/SQL inventories against raw constructed assets. `tools/build/browser-probe.mjs` already checks BigInt, FTS5, independent connections, Float32 neighbors and immediate VFS read/write. Neither checker currently proves a full A-acceptance verdict.

The pinned harness provides SDK Node/npm, playwright-core, a verified official Chrome headless shell and a loopback COOP/COEP server. The current Repository workflow runs offline checks/tests and Change merge gates. No active Change exists at the planning baseline; three durable capabilities cover acquisition, construction and packaging.

## Goals / Non-Goals

**Goals:** compose the existing producers and browser infrastructure into one fail-closed acceptance command, exercise final tarball bytes, add independent query oracles and separate write/reopen runtimes, and preserve usable evidence for the exact evaluated revision and archive.

**Non-Goals:** change source selection, runtime APIs, vector semantics, producer contracts, release identity policy or 42P governance. Browser-process restart, crash recovery, quota stress, concurrency benchmarks, exhaustive bundler integration and universal-browser qualification are outside this plan. Worker termination is the selected contract-compliant runtime-restart boundary. Publication and site deployment remain allocated elsewhere.

## Decisions

### D1 — One production command with fresh state

Add `tools/acceptance.sh` and plain JavaScript helpers under `tools/acceptance/`. The shell establishes documented system prerequisites and fresh temporary tool/dependency/output state, installs/checks the recorded harness, runs dependencies/smoke, then acquisition through `tools/build.sh` and assembly through `tools/package.sh`. Run producer conformity checks as applicable and the complete final-package suite before success. Use an explicit caller-supplied package name/version, with a nonpublished fixture default for PR evaluation; never select or publish a release identity here. Record Git revision and dirty state; successful revision-bound evidence requires a clean tracked snapshot.

Do not reuse cached SDK/npm/source/build/package state as a prerequisite. SDK configuration may generate its own fresh cache during the run. A locally reusable installed environment remains useful for scoped development checks, but does not constitute the clean-production proof. Reusing only existing scoped checks was rejected because it leaves CI/Hamming/restart obligations unproved.

### D2 — Isolated final archive plus live baseline

Verify the package handoff and actual archive/file hashes, extract the tarball independently into a fresh workspace, and serve its unchanged runtime files at `/runtime/`. Test pages and Worker drivers live outside that mount. Record and validate runtime requests so no temporary build directory can satisfy an asset request; recheck hashes after execution. Reuse existing package-consumption and negative-companion checks where possible without rerunning a second copy of every positive probe unnecessarily.

Construct an unmodified canonical SQLite reference from the same verified source pin and retained tool/options, using the existing reference logic factored only as needed. Compare its public C/OO1/WASM/SQL/VFS inventories with results from the packaged runtime, permitting sqlite-vec additions. Exercise conventional, ESM and supplied bundler-friendly main/Worker/Worker1/promiser surfaces, independent C-style and OO1 connections and exact SQL versions. Explicit API/loading checks supplement inventory inclusion. A hard-coded runtime inventory alone was rejected because upstream default capabilities can evolve; raw-build comparison alone does not evidence final assets.

### D3 — Independent deterministic fixtures

Extend browser fixtures using native assertions and upstream SQL only. Retain a small Float32 fixture with simple independently computed Euclidean distances and a declared tolerance of `1e-5`; verify identifiers, ordering and distances. Use FTS5 fixtures with known matching identifiers rather than only a match count. Check both upstream version values on each independently opened connection, not just extension existence on the second connection.

For Hamming use an eight-bit zero query and bytes `0x00`, `0x01`, `0x03`, `0x07`, `0x0f`, with stable row identifiers and independently known distances `0, 1, 2, 3, 4`. Encode bytes using the pinned sqlite-vec bit-vector input mechanism; calculate expectations by host-side XOR/popcount, never by asking sqlite-vec. Request all neighbors and assert exact distances and order. These fixtures have no ties and do not depend on bit orientation. Semantic-neighbor quality and random/generated expectations were rejected because they weaken reproducibility or independence.

Worker1 and promiser probes retain their open/exec/close lifecycles and verify exact upstream-version rows plus a known sqlite-vec SQL result. Cover all shipped upstream variants without adding a product wrapper.

### D4 — Two Workers per persistent VFS

For `opfs`, `opfs-wl` and `opfs-sahpool`, create a unique database name per acceptance run. Check actual prerequisites and fail if a required VFS is unavailable. The first Worker loads the final runtime, explicitly initializes a SAH pool where required, creates ordinary and vec0 fixture tables, writes them in a transaction, commits, closes and acknowledges closure. The controller then terminates the Worker. The second, newly constructed Worker initializes a fresh runtime and reopens the identical database under the same origin and VFS. It only reads existing tables and executes expected vector queries; it must never create, repair or repopulate the test database. Persist both Float32 and bit fixture tables to exercise both reopen query paths.

Keep the server and browser context alive across both phases so origin/storage remain identical; the existing server selects a random port on each start. Use an explicit unique SAH-pool storage directory retained between phases and absolute database paths. Closing the connection before termination preserves the required committed orderly-shutdown scenario; this is not a crash-durability test. Release cleanup must run after evidence is captured, without masking failures. Reopening in the first Worker was rejected because an existing runtime can retain state; a fresh browser context was rejected because it discards the tested storage. Whole-browser restart is unnecessary for the allocated runtime/Worker termination boundary.

### D5 — Hosted evaluation and exact artifact handoff

Add a separate `Acceptance` workflow on pull requests, pushes to `main` and manual dispatch for an explicitly checked-out revision. Use Ubuntu 24.04 with explicit installation of the documented native/browser system packages and record actual environment versions. Pin every external action to a reviewed full commit. Do not restore caches. PR results identify the actual checkout revision, including when GitHub provides a synthetic merge revision; do not mislabel it as the PR head.

On `main`, run the same clean production path for that authoritative commit. Upload the exact accepted `.tgz`, handoffs, report and relevant logs together, with revision/run/attempt and archive/runtime hashes; upload available failure records even when the job fails. Missing required evidence upload must fail a successful handoff. Keep a documented finite artifact-retention policy and require renewal if evidence or payload is unavailable. A-release can consume this accepted artifact and verify identities without rebuilding/repacking; accepting a different revision/payload requires applicable new evidence. Version inputs are carried without A-acceptance deciding the A-release version policy. This supplies applicability without implementing release triggering or publication.

Do not carry a PR pass forward merely through merge ancestry or equality of selected files. Re-evaluation on the authoritative commit was selected for a simple auditable identity argument. The acceptance job produces mandatory product outcomes for later A-updates/A-release consumers; existing required-check configuration is not silently altered by this planning Change. During Apply, verify hosted execution on the working branch and document any required repository-admin check registration without claiming workflow YAML alone enforces branch protection.

### D6 — Complete report with failure evidence

Write a versioned machine-readable acceptance report into ignored/external temporary state. Include checked commit/tree and dirty state, CI run identity when present, input/lock/config/tool identities and options, archive/runtime inventories, baseline identity/results, browser version, observed secure/isolation/header conditions, VFS prerequisites and every mandatory case. Gate outcomes distinguish passed, failed and not executed; only complete current success yields the acceptance handoff. Available failures and logs remain identifiable even when production fails before an archive exists; absent identities remain absent, never invented. An overall nonzero exit is mandatory on incomplete results.

Offline tests use synthetic producer/report fixtures for failure propagation, required-matrix completeness, digest/revision mismatch and missing runtime/prerequisite cases; they do not pretend to prove browser behavior. Register them with `tools/test-repository.sh`. Hosted real-browser execution supplies the product evidence. This runtime report is distinct from the subsequent Change-local `verification.md` required by 42P Verification, and introduces no additional 42P stage.

## Risks / Trade-offs

- Full tool acquisition and reference reconstruction cost CI time → retain the small fixture matrix, reuse one runtime/reference per run and avoid duplicate positive probes; no performance SLA is introduced.
- Hosted libraries/network or browser prerequisites fail → install/document prerequisites, preserve logs and fail acceptance; do not skip or use historical results.
- OPFS tests accidentally repair data or change origins → dedicated read-only reopen phase, fixed live server/context, explicit paths and unique pool directory.
- Shared implementation/test helpers miss a common error → independent arithmetic/text expectations, live unmodified baseline and archive/hash/request checks; common authorship remains an evidence limitation.
- Future upstream adds/removes a default VFS → derive the required default set from the pinned baseline and reconcile explicit scenarios; never silently shrink it to the locally available VFSes.
- CI artifacts expire or package identity changes before publication → reject an unavailable/mismatching handoff and renew acceptance under the actual revision and package inputs.

## Migration Plan

Add the acceptance command and suite without replacing producer entry points or offline Repository jobs. Exercise negative/offline controls first, then fresh local production and hosted real-browser execution on the working branch. Verify the complete matrix and artifact retrieval/identity before the later 42P Verification. Document commands and evidence consumption in `docs/acceptance.md`, linked from contributor build/packaging material. Generated engines, archives and raw reports remain uncommitted. A rollback removes the acceptance implementation and workflow but cannot leave a claim of successful A-acceptance or authorize publication without mandatory evidence.
