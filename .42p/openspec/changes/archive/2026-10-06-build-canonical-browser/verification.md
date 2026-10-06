---
schema_version: 1
change: build-canonical-browser
allocation_unit: A-build
checked_commit: 02bf592f970ff6520f53e118ae1c8bc6ab071177
verdict: passed
coverage:
  allocation_to_change: 100
  change_to_allocation: 100
openspec_verify: passed
repository_checks: passed
applicable_tests: passed
---

# A-build Verification

42P Verification performed on 2026-10-06 through the repository-owned `42p-verify-change` composition skill and the intact generated `openspec-verify-change` skill, version 1.14.0. The reviewed candidate was clean and committed before this report. Only this report is added during Verification; implementation, requirements, task tracking and upstream authority are unchanged.

## Allocation-unit coverage

The selected local OpenSpec root was confirmed by `openspec list --json` as this checkout's `.42p`; status resolved this Change's directory and `spec-driven` schema. All returned proposal, delta-spec, design and task artifacts were read, alongside [coverage](coverage.md), [Apply evidence](apply-evidence.md), the Allocation and `SPEC.md`.

Allocation snapshot: `.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md`, SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, unit `A-build`. The recorded Capture and Specification hashes were independently recomputed and remain unchanged: `1fa058a1d65708d69495b59d8e04b42a38a2cccc3093f114db538edb52621b67` and `40d0cf9e9de1a70c95f6648cdbfa57ecd7c067c2c334344347ad6fc20f404eb4` respectively.

The semantic mapping in coverage remains valid in both directions. A-build's verified-input consumption, common-release generation, supported static registration, complete default browser/API/SQL/VFS baseline, storage conditions, reproducible tool/options records and documentation, nonmodification and runtime boundaries are all represented. The ten delta requirements introduce no unallocated product behavior. Fresh execution, failure isolation and the hashed handoff specialize construction and its output surface. Their 28 scenarios and 18 tasks account for the necessary observable behavior and evidence. Packaging, final-package acceptance, update and release responsibilities remain with their allocated units.

**Allocation → Change: 100%. Change → Allocation: 100%.** No authority contradiction, missing obligation or unauthorized semantic revision was found.

## Official OpenSpec verify findings

The generated workflow's completeness, correctness and coherence checks were executed; `instructions apply` was used only to obtain context and tracking, not as a verification verdict.

| Dimension | Result |
| --- | --- |
| Completeness | 18/18 tasks supported by implementation/evidence; all ten ADDED requirements implemented. No removed or renamed requirements. |
| Correctness | Ten requirement mappings and all 28 scenarios reviewed, including applicable failure behavior. No divergence or uncovered obligation. |
| Coherence | All six design decisions followed; Bash/SDK JavaScript orchestration, separate C input, existing harness helpers and offline Node tests fit repository patterns. |

