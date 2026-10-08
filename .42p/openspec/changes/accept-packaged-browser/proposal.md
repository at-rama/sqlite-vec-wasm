# Proposal

## Why

Construction and packaging already supply checked browser assets, but neither establishes complete product acceptance. Realize `A-acceptance` to prove the clean production path in CI and the required browser behavior on the exact final package.

## What Changes

- Execute fresh pinned-tool/source acquisition, integrity checks, construction, verification and packaging in hosted CI without required caches or previous outputs.
- Test independently extracted final archive bytes through retained loading/API surfaces, SQL versions, FTS5, deterministic Float32 and binary Hamming queries, Worker1 and its promise interface.
- Prove ordinary and vector data survive connection closure, Worker termination, fresh runtime initialization and reopening for every retained default OPFS VFS.
- Compare the packaged runtime with the same pinned unmodified SQLite baseline to detect missing APIs, loading surfaces and default capabilities.
- Record revision, archive/runtime identities, browser and hosting conditions, complete outcomes and failure diagnostics; supply evidence applicable to the authoritative revision and exact payload for A-release.

This Change realizes exactly `A-acceptance` from [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `3db3cd9cd944c765b8168a1ce4bcc15c9960e4bf52c44c7319d6f3b65250772b`, at baseline `9049129ace2473ca83a3ca4aa72bdcb092645fee`. The [Distribution Capture](../../../engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md), SHA-256 `c54fd0987c4ab340d2d6f614d98057d6752d7afe0bd851411472589fe4994bef`, retains its reconciled projection of instituted decisions and sources. Neither document nor this plan proves execution. See [design](design.md) for realization choices and [coverage](coverage.md) for both mapping directions.

## Capabilities

### New Capabilities

- `browser-acceptance`: Clean production and final-package browser acceptance, baseline preservation, OPFS restart persistence and revision/payload-bound evidence.

### Modified Capabilities

None. `upstream-inputs`, `browser-build` and `browser-package` are consumed with their requirements unchanged.

## Impact

Implementation will add an acceptance entry point, plain JavaScript browser/fixture/report helpers, offline orchestration/report tests and contributor documentation; register those tests in `tools/test-repository.sh`; and add a hosted acceptance workflow. It will reuse the pinned harness, native assertions, loopback server, upstream APIs and existing producer handoffs. Refactoring existing probe/reference helpers is limited to reuse without changing producer responsibilities. No new runtime dependency, source pin, product API or upstream patch is planned.

PR checks evaluate the actual checked-out candidate; authoritative-branch checks renew acceptance for that revision and preserve the exact accepted archive with its evidence. Release triggering, candidate preparation, registry setup, tagging, publication and site deployment remain outside this Change. All tasks are pending; Apply, 42P Verification and Archive remain subsequent operations.
