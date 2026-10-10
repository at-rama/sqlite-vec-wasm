---
schema_version: 1
change: build-published-prereleases
allocation_unit: A-build
checked_commit: 5b8f038c75d18788bf3e39495cf6b042d8593273
verdict: failed
coverage:
  allocation_to_change: 100
  change_to_allocation: 100
openspec_verify: blocked
repository_checks: passed
applicable_tests: failed
---

# Verification: exact published prerelease construction

## Institutional view

**Situated conclusion.** Verification of `build-published-prereleases` for `A-build` on clean committed candidate `5b8f038c75d18788bf3e39495cf6b042d8593273` is **not satisfactory**. The contract correction and exact-identity fixture regressions are reviewable, and 120 renewed offline tests pass. However, the required real SQLite 3.53.4/sqlite-vec 0.1.10-alpha.4 build fails: the verified official amalgamation enables DiskANN by default and includes `sqlite-vec-diskann.c`, absent from its archive. No successful runtime handoff or prerelease browser proof exists. The [execution account](#executed-controls-and-blocker) below records renewed observations; raw logs/source bytes remain temporary and ignored, not durable Git evidence. No historical execution is reused to claim a pass. Implementation inspection, fixture additions and Verification share one agent.

**Command provenance.** [Current Allocation](https://github.com/at-rama/sqlite-vector-wasm/blob/8da7f089912033f8667c3e9028bd9e6e33a7f00c/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), section A-build, attributes D/C-purpose, D/C-nonmodification, D/C-inputs, D/R-inputs, D/C-browser, D/C-static, D/C-storage and W/C-provenance. Those passages in the [Distribution Capture](https://github.com/at-rama/sqlite-vector-wasm/blob/8da7f089912033f8667c3e9028bd9e6e33a7f00c/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) and [Release/Watch Capture](https://github.com/at-rama/sqlite-vector-wasm/blob/8da7f089912033f8667c3e9028bd9e6e33a7f00c/.42p/engineering/2026-10-09_sqlite-vec-wasm_release-watch_capture_edit-0.1.md) were compared to this Change in both directions. Their material-source sections reference instituted S-release-watch-design/S-local-reconciliation and immutable historical S-spec at `d463c4034604d6593cf45bbf5a523598dd3f53cc`. Original sources → Capture and Capture → Allocation were not audited. References and matching hashes do not independently establish upstream fidelity or human authorization.

**Exact verified pair, common SQLite release and integration limits — supported within observed acquisition/generation.** Renewed [build test definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/tools/build/tests/build.test.mjs), published alpha/beta/RC and six handoff-drift cases, preserve literal suffix/digest/lock identity and refuse mismatches before generation. Production acquisition retains 3.53.4/0.1.10-alpha.4 and exact digests, followed by successful same-release SQLite core/header generation checks. Separately recomputed archive hashes and byte comparisons establish that all 2,208 original SQLite files and both vec archive files remained unchanged after the failed build. [Execution details](#executed-controls-and-blocker) qualify these results: fixture success is not a compiled prerelease runtime. No parser, resolver, upstream patch, channel policy, source/tool pin or fallback was introduced.

**Pinned tools and clean reconstruction — tooling passes; runtime construction fails.** An isolated clean checkout with committed test-only pins and initially empty source/tool/npm state reconstructed the pinned SDK/WABT/Chrome, checked identities, installed locked dependencies and passed neutral browser smoke. This supports the available tooling path and prerequisite instructions, not successful canonical runtime construction. The subsequent production build failed on the missing upstream include. The [execution account](#executed-controls-and-blocker) contains commands and the observed error; the reproduction obligation remains unfulfilled for the selected qualification pair.

**Static registration, retained browser baseline and storage behavior — not established for this prerelease.** The [unchanged integration definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/tools/build/extra-init.c.in) and [raw-runtime check definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/tools/build/check.mjs) provide separate static glue and the established same-SQLite comparison. Offline C tests exercise registration-error propagation. But no prerelease WASM was produced, so independent C/OO1 connections, conventional/ESM/bundler loaders, Worker/Worker1/promiser, SQL/vec0/BigInt/FTS5, API inventories and applicable VFS behavior were not executed for this pair. Neutral harness smoke establishes none of these product properties. The seven retained baseline requirements were inspected, not requalified through a successful new runtime. Their obligations are not waived.

**Complete traceable runtime handoff — not established.** Fixture execution exercises exact suffixes, input digests/lock identity, recorded commands and atomic handoff/output hashes. Actual source/tool provenance is available for the failed attempt, but complete runtime inventory/digests and a successful packaging handoff do not exist. [Traceability test definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/tools/build/tests/build.test.mjs) cannot substitute for this missing runtime result. No product-acceptance or publication verdict is emitted.

**Failure, diagnostic retention and source/output exclusion — supported by the real failure and renewed fixtures.** The production command exits 1, stdout is empty, no build handoff is created, and its current workspace/log remain available. It does not change versions, refresh digests or return an earlier output. Renewed fixture failures cover acquisition/tools/generation/compilation/inventory and earlier-output exclusion. [Failure account](#executed-controls-and-blocker) and [fixture definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/tools/build/tests/build.test.mjs) distinguish these observations. Upstream inputs/generated state remain outside Git.

**Prerequisite and boundary documentation — examined, with an unresolved real-build limit.** [Build instructions](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/docs/build.md) retain system/harness commands, output lifetime, distinct Worker/secure-context/VFS-specific requirements, no transient storage fallback and failure handling. The acquisition page's stale blanket stable-only build statement is corrected. Documentation does not promise arbitrary pair compatibility. Successful build/browser behavior remains blocked here, and final-package acceptance/channel/publication remain separate unestablished responsibilities.

**Common dependencies and conclusion.** Authored fixtures inject transport/build results and share implementation assumptions. The actual attempt uses system tools, the pinned harness and verified official bytes; separate Python hashlib/archive comparisons check identities and original bytes rather than trusting handoff assertions alone. No raw-runtime comparison was possible; its planned reference would share configuration/helpers/browser probes and would not be an independent implementation. The correction is not ready for integration under this Verification. Keep the Change active, preserve the failed attempt and request disposition of the insufficient official qualification archive; no sync/archive, merge or distribution publication is authorized by this report.

## Detailed record

### Allocation ↔ Change

[Proposal snapshot](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/.42p/openspec/changes/build-published-prereleases/proposal.md), [bidirectional mapping and pre-Apply derivation disposition](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/.42p/openspec/changes/build-published-prereleases/coverage.md), [design](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/.42p/openspec/changes/build-published-prereleases/design.md), [delta](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/.42p/openspec/changes/build-published-prereleases/specs/browser-build/spec.md) and [tasks](https://github.com/at-rama/sqlite-vector-wasm/blob/5b8f038c75d18788bf3e39495cf6b042d8593273/.42p/openspec/changes/build-published-prereleases/tasks.md) were examined against the complete ten-requirement baseline and relevant Capture portions. Both directions remain 100%: the three modified requirements retain all original scenarios and clarify exact published prerelease applicability; the seven unchanged requirements remain binding. Build-tool reproduction, canonical baseline/static registration/storage/nonmodification and temporary traceable handoff are attributed here. Source selection, package assembly, final-package acceptance and release channels retain their boundaries. This is semantic correspondence, not realization evidence.

Main contains integrated #26 (`2553a7faaccd9183a984c4c068befd186b7e1e13`) and #29 (`8da7f089912033f8667c3e9028bd9e6e33a7f00c`). Allocation SHA-256 is `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`; exact Capture identities are in the proposal/Allocation. None was edited. Historical archives and reports remain intact.

### Official OpenSpec verify

The current generated openspec-verify-change workflow was executed using status/apply instructions from confirmed root `.42p`. All returned context files and their requirements/scenarios/design/tasks were read. Completeness, correctness and coherence were examined; this is the agent workflow, not a nonexistent verify CLI command.

- Completeness: 2/4 tasks complete. Tasks 2.1 and 2.2 remain incomplete: real successful construction and its raw-runtime browser comparison have no passing evidence. These are blocking incomplete-task findings.
- Correctness: all 3 modified requirements/13 scenarios map to existing `construct`, exact lock/version/digest comparisons, `generateBridge`, the separate static template, `runtimeInventory`, atomic handoff and browser-check definitions. New fixture success covers alpha/beta/RC identities; six drift cases reject lost/changed suffixes, digest value/algorithm and lock value/algorithm before generation. Existing failures and SDK refusal tests pass. Successful prerelease runtime registration and full runtime output scenarios are **Not verified**, because compilation stops first.
- Coherence: tests retain repository fixture conventions; no duplicate version policy, dependency, tool/pin migration, recipe/flag override or upstream source edit. Refusing to patch/disable DiskANN follows the declared boundary. Missing successful construction prevents design decisions 3/4 and tasks 2.1/2.2 from being certified complete. No suggestion is used to waive that missing proof.

OpenSpec verify is blocked, with no archive-readiness claim. The observed compiler failure is not silently classified as an optional downstream limit. Fixture passage proves exact-handling cases, not general prerelease compatibility. The static-registration qualifier remains in the synchronized current spec until this Change passes and sync is authorized by the workflow.

### Executed controls and blocker

On the clean candidate above, renewed commands exited 0:

```sh
sh tools/check-repository.sh
sh tools/test-repository.sh
```

Repository identities/content rules pass. All 120 offline tests pass: 43 gates/repository, 31 acquisition, 28 build (19 retained plus 9 new), 10 packaging and 8 acceptance-control; no skips/failures. These downstream suites are offline regression controls, not final-package or prerelease browser acceptance. Python/Bash/archive tools, Node/npm and native cc are available. From `.42p`, `OPENSPEC_TELEMETRY=0 openspec validate --all --strict` passes all 5 items. This structural result is not implementation conformity.

Apply executed the production resolver for official SQLite 3.53.4 and sqlite-vec 0.1.10-alpha.4. The test lock alone was committed in isolated detached checkout `/tmp/build-prerelease-check`, local commit `0dc934e69608041fed090cd5e4fb7819d35ea5e2` (not pushed); repository-authored implementation/tests match this candidate apart from subsequent task-status bookkeeping. No prior sources/tools/npm state was used. Resolution records were moved to a temporary evidence directory before construction. Commands:

```sh
export HARNESS_STATE=/tmp/build-empty-tool-state/tools
bash tools/harness.sh install
bash tools/harness.sh check
bash tools/harness.sh deps
bash tools/harness.sh smoke
bash tools/build.sh
```

Install/check/deps/smoke each exit 0. Identities: Emscripten 4.0.23, SDK Node 24.19.0/npm 11.17.0, WABT 1.0.42 and Chrome 153.0.8010.12, using retained archive/member integrity records. Neutral smoke: 1 test passes. This evidence was produced during Apply and reused for this Verification because the harness, build, source helper, test code and dependency/configuration inputs are unchanged; it is not evidence from a historical archive.

Production build exits 1. First blocking compiler diagnostic:

```text
sqlite-vec.c:3772:10: fatal error: 'sqlite-vec-diskann.c' file not found
```

The [official alpha.4 amalgamation archive](https://github.com/asg017/sqlite-vec/releases/download/v0.1.10-alpha.4/sqlite-vec-0.1.10-alpha.4-amalgamation.tar.gz) contains exactly `sqlite-vec.c` and `sqlite-vec.h`. In that recorded source, lines 25–27 default `SQLITE_VEC_ENABLE_DISKANN` to 1; lines 3771–3772 conditionally include the absent file. No build override disables it. Release metadata endpoint `https://api.github.com/repos/asg017/sqlite-vec/releases/324084102` advertises the same asset digest; its notes mention DiskANN fixes but supply no missing source member in this tarball. The browser-check command was not executed because no build handoff exists; no substitute runtime was tested.

Independent assertions recomputed SQLite SHA3-256 `b834d474b9b393d85a9e3ee4cc11f1329e007e9376a424ee740796f5c4bda3a8` and vec SHA-256 `49a122dc366181685528257d02a5e05117292c8e228b72de57718d8dade99b7c`. Test lock SHA-256 remains `4dd9ca5ff7e7bf1f92d6a7da9962290d56640cd40546bbd30eec35f18423228b`. Archive-versus-tree comparison found all 2,208 original SQLite files and both vec members byte-identical after construction failure. Source acquisition succeeded; that result does not demonstrate compilation sufficiency of the official amalgamation. Generated SQLite core/header passed the existing same-release check before the failed WASM step.

Failed build workspace `/tmp/build-prerelease-check/.work/build/run-nZKpN1` contains diagnostics and separate glue, without `handoff.json`. Build stdout is zero bytes. Logs remain under temporary `/tmp/build-prerelease-evidence/` and ignored `.work/build-prerelease-verification/`; this account, not raw evidence or a successful runtime, is retained in Git. All primary runtime/source bytes are temporary and may become unavailable.

Disposition: retain the exact failed pair and its diagnostics; do not fetch an unrecorded missing file, disable a default upstream feature, patch sources, select another pair automatically, change tools or waive browser proof. A revised qualification case or upstream/acquisition resolution needs explicit disposition before resuming this active Change. Until a successful required build and browser comparison are established, applicable tests are failed and aggregate Verification is failed. No synchronization or archive is performed.
