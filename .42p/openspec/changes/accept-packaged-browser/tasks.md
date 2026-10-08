# Tasks

## 1. Production composition and evidence foundation

- [x] 1.1 Add the acceptance entry point composing fresh harness install/check/deps/smoke, existing build and package producers with explicit package metadata; verify synthetic step failures return nonzero without reusing previous outputs.
- [x] 1.2 Add a versioned report and required-case matrix carrying clean Git/CI identities, inputs/tools/options and available stage outcomes; verify offline tests reject dirty revision claims, missing mandatory cases, skipped gates and substituted historical success.
- [x] 1.3 Add final archive/handoff identity validation and independent extraction for browser use; verify altered bytes, missing files and mismatching input identities fail with retained diagnostics.
- [x] 1.4 Register the new offline acceptance suite in `tools/test-repository.sh` and document production commands/state lifetime in `docs/acceptance.md`; verify the registered suite and documentation links.

## 2. Packaged loading surfaces and baseline

- [ ] 2.1 Factor the existing pinned unmodified-reference/probe logic only as required for reuse and compare its inventories against final-package results; verify retained producer checks still work and a deliberately omitted API/capability is rejected.
- [ ] 2.2 Exercise all conventional/ESM/supplied bundler main-thread, Worker, Worker1 and promiser surfaces, independent C/OO1 connections, exact SQLite/vec versions and BigInt; verify the recorded packaged-browser matrix and rejection of a wrong/missing connection version.
- [ ] 2.3 Reuse package-resolution/consumption and missing/corrupt-companion controls with request-mount and pre/post digest checks; verify every shipped runtime asset is requested from the extracted package and substitutions fail.
- [ ] 2.4 Document baseline and loading-surface evidence limits alongside the suite; verify offline report tests reject omitted surfaces and hosted/local browser results identify the reference and actual browser conditions.

## 3. Independently expected SQL fixtures

- [ ] 3.1 Add FTS5 identifier-set and deterministic Float32 vec0 fixture checks with independent expected distances and declared tolerance; verify correct rows/order/distances and deliberately incorrect expectations fail.
- [ ] 3.2 Add eight-bit binary fixtures with XOR/popcount expectations `0,1,2,3,4`, no ties and exact Hamming assertions; verify real packaged searches and negative identifier/distance/order controls.
- [ ] 3.3 Strengthen Worker1/promiser SQL-result and close checks across retained variants; verify explicit open/exec/result/close outcomes and failure propagation.
- [ ] 3.4 Document fixture construction, independent arithmetic and floating-point tolerance; verify fixture/report tests distinguish exact Hamming assertions from Float32 tolerance and cover every SQL gate.

## 4. OPFS runtime restart persistence

- [ ] 4.1 Add explicit per-VFS prerequisite recording and unique database/pool identities for the pinned baseline's `opfs`, `opfs-wl` and `opfs-sahpool`; verify absent prerequisites/VFSes fail rather than skip or fall back.
- [ ] 4.2 Add transactional ordinary/Float32/bit writes, explicit close acknowledgement and first-Worker termination, followed by a second fresh Worker under the same server/context/origin; verify no original runtime is reused.
- [ ] 4.3 Implement read-only reopen probes returning ordinary fixtures and independently expected Float32/Hamming results, with cleanup after evidence; verify all three VFSes pass on actual final assets and missing/deleted fixture data fails without repair/repopulation.
- [ ] 4.4 Document same-origin, VFS-specific prerequisites, explicit SAH initialization and orderly Worker-restart scope; verify per-VFS report completeness tests and actual write/terminate/reopen outcomes.

## 5. Hosted CI and downstream artifact identity

- [ ] 5.1 Add the pinned-action acceptance workflow for PR, `main` and explicitly selected manual revisions, documented system-package setup and empty state; verify a hosted working-branch run reconstructs the complete product without restored caches.
- [ ] 5.2 Upload the exact accepted archive, handoffs, report and logs together and retain available failure diagnostics; verify downloaded artifact hashes, complete matrix and actual checked-out revision/run/attempt, including rejection of changed revision/payload or unavailable evidence.
- [ ] 5.3 Document authoritative-revision renewal, artifact retention/consumption and required-check configuration responsibility; verify no workflow performs merge/tag/publication and that package inputs can be supplied unchanged by a later release consumer.

## 6. Complete integration

- [ ] 6.1 Run the full command from an isolated clean checkout with empty tools/dependencies/sources/output state, then retrieve hosted CI evidence; verify every mandatory packaged-browser and production gate, all per-VFS reopen queries and exact archive/revision identity.
- [ ] 6.2 Run registered repository tests, canonical repository check and strict OpenSpec validation; review final `A-acceptance` bidirectional coverage and record Apply execution evidence without claiming subsequent 42P Verification, Archive or publication.
