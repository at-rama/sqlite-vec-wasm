# Allocation and Change coverage

## Source snapshot and boundaries

Direct source: [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `3db3cd9cd944c765b8168a1ce4bcc15c9960e4bf52c44c7319d6f3b65250772b`, at baseline `9049129ace2473ca83a3ca4aa72bdcb092645fee`. The [Distribution Capture](../../../engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md), SHA-256 `c54fd0987c4ab340d2d6f614d98057d6752d7afe0bd851411472589fe4994bef`, projects instituted decisions and sources; it does not institute or corroborate them. Its immutable S-spec provenance retains the historical contract. The current source snapshots ground exactly `A-acceptance`, through Distribution `C-inputs`, `C-browser`, `C-static`, `C-storage`, `C-verification` and `C-release`.

Requirements below identify [delta](specs/browser-acceptance/spec.md) blocks and their scenarios; task numbers identify [tasks](tasks.md). [Design](design.md) decisions select realization mechanisms within this unit: existing harness/producers, deterministic fixtures, two Workers per VFS, live baseline, fresh hosted production and authoritative-revision evidence renewal. These choices are proposed here, not previously instituted product requirements or observed acceptance results.

## Allocation unit to Change

| A-acceptance obligation | Delta requirement | Scenarios | Tasks |
| --- | --- | --- | --- |
| CI full clean-checkout acquisition, integrity, build, verification and packaging with documented prerequisites and no unpublished inputs/previous outputs/required caches | Clean production in CI | Empty production state; Production step fails | 1.1, 1.4, 5.1, 6.1 |
| Reproduction of defined function and contents without byte-identical rebuild obligation | Clean production in CI | Empty production state | 1.1, 1.4, 5.1, 6.1 |
| Test final package assets rather than a separate development build | Final packaged asset consumption | Relocated final archive; Payload identity fails | 1.3, 2.3, 5.2, 6.1 |
| Main-thread/Worker initialization and SQL, pinned SQLite/vec versions including independent connections without registration | Initialization and independent connection versions | Main-thread and Worker connections; Missing or wrong extension | 2.2, 6.1 |
| FTS5 creation, insertion and expected matches | FTS5 query behavior | Known text matches | 3.1, 3.4, 6.1 |
| vec0 creation/insertion and deterministic identifiers/distances | Deterministic vector queries | Known Float32 neighbors | 3.1, 3.4, 6.1 |
| Binary bit vectors and independently known Hamming distances/order without ties | Binary Hamming queries | Distinct binary neighbors | 3.2, 3.4, 6.1 |
| Worker1 and promise open/exec/result/close lifecycle using sqlite-vec | Worker1 and promise interface behavior | Worker1 lifecycle; Promiser lifecycle | 2.2, 3.3, 6.1 |
| Every retained default OPFS VFS preserves committed ordinary/vector data through close, runtime/Worker termination, fresh init, same-origin reopen and expected vector search | Every default OPFS VFS survives runtime restart | OPFS write and fresh reopen; Persistence is unavailable or lost | 4.1, 4.2, 4.3, 4.4, 6.1 |
| All mandatory gates execute in at least one real browser satisfying prerequisites; no unavailable/skipped persistence pass | Real-browser prerequisites and recorded conditions; Complete acceptance outcomes | Supported browser execution; Prerequisite is absent; Incomplete or failed run | 1.2, 2.4, 4.1, 4.4, 5.1, 6.1 |
| Record browser versions and hosting conditions | Real-browser prerequisites and recorded conditions | Supported browser execution | 1.2, 2.4, 4.1, 5.2, 6.1 |
| Detect accidental public API/loading/default-capability omissions against pinned baseline | Packaged baseline preservation checks | Retained baseline; Baseline omission | 2.1, 2.2, 2.3, 2.4, 6.1 |
| Evidence applies to actual authoritative released revision and exact published payload; merge alone cannot transfer a PR-head pass | Revision and payload applicable evidence | Authoritative revision is evaluated; Revision or payload differs | 1.2, 1.3, 5.1, 5.2, 5.3, 6.1 |
| Gather production outcomes from A-inputs/build/package and supply gate results to A-updates/release without owning their actions | Complete acceptance outcomes; Revision and payload applicable evidence | Complete success; Incomplete or failed run; Authoritative revision is evaluated | 1.1, 1.2, 5.2, 5.3, 6.2 |

The unit's surface and evidence target are represented by CI production, final-payload browser results and evaluated state/payload applicability. Raw build/packaging scoped checks remain producer controls, not a substitute for this complete acceptance. No other allocation unit is realized by this Change.

## Change to allocation unit

| Delta requirement | A-acceptance grounding | Design / tasks |
| --- | --- | --- |
| Clean production in CI | Explicit full production/reproduction obligation under C-inputs/C-verification | D1, D5 / 1.1, 1.4, 5.1, 6.1 |
| Final packaged asset consumption | Explicit final packaged rather than development assets; exact-payload evidence | D2 / 1.3, 2.3, 5.2 |
| Initialization and independent connection versions | First required browser gate and C-static registration evidence | D2, D3 / 2.2 |
| FTS5 query behavior | Explicit FTS5 gate | D3 / 3.1, 3.4 |
| Deterministic vector queries | Explicit vec0 deterministic identifiers/distances gate | D3 / 3.1, 3.4 |
| Binary Hamming queries | Explicit independently known bit/Hamming gate without ties | D3 / 3.2, 3.4 |
| Worker1 and promise interface behavior | Explicit Worker1/promiser lifecycle gate | D2, D3 / 2.2, 3.3 |
| Every default OPFS VFS survives runtime restart | Explicit committed-data and same-origin fresh-runtime persistence gate | D4 / 4.1–4.4 |
| Real-browser prerequisites and recorded conditions | Explicit real-browser/prerequisite/no-skip and version/hosting evidence conditions | D4, D5, D6 / 1.2, 2.4, 4.1, 4.4, 5.1, 5.2 |
| Packaged baseline preservation checks | Explicit public API/loading/default-capability omission detection under C-browser | D2 / 2.1–2.4 |
| Revision and payload applicable evidence | Explicit authoritative revision/exact-payload applicability, not merge inference, under C-release | D5, D6 / 1.2, 1.3, 5.1–5.3 |
| Complete acceptance outcomes | Complete mandatory gate outcomes and evidence supplied to A-updates/A-release; prevents partial/unavailable results from satisfying the allocated evidence target | D1, D6 / 1.1, 1.2, 5.2, 6.1, 6.2 |

All twelve requirements and 21 scenarios trace to this unit. All 21 tasks implement those requirements or their scoped tests/documentation/integration: production/report tasks 1.1–1.4, packaged-baseline tasks 2.1–2.4, SQL tasks 3.1–3.4, persistence tasks 4.1–4.4, CI/applicability tasks 5.1–5.3 and integration tasks 6.1–6.2. No task changes product pins, performs registry setup, prepares adoption candidates, merges, tags, publishes or implements the site. Failure reports, independent extraction, arithmetic fixtures and artifact retention realize the existing evidence responsibilities rather than adding an application capability or another Verification stage.

## Unit-scoped planning gate

Under [OpenSpec usage](../../../standards/openspec.md), **planning coverage: PASS for `A-acceptance` ↔ `accept-packaged-browser`**.

- **Allocation unit → Change: 100%.** Every material obligation and composition/evidence boundary is mapped above.
- **Change → allocation unit: 100%.** Every delta requirement, scenario and task is grounded in this unit or its necessary scoped realization.

This is authored-plan coverage, not successful implementation, current CI/browser evidence, publication applicability or human integration approval. Any necessary semantic revision requires upstream escalation where applicable and renewed coverage before Apply. 42P Verification must independently reassess both directions after implementation under the current source snapshots.

## Composition and next stage

A-inputs supplies verified pins/sources, A-build supplies canonical runtime behavior and A-package supplies the final archive. Their capabilities remain unchanged. Acceptance supplies the exact identified payload and complete outcomes to A-updates/A-release. A-release still owns shared version/revision/channel policy, actual publication and enforcement of applicability; A-bootstrap owns initial registry/trusted-publishing setup. Post-merge evaluation proposed here proves that authoritative revision and archive without triggering their publication.

All planning artifacts are present; tasks remain pending. Apply must use this unit-scoped plan, then the repository-owned 42P Verification composition and subsequent Archive. A planning PR intentionally has neither a post-Apply verification report nor an archive and is not merge-ready under existing gates.
