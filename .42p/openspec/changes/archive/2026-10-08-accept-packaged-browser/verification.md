---
schema_version: 1
change: accept-packaged-browser
allocation_unit: A-acceptance
checked_commit: 9f6a395fc22162e32de0c8cf045183ecadc0a459
verdict: passed
coverage:
  allocation_to_change: 100
  change_to_allocation: 100
openspec_verify: passed
repository_checks: passed
applicable_tests: passed
---

# Verification — accept-packaged-browser

## Institutional view

**Situated conclusion.** Verification passed for `accept-packaged-browser`, limited to `A-acceptance`, at clean candidate `9f6a395fc22162e32de0c8cf045183ecadc0a459`. Repository controls were rerun locally. Renewed [hosted execution and its retrieved primary bundle][run] passed nine production stages and 22 packaged-browser cases. That execution checked GitHub's synthetic merge `f38aa6d921242d5a41244e4c92dc14704954921b`, whose complete tree was verified identical to the candidate; it is not relabeled as the candidate commit or a future authoritative release. Earlier Apply runtime results are not the decisive execution evidence. The three Verification controls completed satisfactorily; the result establishes this unit's implementation and tested behavior under the recorded conditions, not publication applicability for an untested future revision.

**Command provenance.** The examined command is [Allocation, A-acceptance, lines 52–71][allocation], derived from Distribution `C-inputs`, `C-browser`, `C-static`, `C-storage`, `C-verification` and `C-release`. Their relevant clean-production, browser, persistence and revision/payload passages were compared with [historical S-spec][source], sections “Inputs and reproduction”, “Distribution contract” and “Acceptance gates”. They preserve the corresponding requirements in the [Distribution Capture][capture]. S-spec retains instituted authority; the Capture and Allocation are derived projections, not independent corroboration. This scoped correspondence examination is not an audit of every source or the entire Allocation; hashes identify documents without proving fidelity by themselves.

**Clean production and final packaged bytes — established in renewed CI.** The retrieved bundle's `run-NH2rTr/acceptance.json` records fresh installation, checked tools/dependencies, smoke, construction, packaging, browser checks and final bundling, with a clean checkout and no restored producer state. The exact `payload.tgz` was downloaded and separately hashed; its 11 runtime members were independently inspected with Python tarfile/hashlib against the package inventory. Final consumers load extracted package assets under `/runtime/`, and all required assets are requested. The [primary bundle][run] contains the handoffs, logs and results; [production definitions][production] describe state rejection and failure propagation. Defined contents/functionality are evaluated, without demanding byte-identical rebuilds.

**Initialization, SQL and Worker1 — established in renewed browser execution.** `browser.json` cases `vanilla-*`, `esm-*`, `bundler-*`, `fts5`, `float32` and `hamming` passed. Main/Worker probes open distinct C-style and OO1 connections and check SQLite `3.53.4` and sqlite-vec `v0.1.9`; Worker1 and promiser execute their open/SQL/result/close lifecycles and return vector length `2`. FTS5 returns IDs `1,3`; Float32 IDs/distances agree with host arithmetic within `1e-5`; bit-vector Hamming distances are exactly `0,1,2,3,4`, without ties. The [execution results][run] and [independent oracle definitions][oracles] support those finite fixtures, not arbitrary-query semantic completeness. Wrong identifier/distance/order/text expectations are rejected; wrong connection versions are rejected by the examined probe assertions rather than an injected upstream-engine mutation.

**Every default OPFS VFS after runtime restart — established in renewed browser execution.** `restart-opfs`, `restart-opfs-wl` and `restart-opfs-sahpool` each passed committed writes, acknowledged close, Worker termination, fresh Worker initialization and reopening the same database at the same origin. Each reopened result contains both original ordinary rows and the expected Float32 and bit neighbors. The [primary results][run], locators `browser.json/cases/restart-*`, record paths, conditions and outcomes; the [controller definition][browser-check] establish separate invocations, explicit VFS selection and a read phase with no fixture creation or insertion. The missing-table negative control fails without repair. This proves orderly runtime/Worker restart in the tested browser, not crash durability or closing/restarting the whole browser process.

**Browser conditions and retained baseline — established by execution and scoped comparison.** Chrome headless shell `153.0.8010.12` executes every mandatory case; loopback origin `http://127.0.0.1:45939` is secure and isolated, with COOP `same-origin` and COEP `require-corp`. Every reopen records OPFS, sync handles, SAB, Web Locks and waitAsync as present. The [bundle][run], `browser.json/hosting`, `cases/restart-*/result/*/conditions` and `baseline`, retains those observations and the same-pin unmodified reference inventories. API/OO1/WASM/SQL/VFS inclusion and twelve loading contexts pass; the explicit default OPFS set is all three VFSes. Missing APIs, changed VFS sets, required cases and hosting prerequisites fail the renewed offline controls. This is one qualifying browser, not universal browser/bundler compatibility or exhaustive equivalence of all API behaviors.

