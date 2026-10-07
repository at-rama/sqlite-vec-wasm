# Lifecycle allocation correction — documentary verification

## Institutional view

**PASS for documentary conformity at `9b2a7284fd5e32802766cce75635b225cd93559c`, against main `3ec829e5d4d7dfa0238f48686dbb6f914b62e841`.** The complete tracked documentation inventory was examined for completeness, correctness and coherence within the authority, allocation, contributor-instruction and historical-record boundaries described below. Eight documentary files changed. Renewed local repository checks, all 72 registered tests, strict validation of the three synchronized OpenSpec specs, source-digest accounting and local-link checks passed. This conclusion concerns documentary conformity, not complete product realization or renewed browser qualification. The same agent made the correction and performed the semantic review.

This design review adapts [the repository-owned 42P verification composition](../.agents/skills/42p-verify-change/SKILL.md) and [Verification standard](../standards/verification.md), including their obligation-oriented institutional view and evidence limits. It is not post-Apply Verification of an allocation unit: no OpenSpec Change identity, unit-realization verdict or version-1 machine-gate declaration is fabricated. Design evolution is exempt under the current canon.

### Remove the empty implementation responsibility — passed

The user's 2026-10-07 instruction, headed “SOLUTION VALIDÉE” and “CONSIGNES”, authorizes removing `A-lifecycle` while retaining `C-obsolescence` as a terminal invariant; it rejects inventing retirement actions. In [the reviewed Allocation](https://github.com/at-rama/sqlite-vec-wasm/blob/9b2a7284fd5e32802766cce75635b225cd93559c/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), “Allocation units” now defines exactly eight units and no `A-lifecycle`. Semantic examination of the removed section confirms it carried an obsolescence criterion and a possible future determination, rather than a present transformation, artifact, gate or implementation process. No current responsibility is moved into A-watch or another unit.

### Preserve the terminal condition and future decision boundary — passed

