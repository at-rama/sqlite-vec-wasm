---
schema_version: 1
change: acquire-upstream-inputs
allocation_unit: A-inputs
checked_commit: 62eb9f6cfed47bf3c9e3840c86fba224ff2c5c35
verdict: passed
coverage:
  allocation_to_change: 100
  change_to_allocation: 100
openspec_verify: passed
repository_checks: passed
applicable_tests: passed
---

# Verification

Renewed on 2026-10-06 after corrective Apply, using the repository-owned `42p-verify-change` composition and the existing generated `openspec-verify-change` workflow. The clean committed candidate above includes main at `65728fb5879b966809d294e08d4c9493d979198e`. Normal OpenSpec commands ran from `.42p`; status and apply instructions identified this Change under `.42p/openspec/changes/acquire-upstream-inputs/`, schema `spec-driven`, with all artifacts present and 14/14 tasks complete. No skill installation or update occurred during Verification. This report supersedes the earlier verdict for `941ba035ade2ad685154bcc82a379d7adf5305d9`; that historical report did not assess the subsequently discovered CodeQL fixture alerts.

## Allocation unit ↔ Change coverage

The [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md) snapshot has SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`. The Capture and authoritative SPEC snapshots remain those recorded in [coverage.md](coverage.md#source-snapshot-and-boundaries); all three hashes were rechecked against the candidate.

The [bidirectional mapping](coverage.md#bidirectional-mapping-within-a-inputs) was reviewed semantically against the Allocation, delta requirements, scenarios and tasks. Allocation → Change is 100%: official stable inputs, exact recorded identities, integrity before use, sufficient official archives without vendoring, and reconstructible acquisition with a complete handoff are represented. Change → allocation is 100%: all seven requirements are justified by `A-inputs`; independent latest/exact selection, preserved official pins and existing dependencies are its confirmed realization choices. None introduces another allocation unit.

The same-SQLite-release integration invariant belongs to `A-build`; candidate adoption and publication belong to later allocations. Their absence is consistent with this unit's boundary, rather than missing acquisition coverage.

## Official OpenSpec verify

The generated workflow assessed completeness, correctness and coherence against [proposal.md](proposal.md), [design.md](design.md), [tasks.md](tasks.md) and [the delta spec](specs/upstream-inputs/spec.md). Existing [Apply evidence](apply-evidence.md#requirement-scenario-and-task-evidence) supplies the detailed scenario/task mapping; code and tests were reviewed again and executable checks were rerun on the checked candidate.

| Dimension | Result | Evidence |
| --- | --- | --- |
| Completeness | Passed: 14/14 tasks; 7/7 requirements | Completed tasks match implemented helpers, recorded lock, contributor instructions and registered checks/tests. |
| Correctness | Passed: 7/7 requirements; 20/20 scenarios | Implementation and failure-case tests below, plus real official resolution and fresh acquisition from the exact committed snapshot. |
| Coherence | Passed | Separate resolution/acquisition, source-only lock, official metadata, retained trust, fresh workspace/handoff and proportional validation match the design. Existing repository test registration and system prerequisites are preserved. The fixture-only correction follows the design without changing product requirements or dependencies. |

Implementation/test references below are relative to the repository root at `checked_commit`.

| Requirement | Implementation | Scenario evidence |
| --- | --- | --- |
| Official stable source selection | `tools/inputs.py:34–51`, `90–118`, `130–181`, `220–252` | `tools/tests/test_inputs.py:85–132`: omitted and independent exact versions, invalid/unstable/absent identities, malformed metadata and missing official digests. Real exact-version resolution reproduces the recorded pins. |
| Frozen source pair without automatic fallback | `tools/inputs.py:175–198`, `322–346` | Tests at `113–123`, `209–244`: latest failure does not choose an older release; acquire uses only frozen URLs and fails without a replacement or partial handoff. |
| Repository-recorded official source identities | `tools/inputs.py:54–87`, `184–198`, `349–365`; `inputs/sources.lock.json` | Tests at `34–61`, `154–165`, `246–249`, `292–316`: complete schema, duplicate-key rejection, atomic output and repository-recorded production lock. Official provenance and fresh digest evidence checked below. |
| Existing pin integrity is retained | `tools/inputs.py:121–172`, `322–365` | Tests at `136–152`, `209–218`, `304–316`: matching pins retained, official digest/archive drift rejected without baseline mutation, acquisition independent of moving checksum metadata. |
| Verification precedes source use | `tools/inputs.py:255–260`, `322–346` | Tests at `228–244`: altered/truncated bytes fail before archive inspection/extraction; matching official archives pass. |
| Official sufficient archives without vendoring | `tools/inputs.py:263–320`; `tools/inputs.sh:1–27` | Tests at `251–290`: missing required content, extraction failures, traversal/links and vendored SQLite rejected. Real archives provide the full SQLite tree and sqlite-vec C/header. Git contains no acquired sources. |
| Fresh acquisition and complete handoff | `tools/inputs.py:322–346` | Tests at `209–244`: distinct fresh workspaces, no earlier-tree reuse, failed second source cleans only its invocation, successful pair reports paths and consumed-lock identity. Exact clean-clone reconstruction passes below. |

**Findings and dispositions:** no unresolved CRITICAL issues, WARNING issues or SUGGESTION findings. All six official checks ran: Task Completion, Spec Coverage, Requirement Implementation Mapping, Scenario Coverage, Design Adherence and Code Pattern Consistency. No applicable check is marked Not verified.

The three high-severity CodeQL findings from check `112184556619` are resolved by the previously committed corrective Apply. `tools/tests/test_inputs.py:192–197` selects archives by exact fixture-lock URL and rejects unknown keys before writing bytes; `220–226` tests misleading domain substrings and an altered URL; `235–244` retains the HTTP-failure and second-source-corruption scenarios with exact URL conditions. These changes implement tasks 4.1–4.2 and strengthen evidence for tasks 2.1–2.3. Comparison with the earlier snapshot confirms production helpers, pins, proposal, design and delta requirements are unchanged. The complete registered suite was rerun; no corrective implementation was performed during this Verification.

## Repository checks and applicable tests

Commands ran on the candidate with existing Bash, system Python 3/standard library, curl, tar and unzip. OpenSpec CLI 1.14.0 was available outside the repository; telemetry was disabled for CLI calls. No SDK, npm installation, browser state or source cache was required by acquisition.

| Command/check | Outcome |
| --- | --- |
| `sh tools/check-repository.sh` | Passed in the working checkout and a fresh clone of the exact candidate. |
| `sh tools/test-repository.sh` | Passed in both checkouts: 19 gate tests and 25 source-acquisition tests, 44 total per run. |
| `bash -n tools/inputs.sh` | Passed. |
| [CodeQL check 112198382229](https://github.com/at-rama/sqlite-vec-wasm/runs/112198382229) on `checked_commit` | Completed with `success`: “No new alerts in code changed by this pull request”; zero annotations. Python, actions and JavaScript/TypeScript analysis jobs all passed. No suppression or exclusion was introduced. |
| From `.42p`: `OPENSPEC_TELEMETRY=0 /tmp/sqlite-vec-wasm-openspec-cli/node_modules/.bin/openspec validate acquire-upstream-inputs --strict` | Passed. |
| Fresh clone, detached at `checked_commit`, initially clean with no `.work/`; `PATH=/usr/bin:/bin` | Passed: only existing system tools were used. |
| `bash tools/inputs.sh resolve --sqlite-version 3.53.4 --sqlite-vec-version v0.1.9 --output .work/verified.lock.json` in that clone | Passed against official metadata; emitted lock bytes equal the repository-recorded lock. Latest-default and override combinations are separately covered by offline tests. |
| `bash tools/inputs.sh acquire --lock inputs/sources.lock.json` in that clone | Passed: fresh downloads, verification before extraction, required source contents and complete pair handoff. Independently recomputed archive digests match below. |
| Clean Git status after acquisition | Passed: acquired/generated state stays ignored; no tracked or untracked repository changes. |

The consumed lock SHA-256 is `4dfa30a7af5cee2e09d7021a48f904de8f3d295367ccc80db95f9c448ebec1c8`. SQLite 3.53.4 archive SHA3-256 is `b834d474b9b393d85a9e3ee4cc11f1329e007e9376a424ee740796f5c4bda3a8`; sqlite-vec 0.1.9 archive SHA-256 is `3acd67cb4aff080c7050926fd3cf8227905fe5b7ee3829d8ee5024ab1283cf61`. Official endpoints are retained in [the source lock](../../../../inputs/sources.lock.json); these values were checked against downloaded bytes, not promoted from those bytes into new authority.

Raw resolution evidence and acquired sources remain outside the working checkout in the disposable verification clone's ignored `.work/`; necessary outcomes and identities are recorded here. The current candidate’s `check` and `tests` CI jobs also passed. The report-metadata `verification` job is not substituted for the agent workflow above, and the active-Change `archive` failure is an expected lifecycle condition. There are no unresolved prerequisites, skipped mandatory tests, gaps or blockers.

## Scoped verdict and next stage

**Passed for `A-inputs` and `acquire-upstream-inputs`.** Both coverage directions are 100%; official OpenSpec verify and all required repository checks/tests pass for the same committed candidate. This report adds evidence only and does not change the reviewed implementation or requirements.

The next stage is archive under normal OpenSpec behavior, including its native synchronization handling, under separate authorization. Verification does not establish build compatibility, browser acceptance, full-product acceptance or release readiness. No synchronization, archive, merge or release publication was performed during this invocation.