**Revision/payload evidence and downstream boundary — mechanism verified; no release asserted.** The retrieved [bundle][run] identifies actual checkout, CI run/attempt, archive and runtime digests. Rechecking `assertApplicable` with that actual commit succeeds; substituting the candidate commit or archive hash fails. The [workflow definition][workflow] checks the actual PR checkout, renews on `main`, accepts explicit manual revision/package inputs, and uploads exact accepted bytes plus available diagnostics for 30 days. The [consumption rules][documentation], section “Reports and release consumption”, require available matching evidence and bytes; merge ancestry alone supplies neither. A future authoritative revision and its actual publication payload must receive applicable acceptance evidence. Actual publication, downstream enforcement and required-check administration remain responsibilities of A-updates/A-release; they were not performed or established here.

**Complete outcomes and failure handling — established through tests and code examination.** All nine production and 22 browser statuses are required, with no mandatory skip accepted. Renewed offline tests reject incomplete/skipped records, dirty source, stale producer state, substituted identities, baseline omissions and injected producer failures. Browser controls exercise missing/corrupt companions, wrong query expectations and removed persistent data. The [test definitions][tests] and [hosted results][run] distinguish simulated orchestration failures from real packaged-runtime observations. Available failures retain diagnostics and return failure; producers supply outcomes to acceptance without acceptance merging, tagging or publishing.

**Common dependencies and remaining limits.** Product execution uses public upstream SQL/loading surfaces and separately extracted archive bytes, but the harness, probes and candidate share repository tooling and material agentic authorship with Apply. The unmodified reference shares build options, construction helpers and inventory probes; a shared defect could escape comparison. Host arithmetic and this invocation's Python archive hashing are separate from SQL's returned expectations, while deterministic fixture selection remains repository-authored. Hosted system packages are environment prerequisites, not an immutable OS image. Primary CI artifacts expire on 2026-11-07 and must be renewed if unavailable. No applicable obligation remains unresolved in this scoped review; these dependencies and finite-test limits remain.

**Conclusion for institution.** The tested package and the unit's production, browser and evidence mechanisms support the scoped passing verdict. This report completes Verification and does not infer human integration authorization, full-product release readiness, future release applicability or completion of Archive.

## Candidate, sources and evidence identity