The [Apply mapping](apply-evidence.md#requirement-scenario-and-task-mapping) supplies the full scenario/task trace. Implementation locations were independently reviewed:

| Requirement | Implementation and suitable evidence |
| --- | --- |
| Fresh verified build inputs | `tools/build/build.mjs:97-128`: new workspace, existing A-inputs acquisition, exact lock/pair validation, no prior-handoff input. Offline acquisition/error/old-success fixtures and distinct actual acquisitions support all three scenarios. |
| Common SQLite release identity | `tools/build/build.mjs:68-87,129-135`: required recipe components, same-tree Configure/amalgamation/browser generation and core/header version checks. Missing files fail through reads; incompatible recipes/header identity have negative tests. Real generated release identity matches the lock. |
| Static registration on every connection | `tools/build/extra-init.c.in:1-8`, `tools/build/build.mjs:127-134`, `tools/build/browser-probe.mjs:5-26`, `tools/build/check.mjs:66-107`: separate static translation unit and automatic availability on independent C/OO1, Worker and Worker1/promiser connections. The compiled bridge failure fixture propagates an injected nonzero registration result. Pinned SQLite's `SQLITE_EXTRA_INIT_MUTEXED` stores that result in initialization status; its automatic-extension loader propagates entry-point errors to connection opening. Neither failure is suppressed by project glue. |
| Canonical browser baseline is retained | `tools/build/config.mjs:1-11`, `tools/build/check.mjs:11-22,43-129`, `tools/build/browser-probe.mjs:7-15,53-57`: unchanged canonical options, three loading variants, independent connections, SQL probes and same-release baseline subset comparisons. Fresh browser results detect no omissions. |
| Upstream storage conditions are preserved | `tools/build/browser-probe.mjs:27-51`: VFS inventories, main-thread kvvfs, actual Worker reads/writes through both proxy-based OPFS VFSes and explicitly installed SAH pool; unavailable main-thread OPFS requests fail. Pinned upstream condition/error paths remain unchanged. |
| Recorded reproducible construction | `tools/build/config.mjs:1-11`, `tools/build/build.mjs:12-16,109-143`, unchanged harness and dependency lock: executed options and actual checked tools are recorded. Suitable isolated empty-state reconstruction evidence is reused after establishing its code/input applicability below. Wrapper missing/wrong-SDK and command-failure tests pass. |
| Integration and runtime boundaries | `tools/build/build.mjs:19-32,52-78`, C template and Git diff: only separate build/init glue; exact browser inventory, no upstream patch or excluded distribution. Original archive members still match. Unsupported recipe/runtime fixtures fail without repair or fallback. |
| Traceable runtime handoff | `tools/build/build.mjs:52-65,90-94,136-149`: actual regular/nonempty runtime hashes, consumed inputs, checked tools/options and log, atomic success file. Actual handoff/bytes are revalidated; incomplete inventory and write failures are tested. No acceptance/publication field is introduced. |
| Failure does not reuse previous output | `tools/build/build.mjs:35-48,97-106,148-164`: subprocess failures reject, diagnostics survive, successful state is retained, no old-result selection. Offline generation/compilation/inventory/write failures cover the declared boundary, including an earlier success. |
| Reproduction and browser prerequisites are documented | `docs/build.md:1-70`, README development link and existing harness architecture: system prerequisites, exact setup/build/check commands, lifetime, Worker/secure-context and distinct VFS/isolation/concurrency conditions. Documentation agrees with the pinned VFS/common/proxy sources and executed fixture. |

CRITICAL findings: none. WARNING findings: none. SUGGESTION findings: none. No applicable check is skipped or marked Not verified. The official workflow assessment is that all checks passed; its archive-readiness wording is subordinate to the composite 42P verdict and subsequent lifecycle authorization.

## Repository checks and applicable tests

The following commands were executed against the checked candidate during this Verification:

```sh
sh tools/check-repository.sh
sh tools/test-repository.sh
# Working directory: .42p
OPENSPEC_TELEMETRY=0 openspec validate --all --strict
# Working directory: repository root
HARNESS_STATE=/tmp/sqlite-vec-wasm-a-build-clean-tools bash tools/harness.sh check
HARNESS_STATE=/tmp/sqlite-vec-wasm-a-build-clean-tools bash tools/harness.sh exec node tools/build/check.mjs /tmp/sqlite-vec-wasm-a-build-clean-handoff.json
```

Repository check: PASS. Registered offline tests: 44 Python plus 19 Node tests pass, zero failures/skips. Strict OpenSpec validation: two items passed (`change/build-canonical-browser` and `spec/upstream-inputs`), zero failures. The installed official CLI is 1.14.0. Required Git/shell/Python, system Node and native C compiler are available; no mandatory test was skipped for a missing prerequisite.

The existing harness identity check passes for Emscripten 4.0.23, Node 24.19.0/npm 11.17.0, WABT 1.0.42 and Chrome 153.0.8010.12. Browser execution uses locked playwright-core 1.63.0, Linux x86-64 and secure loopback with COOP `same-origin` and COEP `require-corp`. The recorded native GCC 13.3.0, GNU Make 4.3 and SDK Binaryen version 125 are the construction environment, not an immutable OS or a claim about every host/browser.

The fresh browser command returns zero and writes `.work/build-check/run-B541bU/checks.json`. Its independently acquired and compiled unmodified reference is in `.work/inputs/acquire-7tqlxm6l`, with the same lock/options and no static bridge. All six conventional/ESM/bundler main-thread/Worker contexts and all Worker1/promiser cycles pass. BigInt, FTS5, pinned SQLite/sqlite-vec versions and deterministic vec0 identifiers/distances pass. Context-specific VFS initialization/read-write and unsupported main-thread persistence requests pass. Missing WASM/Worker1/proxy and corrupt WASM negative cases pass. All seven compared inventory categories have zero baseline omissions in every context; no binary-equality requirement is imposed.

### Applicability of reused construction evidence

The isolated tool/dependency installation and successful producer reconstruction in [Apply evidence](apply-evidence.md#executed-reconstruction) are reused rather than represented as newly executed. Their eight recorded source-byte hashes match both the checked commit and the retained execution checkout exactly. A-inputs implementation, source lock, harness/browser/server helpers also match that checkout. Thus local execution commit metadata differences do not conceal an implementation or option change. The final offline negative tests are executed anew on this candidate.

The retained success stdout parses identically to its atomic `handoff.json`. All eleven runtime sizes/SHA-256 are recomputed and match; the consumed source-lock digest matches the current tracked lock. Both source archive digests are revalidated. Byte comparison of 2,208 original SQLite archive files and both sqlite-vec files again finds no modified member. Repository review and the tracked-ignore check find no tracked acquired sources, SDK/dependencies or generated runtime artifacts. The producer output is then tested anew by the fresh browser command above. Temporary logs/reports remain ignored or outside the checkout; their essential outcomes are recorded here and in Apply evidence.

## Scoped verdict and next stage

**PASS for A-build / build-canonical-browser at the checked commit.** Both coverage directions are 100%; official OpenSpec verify, repository checks and applicable tests pass. There are no unresolved conformity gaps or blockers. This report makes no claim about final-package A-acceptance, full vector/Hamming fixtures, restart-persistence, packaging, release readiness or hosted production CI.

Native OpenSpec archive is the next lifecycle operation and requires its own invocation. This Verification performs no Apply, synchronization, archive, merge or publication. The report commit adds no unverified implementation or requirement change.