[The authoritative SPEC](https://github.com/at-rama/sqlite-vec-wasm/blob/9b2a7284fd5e32802766cce75635b225cd93559c/SPEC.md), “Updates and publication”, and [the Capture](https://github.com/at-rama/sqlite-vec-wasm/blob/9b2a7284fd5e32802766cce75635b225cd93559c/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md), `C-obsolescence`, both remain byte-identical to main. Their condition is an upstream distribution that is published **and maintained**, equivalent across the browser, API, vector and persistence contract; a demonstration package is insufficient. The Allocation's `C-obsolescence` row retains that exact meaning, classifies it as non-allocatable and states that concrete retirement behavior needs a new design decision and allocation if the condition becomes plausibly satisfied. This interpretation boundary creates no present monitoring, npm deprecation, repository archival, release-stop or redirection obligation.

### Account for the complete design — passed within the documented source scope

Full semantic comparison of SPEC, Capture and Allocation found the current product obligations represented without a missing implementation owner or an unsupported extra responsibility. Source relationships retain SPEC's sole product authority. The [reviewed accounting](https://github.com/at-rama/sqlite-vec-wasm/blob/9b2a7284fd5e32802766cce75635b225cd93559c/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), “Coverage accounting”, classifies all **19 handles: 13 covered and six non-allocatable**. All eight units have explicit Capture grounding; covered unit/handle relations are reciprocal, including A-watch's stable-classification reuse. Every remaining unit's complete text is byte-identical to main. These observations establish responsibility accounting, not implementation correctness or upstream fidelity.

The comparisons use the current repository contract, the retained Capture provenance and this turn's explicit decision. Earlier source conversations identified by Capture were not independently reconstructed; fidelity to their unseen full contents is not newly established.

### Keep contributor documentation consistent with executable controls — passed after correction

The whole-corpus review identified two kinds of pre-existing documentation drift. The software standard and source-acquisition instructions omitted the Node 18+/native C prerequisites of the now-registered build tests. After A-package integration, test prerequisites were reconciled across the standards, README and contributor build/acquisition/packaging instructions to include npm for local packing/installation and Python archive inspection. The gates standard described only gate/acquisition tests, and the architecture described current CI as running only the lightweight check. Current documentation passages were corrected against [the test entry point](https://github.com/at-rama/sqlite-vec-wasm/blob/9b2a7284fd5e32802766cce75635b225cd93559c/tools/test-repository.sh) and [Repository workflow](https://github.com/at-rama/sqlite-vec-wasm/blob/9b2a7284fd5e32802766cce75635b225cd93559c/.github/workflows/repository.yml). Their meaning now matches the executable boundaries: offline gate/acquisition/build/packaging tests, distinct lightweight integrity checking, and no full hosted build/browser qualification. No executable command, dependency, workflow or product obligation changed.

### Institution and limits

The requested conceptual correction and the identified current-documentation drift are resolved. No unresolved documentary conformity finding remains in the examined scope. Historical qualification, Apply and Verification accounts retain their snapshot-specific counts, hashes, intermediate-stage wording and limitations. They are records of past candidates, not current allocation totals or new evidence for this review. The documentation verdict permits human review of this PR; it neither authorizes integration nor establishes full production, packaging, persistence, monitoring or publication acceptance.

## Detailed verification record

### Protocol and candidate identity

Review date: 2026-10-07. Review inputs were clean and committed at `9b2a7284fd5e32802766cce75635b225cd93559c` before this report was authored. Base: `3ec829e5d4d7dfa0238f48686dbb6f914b62e841`. The report's subsequent commit adds evidence only. During review, main advanced through A-package integration (PR #19). The branch was reconciled to that main, the new package documentation/spec/archive were examined, and prerequisite prose was updated for the now-registered packaging suite. The real remote candidate was fetched and checked out clean; repository checks, all 72 tests, strict OpenSpec validation, the documentary audit and both merge gates were executed on that exact candidate. Its Git tree is `40919cacf83e46d1825894f960bfc2ce6ee6d7c6`.

The protocol adapted three controls from 42P: complete upstream/derived responsibility accounting; documentary completeness, correctness and coherence using the generated verify skill's rubric; and executable repository checks with applicable tests. It did not invoke the official Change-verification workflow against a fabricated Change. AGENTS, all five referenced standards, OpenSpec context, the composition and generated verification skills were read. No generated skill was modified or installed.

### Whole-corpus inventory and examination

Git enumerated **95 tracked files, including 49 Markdown files and five YAML/YML files** at the checked candidate. Eight documentary files differ from main; the other 87 tracked files are unchanged, including all implementation, source pins, dependency records, workflow, packaging notice inputs, generated skills and historical evidence. Examination went beyond delta non-regression: current documentary claims were compared with authority and executable surfaces, exposing and correcting the test/CI drift above.

| Corpus | Examination and disposition |
| --- | --- |
| SPEC and Capture | Complete constraint/rationale comparison: runtime/purpose, nonmodification, stable sources/integrity, reproduction, canonical APIs/assets/static registration/storage, shared release identity, final-payload acceptance, watch/notification, human candidate/merge authority, failure stops, bootstrap exception and obsolescence retained. Source/provenance distinctions examined; recorded current source digests match. |
| Allocation | All eight units and all 19 accounting rows examined semantically and structurally; unit/handle reciprocity, composition, documentation ownership and non-allocatable treatments checked. Only lifecycle removal/classification/counts change. |
| README and contributor docs | Intended browser capabilities, publication-channel wording, runtime exclusions, source/build/package commands, handoff lifetimes, prerequisites and storage limitations checked against SPEC, standards and existing entry points. Test prerequisites reconciled across README and acquisition/build/packaging docs, including Node/native C for build and npm/Python for packaging; documented offline suites need no SDK installation or network. No release-version or completed-acceptance claim added. |
| Architecture and qualification | Current harness responsibilities and CI description examined; CI drift corrected. Qualification remains explicitly dated historical evidence, including unqualified hosted/bare-OS/browser paths and discarded fixtures. Its past “CI only runs repository checks” statement is situated at the qualification date rather than updated as a present claim. |
| AGENTS and five standards | Product authority, branch/PR rule, documentation discipline, current check/test scope, design exemption, one-unit Change coverage, report identities, institutional view and human integration boundary checked together. Test/CI descriptions corrected. No new governance stage or gate introduced. |
| Eight skill documents, target metadata and OpenSpec context | Repository-owned composition and generated verify procedures read; other unchanged generated workflows inspected at their applicable authority, lifecycle and dependency boundaries. Generic workflow wording is subordinate to the local canon. No workflow is invoked solely to remove an allocation criterion. |
| Three synchronized specs | All acquisition/build/package requirements and scenarios examined against their current allocation units and product contract. None depends on A-lifecycle or adds retirement behavior; unit text is unchanged. |
| Three archived Change bundles | Proposals, designs, coverage, tasks, delta specs, Apply evidence and Verification reports examined as snapshot-bound historical records. Source snapshots and intermediate pending-stage descriptions remain historical, read with later Verification and archive location. No past report is rewritten as present proof or retroactively required to adopt a newer report layout. |
| Packaged usage and notice inputs | Package README examined against the packaging spec and contributor layout/loading/storage descriptions; it describes shipped inputs, not registry availability. Notice associations remain unchanged controlled inputs, exercised by current offline fixtures. Historical third-party notice-source and legal-completeness judgments are not independently renewed. |
| Watch-design verification account | Its initial failure and later targeted PASS are tied to named older commits. Nine-unit/14-covered totals describe those candidates; they are not stale current Allocation instructions. Its past semantic/CI conclusions are not substituted for renewed evidence here. |
| Workflow, locks, code and LICENSE | Identity/diff checks confirm no changes. Test registration and workflow jobs were read to adjudicate documentary drift. Upstream runtime claims, external sources, historical raw evidence and license completeness are not independently requalified by this documentation review. |

All tracked Markdown/YAML files entered inventory, full-corpus link/reference searches and applicable role/dependency checks. Generated generic procedures and historical experimental results, including the A-package Verification account and its explicitly session-local primary links, were assessed for documentary authority/coherence, not re-executed as present behavior.

### Complete responsibility disposition

The detailed Allocation supplies the unit-to-handle mapping. This semantic examination additionally checked what each group demands and where it is accounted for:

| Material handles | Disposition examined |
| --- | --- |
| C-purpose, C-nonmodification | Official integrated browser distribution and publication represented by inputs/build/package/release; nonmodification/glue/patch and excluded runtime/API boundaries preserved in build/package/updates. |
| C-inputs, R-inputs | Official stable identity, recorded integrity before use, sufficient archives/no vendoring, toolchain/reproduction responsibilities retained across inputs/build/package/acceptance/updates. Same-release core/WASM/JS responsibility remains A-build; A-watch reuses stable classification only. |
| C-browser, C-static, C-storage | Complete retained baseline and asset loading, every-connection automatic registration, upstream persistence conditions and documentation are owned by build/package/acceptance as applicable. No transient fallback or main-thread OPFS promise introduced. |
| C-release, C-verification | Version/revision/tag/channel/payload identity, notices/digests/options and authoritative-revision acceptance remain allocated. Final packaged browser tests, known vector/Hamming results and each retained OPFS restart-persistence gate remain A-acceptance duties, not inferred from earlier build checks. |
| C-watch, C-autonomy, C-failure, C-bootstrap | Daily official newer-than-pins notification/deduplication and settings documentation remain A-watch; manual issue-independent candidates and human merge remain A-updates. Automatic post-merge publication/failure stops remain A-release with the bounded A-bootstrap exception. No retirement action inferred. |
| C-obsolescence | Non-allocatable terminal invariant; exact maintained-equivalence condition and demo exclusion retained. Future concrete retirement requires new design/allocation. |
| R-updates; S-spec, S-watch-model, S-release-model, S-doc-model | Six non-allocatables including C-obsolescence account for rationale/provenance/invariant roles without manufacturing implementation units. Source references do not supply independent corroboration. |

### Source identities and automated audit

Recomputed SHA-256 values:

- SPEC: `23c94ad50be9559a5846b083996d46bc12607a73473d5272726d0faae4c6acb1`.
- Capture: `20ea53df5d3cb59a9c0c2e327d7c01e9cb3ef8173f7d9f7ecdc147abc8c32df5`.
- Allocation: `4923f66daa6465b0d40977ef4ce67a07f664eece5725069b9e373e1724bfc011`.

Capture's SPEC and Allocation's Capture references match these identities. A disposable read-only Python audit enumerated the tracked inventory, validated **183 local Markdown destinations/heading anchors**, compared declared Capture handles with classifications, checked all covered unit/handle relations in both directions, and compared the eight retained unit bodies against main. No error was reported. Cross-corpus searches found no remaining current A-lifecycle reference or retirement obligation; older numeric totals remain in the snapshot-bound watch report.

### Renewed executable observations

| Command/control | Observed result |
| --- | --- |
| `sh tools/check-repository.sh` | Exit 0; repository integrity and source lock passed. |
| `sh tools/test-repository.sh` | Exit 0; 19 gate + 25 acquisition + 19 build-orchestration + 9 packaging tests, zero failures/skips. |
| From `.42p`, `OPENSPEC_TELEMETRY=0 openspec list --json` | Correct checkout `.42p` root; zero active Changes. Existing CLI used without installation. |
| From `.42p`, `OPENSPEC_TELEMETRY=0 openspec validate --all --strict` | Three synchronized specs passed; zero failures. |
| `python3 tools/change-gates.py verification --base <full-base-sha> --head <full-checked-sha>` | Exit 0, explicitly not applicable: no affected OpenSpec Change. |
| Same arguments to `tools/change-gates.py archive` | Exit 0, explicitly not applicable. |
| Git whitespace check and read-only documentary audit | Passed; source hashes, retained-unit byte identity, inventory and local links checked. |

The first local merge-gate attempt supplied literal `HEAD`, and the tool correctly rejected it because it requires full SHA arguments. Both gates were rerun successfully with the resolved 40-character candidate identity. That rejected invocation is not reported as a pass.

Available prerequisites included existing Git, shell, Python, Bash/archive tools, Node, npm and native C compiler. No SDK install, third-party dependency acquisition/change, source download, browser build, monitoring execution or publication was necessary for this prose-only delta. The renewed packaging fixtures perform local npm pack/install on authored synthetic runtime bytes; these are executable envelope checks, not newly built/browser-qualified product bytes. No historical runtime execution is claimed as renewed evidence.

The command outcomes above are this report's durable account of fresh local execution. Raw local outputs and the custom audit remain disposable outside tracked content; the linked test definitions/workflow show what can be reproduced, not a primary hosted execution result. Hosted CI status for the final PR must be read from that PR; no unobserved CI success is asserted here. The audit and semantic judgments share agent authorship with the edits; executable tests constrain concrete behavior but cannot prove universal semantic fidelity.

### Findings and disposition

F1: incomplete test prerequisites — corrected across software standard, README and contributor acquisition/build/package prose, checked against the current registered build/package suites.

F2: incomplete current test/CI descriptions in gates/architecture prose — corrected to include the registered packaging suite alongside the existing tests and checked against the entry point and workflow.

No unresolved documentary gap or required control blocker remains in this scoped review. Coverage accounting and successful offline checks establish neither full upstream equivalence nor release readiness. No merge, archive, tag or publication is performed by this verdict.