- Review date: 2026-10-08. Candidate branch: `plan/accept-packaged-browser`, [PR #24](https://github.com/at-rama/sqlite-vec-wasm/pull/24); base `9049129ace2473ca83a3ca4aa72bdcb092645fee`.
- Clean reviewed commit: `9f6a395fc22162e32de0c8cf045183ecadc0a459`; tree `e2176f4e642e2272caacf855cd40b9717b45b9ab`. No implementation or requirement edits were made during Verification.
- Confirmed OpenSpec root: `/tmp/sqlite-vec-wasm-explore/.42p`; Change directory returned by CLI: `.42p/openspec/changes/accept-packaged-browser`. Schema `spec-driven`; all four artifacts present; 21/21 tracked tasks complete with no unavailable tracking files.
- Allocation SHA-256: `3db3cd9cd944c765b8168a1ce4bcc15c9960e4bf52c44c7319d6f3b65250772b`; Distribution Capture SHA-256: `c54fd0987c4ab340d2d6f614d98057d6752d7afe0bd851411472589fe4994bef`. Both rehashed at the candidate.
- Historical S-spec fetched at full immutable revision `d463c4034604d6593cf45bbf5a523598dd3f53cc`; GitHub blob `a0b4d69996bb6accc13f97b0976de0ef47c0320c`. Its relevant passages were read directly, rather than relying on a live root specification. Other user source records were referenced through the Capture, not independently reacquired in this invocation.
- Renewed Acceptance run `37834480378`, attempt `1`, job `113508719929`: every job step succeeded. Actual synthetic checkout `f38aa6d921242d5a41244e4c92dc14704954921b` has candidate tree `e2176f4e642e2272caacf855cd40b9717b45b9ab`; `git diff --exit-code` between complete revisions succeeded. This establishes applicability to reviewed source content, not equality of commit identities for release consumption.
- Retrieved artifact: `acceptance-37834480378-1`, ID `11574509197`, 1,384,983 ZIP bytes; ZIP SHA-256 `4d406306a046603d93cbd81f763cb895e2c6f3a0bba4fe0ee7c9da875764029e`, matched GitHub's digest. Accessible through the run's Artifacts area; extracted directory `run-NH2rTr` contains `acceptance.json`, `browser.json`, `build.json`, `package.json`, `payload.tgz` and `logs/`.
- Accepted fixture identity: `sqlite-vec-wasm-acceptance-fixture@0.0.0-test`; payload 1,147,737 bytes, SHA-256 `9557ec11c7a966c09e045409e8e0bac91993d0d4e3866b675daaa1e1b5bec512`. Actual downloaded archive bytes and every runtime member matched size/digest records. No release identity is selected by this fixture.
- Primary bundle locally inspected at `/tmp/a-acceptance-verification-ci/run-NH2rTr`; local control logs at `/tmp/a-verify-check.log`, `/tmp/a-verify-tests.log`, `/tmp/a-verify-openspec.log`. These transient locations are not promised durable links. The retained CI bundle is the available primary product evidence; durable conclusions and locators are recorded here.

## Bidirectional coverage control

Read [proposal][proposal], [design][design], [delta requirements/scenarios][spec], [tasks][tasks] and [existing exhaustive coverage mapping][coverage] at the candidate, then compared their meanings against the current unit, not merely their identifiers. Allocation → Change is **100%** and Change → Allocation is **100%**. The mapping's prior planning-only conclusion remains historical; this invocation independently confirms its semantic mapping after Apply.

All 14 obligation rows in `coverage.md`, “Allocation unit to Change”, remain represented, including reproduction limits, final assets, independent connections, both vector types, Worker1/promiser, every OPFS VFS, prerequisites/no skip, recorded hosting, baseline omission detection, revision/payload applicability and producer/downstream composition. The reverse mapping grounds all twelve requirements and their 21 scenarios in this unit; all 21 tasks are realization/testing/documentation of those requirements. No task realizes monitoring, publication, registry bootstrap or the site. This is complete coverage of this unit, not all allocated responsibilities or independent proof of implementation.

## Official OpenSpec verification

Used the current generated `openspec-verify-change` skill, version `1.0`, generated by CLI `1.14.0`, without editing or installing skills. Following its steps, selected `accept-packaged-browser`, read `status --json` and `instructions apply --json`, and loaded every concrete context file. Reviewed identifiable changes against the base, searched the implementation and inspected its failure paths. All delta requirements are ADDED; no removed/renamed checks apply. No applicable check was skipped or marked Not verified.

| Dimension | Result |
| --- | --- |
| Completeness | Task Completion passed, 21/21; Spec Coverage passed, 12/12 ADDED requirements found |
| Correctness | Requirement Implementation Mapping passed, 12/12; Scenario Coverage passed, 21/21 through executable evidence and examined assertions/failure paths |
| Coherence | Design Adherence passed, D1–D6; Code Pattern Consistency passed within the identified implementation diff |

Implementation/scenario evidence by requirement, with line references measured at the candidate:

| Requirement | Implementation and suitable evidence |
| --- | --- |
| Clean production in CI | `tools/acceptance/run.mjs:40–120`; workflow; nine renewed stages; offline dirty/stale-state and producer-failure tests |
| Final packaged asset consumption | `tools/acceptance/check.mjs:26–43,56–66,101–107`; `tools/package/check.mjs:159–184`; independently hashed downloaded payload, all asset requests, pre/post inventory checks and companion negatives |
| Initialization and independent versions | `tools/build/browser-probe.mjs:7–40`; `tools/acceptance/check.mjs:34–43`; six main/Worker contexts; exact-version assertions on distinct connections; absence/incorrect values throw |
| FTS5 | `tools/acceptance/fixtures.mjs:23–30`; `check.mjs:76,83`; real IDs `1,3`, wrong-set negative |
| Deterministic Float32 | `fixtures.mjs:3–19`; `oracles.mjs:5–22`; real IDs/distances and wrong-expectation controls |
| Binary Hamming | `fixtures.mjs:2,8–10,19`; `oracles.mjs:6–22`; real distinct distances and exact negative controls |
| Worker1 and promise interface | `tools/package/check.mjs:44–90`; six lifecycle cases, returned versions and vector length; protocol/promise error propagation and missing Worker companion |
| Every default OPFS VFS restart | `check.mjs:67–74,86–100`; `persistence-worker.mjs:7–37`; `fixtures.mjs:14–21`; three write/reopen outcomes, no repairing read phase, missing-table negative |
| Browser prerequisites/conditions | `persistence-worker.mjs:7–24`; `contracts.mjs:26–32`; actual conditions in all three restarts and complete-matrix/prerequisite rejection tests |
| Packaged baseline preservation | `check.mjs:48–55`; `contracts.mjs:13–24`; same-pin live reference inventories, twelve loading contexts, offline omission/default-set and real companion negatives |
| Revision/payload applicable evidence | `run.mjs:61–75,98–111`; `contracts.mjs:34–45`; workflow PR/main/manual triggers, uploaded exact archive, downloaded applicability/substitution checks and consumer documentation |
| Complete outcomes | `run.mjs:46–59,109–120`; `check.mjs:15–23,108–114`; mandatory matrix, retained diagnostics, no success handoff on injected failures |

The scenario checks distinguish direct browser observations from simulation and semantic review: unavailable prerequisites and missing/wrong version conditions are handled by explicit fail-closed assertions; offline controls exercise incomplete/prerequisite report rejection, while the new hosted run exercises the satisfied prerequisites. No mutated upstream engine or deliberately disabled host storage is claimed. The product observations, assertion inspection and applicable negative tests together support the scenarios under the official workflow's verification heuristics.

D1 follows fresh tools/state and producer composition; D2 follows isolated final extraction/live reference; D3 follows independent SQL expectations; D4 follows distinct Workers/read-only reopen; D5 follows pinned hosted actions and exact artifact handoff; D6 follows complete failure-preserving reports. Plain JavaScript/native assertions, existing harness/server APIs, ignored outputs and unchanged dependencies follow the surrounding producer patterns. Scoped producer helper changes were read and their existing tests/browser checks still pass.

**Findings and dispositions:** 0 CRITICAL, 0 WARNING, 0 SUGGESTION findings in these checks. No established spec/design divergence or unresolved applicable obligation was identified within the examined diff and evidence. This is a scoped review result, not elimination of correlated harness or untested upstream defects. Official final assessment: all applicable checks passed; ready for Archive under the workflow. That advisory wording does not perform Archive or replace the other two controls.

## Repository checks and applicable tests

Executed on the clean candidate before report authoring:

| Command/control | Outcome and material conditions |
| --- | --- |
| `sh tools/check-repository.sh` at repository root | Passed; tracked-input/whitespace/ignore/source-lock checks; does not itself prove product acceptance |
| `sh tools/test-repository.sh` at repository root | 97 passed, 0 failed/skipped: 36 repository/gate, 25 input, 19 build, 9 package, 8 acceptance tests; Python, Node, native C compiler, npm/tar/unzip available; offline simulated orchestration distinguished from product execution |
| `openspec validate --all --strict` from `.42p`, CLI 1.14.0 with telemetry disabled | Four items passed, zero failed; structural validation is not the implementation verdict |
| Renewed hosted `bash tools/acceptance.sh --name sqlite-vec-wasm-acceptance-fixture --version 0.0.0-test` | Nine production stages and 22 browser cases passed; pinned harness installation/check/deps/smoke and fresh-source build/package included; documented Ubuntu 24.04 prerequisites installed, real Chrome used |
| Downloaded-artifact identity/consumer check | ZIP and actual archive/runtime digests matched; `assertApplicable` succeeded for the recorded synthetic commit and exact archive, and rejected substituted candidate revision and archive digest |

The current candidate's Repository run `37834480316` also passed `check` and `tests`. Its `verification` job `113507891698` failed specifically because this mandatory report did not yet exist; the fetched log identifies that missing path. Its Archive gate remains separate and unsatisfied while the Change is active. Neither merge gate is a missing product test or prerequisite for producing this report. Report metadata and repository integrity passed the report-quality checks before its commit; no implementation evidence is silently renewed for that later report-only commit.

## Report scope and next operation

Evidence links target immutable candidate documents or the inspected CI run; bundle labels use its verified artifact name and file/case locators rather than claiming nonexistent JSON deep links. Candidate source paths and reported line ranges were checked before committing. This invocation writes only this report. The checked candidate identity remains distinct from the report commit. Archive, synchronization, merge, tagging and publication have not been performed.

[run]: https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37834480378
[allocation]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md#L52-L71
[capture]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md
[source]: https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md
[production]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/tools/acceptance/run.mjs
[oracles]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/tools/acceptance/oracles.mjs
[browser-check]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/tools/acceptance/check.mjs
[workflow]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.github/workflows/acceptance.yml
[documentation]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/docs/acceptance.md
[tests]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/tools/acceptance/tests/acceptance.test.mjs
[proposal]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/openspec/changes/accept-packaged-browser/proposal.md
[design]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/openspec/changes/accept-packaged-browser/design.md
[spec]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/openspec/changes/accept-packaged-browser/specs/browser-acceptance/spec.md
[tasks]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/openspec/changes/accept-packaged-browser/tasks.md
[coverage]: https://github.com/at-rama/sqlite-vec-wasm/blob/9f6a395fc22162e32de0c8cf045183ecadc0a459/.42p/openspec/changes/accept-packaged-browser/coverage.md
