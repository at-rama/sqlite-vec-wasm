---
schema_version: 1
change: inputs-published-prereleases
allocation_unit: A-inputs
checked_commit: 277dbd23c09ce0976bd67badb3c3a104f81ae51d
verdict: passed
coverage:
  allocation_to_change: 100
  change_to_allocation: 100
openspec_verify: passed
repository_checks: passed
applicable_tests: passed
---

# Verification: published prerelease acquisition

## Institutional view

**Situated conclusion.** `inputs-published-prereleases`, realizing `A-inputs`, passes the three Verification controls on clean committed candidate `277dbd23c09ce0976bd67badb3c3a104f81ae51d`. Renewed offline execution and fresh official-archive acquisition support this scoped correction; they do not establish browser-build compatibility or product prerelease support. The [execution account below](#executed-controls) records observations; raw results remain ignored and are not durable Git evidence. Fixture authorship, implementation, semantic examination and this report share one agent.

**Command provenance.** The [Allocation snapshot](https://github.com/at-rama/sqlite-vector-wasm/blob/2553a7faaccd9183a984c4c068befd186b7e1e13/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), section `A-inputs`, attributes Distribution `C-purpose`, `C-inputs`, `R-inputs` and Release/Watch `C-provenance`. Those portions of the [Distribution Capture](https://github.com/at-rama/sqlite-vector-wasm/blob/2553a7faaccd9183a984c4c068befd186b7e1e13/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) and [Release/Watch Capture](https://github.com/at-rama/sqlite-vector-wasm/blob/2553a7faaccd9183a984c4c068befd186b7e1e13/.42p/engineering/2026-10-09_sqlite-vec-wasm_release-watch_capture_edit-0.1.md) were examined against the Change in both directions. They reference instituted S-release-watch-design/S-local-reconciliation and the immutable [historical SPEC](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md), section Inputs and reproduction. Original sources → Capture was not audited; those provenance references are not independent corroboration. Hashes identify bytes, not semantic fidelity.

**Official released inputs and exact identity — passed in the examined cases.** Published sqlite-vec alpha/beta/RC overrides retain exact suffixes while omitted helper inputs retain independent stable defaults. Renewal of the [selection test definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/tools/tests/test_inputs.py), `ResolutionTests`, exercised draft/unpublished/development, contradictory/ambiguous metadata and insufficient official assets/digests as refusals. The [execution account](#executed-controls) also records official `v0.1.10-alpha.4` resolution and acquisition. SQLite development snapshots remain inadmissible; no hypothetical numbered SQLite prerelease archive format is claimed. Channel policy remains with A-release, and future dispatch must supply exact versions; these boundaries are supported by examination of [the Change design](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/.42p/openspec/changes/inputs-published-prereleases/design.md), not by execution of unimplemented release/dispatch workflows.

**Recorded pins, integrity before use and frozen pair — passed in the examined cases.** Renewed [PinTests, AcquisitionTests and CommandTests definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/tools/tests/test_inputs.py) exercise retained prerelease digests, metadata drift, staged-lock enforcement, corruption before extraction, no checksum refresh and no substitution. [Executed controls](#executed-controls) independently recomputed the real archive and lock hashes and observed exact handoff identities. The unchanged acquisition path in [implementation definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/tools/inputs.py), `preserve_pin`, `recorded_lock`, `acquire_lock`, supports the broader sequencing claim by inspection. Existing repository pins were not changed; neither examples nor fresh digests replace their expected values.

**Sufficient archives, clean acquisition and no source vendoring — passed within A-inputs.** Real official full SQLite sources and sqlite-vec C/header sources were acquired without SDK/npm installation; repeated invocations produced distinct workspaces. A committed test-only pin overlay was also exercised from a clean checkout with empty source/tool/npm state. Renewed [AcquisitionTests definitions](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/tools/tests/test_inputs.py) cover insufficient contents, unsafe archives, extraction/transport failures and cleanup without a pair handoff. The [execution account](#executed-controls) distinguishes these observations from finite fixture tests; source trees stayed ignored. This covers acquisition, not the complete production/browser path assigned to A-acceptance.

**Common dependencies and remaining limits.** Fixtures use repository helper functions and authored transport mocks, so common modeling errors remain possible. Real observations use the production CLI/system curl, tar and unzip and official upstream bytes, but still share its validation/extraction implementation; separate Python hashlib assertions check downloaded archive bytes rather than trusting handoff digests alone. Network metadata is mutable. SQLite 3.53.4 uses its retained official baseline digest after confirming the release identity, not a newly asserted checksum. The synchronized browser-build contract and its implementation remain stable-only and require a separate A-build correction. No browser/product prerelease acceptance, channel calculation, distribution, merge or publication was executed or established.

**Conclusion for institution.** The examined A-inputs correction and all required controls are satisfactory within these evidence boundaries. It is reviewable for human integration; Verification itself supplies neither integration nor publication authority.

## Detailed record

### Coverage and identities

The [proposal snapshot](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/.42p/openspec/changes/inputs-published-prereleases/proposal.md), [pre-Apply derivation and exhaustive mapping](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/.42p/openspec/changes/inputs-published-prereleases/coverage.md), [delta](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/.42p/openspec/changes/inputs-published-prereleases/specs/upstream-inputs/spec.md) and [four completed tasks](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/.42p/openspec/changes/inputs-published-prereleases/tasks.md) were read, together with the retained seven-requirement capability baseline. Semantic examination confirms 100% Allocation → Change and Change → Allocation: official admissibility/identity; pins/digests and retained integrity; verification before source use; sufficient archives/no vendoring; frozen pair/no fallback; fresh acquisition/complete handoff. Release channels, build-tool reproduction and full-path acceptance retain their allocated boundaries. The earlier `42p-verify-derivation` result concerned Allocation → Change only, without original-source audit. Post-Apply examination found no changed source obligation or unresolved correspondence in this segment.

Allocation SHA-256: `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`. Capture identities and exact snapshot commit are retained in the proposal/Allocation; unchanged identity does not prove derivation fidelity. Main contains the integrated #26 at `2553a7faaccd9183a984c4c068befd186b7e1e13`.

### Official OpenSpec verify

The current generated `openspec-verify-change` workflow was executed using status and apply instructions from the confirmed `.42p` root; all returned proposal/spec/design/task context files were read. It is an agent workflow, not a nonexistent CLI verify command.

- Completeness: 4/4 tasks complete; 3 modified requirements and their 15 scenarios examined; the selection rename is evaluated through its modified target. The four unchanged requirements remain realized by inspected acquisition code and renewed regression execution.
- Correctness: selection maps to `version`, `published_vec`, `stable_vec`, `select_vec`; pin requirements to `validate_lock`, `preserve_pin`, `resolve_pair`, `recorded_lock`; handoff to `acquire_lock`. All affected scenario conditions have implementation and exercised evidence.
- Coherence: schema 1, optional-v normalization, independent stable defaults and existing CLI/acquisition structure are retained. No dependency, channel, build change, pin refresh or vendoring was introduced. Design decisions match the implementation and documented remaining boundaries. The planned Purpose reconciliation at sync changes its obsolete stable qualifier; no new behavior is introduced by that editorial alignment.

Scenario execution correspondence: both/one/no overrides and alpha/beta/RC → `test_latest_and_independent_overrides`, `test_explicit_published_prereleases_and_stable_default`; invalid/publication/contradiction/ambiguity/no fallback → `test_prerelease_failures_never_substitute_a_stable_release`, `test_sqlite_snapshot_is_not_a_released_source`, existing malformed/latest/origin tests; pins/missing digest/incomplete lock → LockTests, PinTests, existing resolution tests; fresh/earlier trees/second failure/handoff/exact suffix → AcquisitionTests including `test_prerelease_acquisition_preserves_pair_digest_and_failures`, plus real CLI execution below. These are [definition locators](https://github.com/at-rama/sqlite-vector-wasm/blob/277dbd23c09ce0976bd67badb3c3a104f81ae51d/tools/tests/test_inputs.py); successful execution is recorded separately below.

No critical, warning or suggestion finding in the checks performed; no applicable check marked Not verified. SQLite format evolution remains the existing explicit-reconsideration boundary, not waived behavior. A-build's current stable-only restriction is an identified downstream correction, not an A-inputs pass for complete product support.

### Executed controls

On the clean candidate above, repository checks and all registered offline suites were renewed:

```sh
sh tools/check-repository.sh
sh tools/test-repository.sh
```

Both exited 0. Repository canon/Capture/Allocation byte identities and content rules passed. Tests: 43 gates/repository, 31 acquisition, 19 build orchestration, 10 packaging, 8 acceptance-control = 111 passed, no failures/skips. These include offline controls of unchanged downstream code; they are not actual browser acceptance. Python, Bash, Git, curl, tar/unzip, Node, npm and the native compiler were available. From `.42p`, `OPENSPEC_TELEMETRY=0 openspec validate --all --strict` passed 5 items (four specs and this Change).

Supplementary official execution, using a detached checkout of the Apply implementation whose input implementation/shell/tests bytes were compared equal to this candidate:

```sh
mkdir -p .work/inputs
bash tools/inputs.sh resolve --sqlite-version 3.53.4 --sqlite-vec-version v0.1.10-alpha.4 --output .work/inputs/candidate.lock.json
cp .work/inputs/candidate.lock.json inputs/sources.lock.json
git add inputs/sources.lock.json
bash tools/inputs.sh acquire --lock inputs/sources.lock.json
```

Resolution and two acquisitions exited 0 and produced distinct workspaces. The pair stayed SQLite `3.53.4`, sqlite-vec `0.1.10-alpha.4`. Official vec metadata endpoint was `https://api.github.com/repos/asg017/sqlite-vec/releases/324084102`; its asset digest was SHA-256 `49a122dc366181685528257d02a5e05117292c8e228b72de57718d8dade99b7c`. SQLite SHA3-256 remained `b834d474b9b393d85a9e3ee4cc11f1329e007e9376a424ee740796f5c4bda3a8`. Exact test lock SHA-256 was `4dd9ca5ff7e7bf1f92d6a7da9962290d56640cd40546bbd30eec35f18423228b`. Independent hashlib assertions matched both archive digests, lock identity and required source content; each generated handoff retained the suffix.

For the empty-state clean-checkout scenario, only the test pins were committed in detached local test commit `483e1ad74712041701129ab4addf63af33b2fc1c` (not pushed). Earlier `.work` was moved aside, leaving no source output, and a third acquisition ran with empty task-specific XDG/cache and npm directories. It exited 0; assertions confirmed a clean Git checkout, empty tooling/npm state, exact suffix, matching real archive digests, SQLite `ext/wasm/GNUmakefile` and sqlite-vec C/header contents. No SDK, Node/npm bootstrap or build was run. This test-only overlay is not an adoption of prerelease pins in the PR.

Raw local logs/handoffs reside in ignored `.work/inputs-verification/`; upstream metadata/archive bytes and initial outputs remain in temporary acquisition workspaces outside the PR. They are currently inspectable locally, but only this execution account is retained in Git; it is not a link to persistent primary runtime bytes. No historical Verification or archive was rewritten or reused as fresh execution evidence.
