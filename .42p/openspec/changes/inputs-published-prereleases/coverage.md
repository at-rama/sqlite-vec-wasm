# Allocation ↔ Change coverage

## Identity and scope

Source: `A-inputs` at `2553a7faaccd9183a984c4c068befd186b7e1e13`, Allocation SHA-256 `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`, with the three exact Capture inputs listed there. Target: `inputs-published-prereleases`, proposal, design, tasks and `upstream-inputs` delta, composed with the current seven-requirement synchronized baseline. This correction retains unchanged requirements rather than reproducing them in a delta. Original sources → Capture is not examined; build and implementation verification are separate.

## Bidirectional correspondence

| Attributed source portion | Realization requirement and scenarios | Tasks |
| --- | --- | --- |
| D/C-purpose selected official upstreams; D/C-inputs released-input admissibility/origins | Official published source selection (renamed from Official stable source selection): independent defaults/overrides, alpha/beta/RC, publication, contradictory metadata, development exclusion, no fallback | 1.1, 1.2, 3.1 |
| D/C-inputs exact repository pins/digests; W/C-provenance exact input identity/origins/digests including suffixes | Repository-recorded official source identities: new stable/prerelease pins, missing digests, incomplete lock; Fresh acquisition and complete handoff: exact lock and prerelease handoff | 1.1, 2.1, 3.1 |
| D/C-inputs retained integrity and mismatch stop | Existing pin integrity is retained: metadata drift/refusal and acquisition without refresh; Verification precedes source use: matching and changed/incomplete archives | 2.1, 3.1 |
| D/C-inputs acquisition preference/exceptions/no source trees; D/R-inputs full SQLite source and sqlite-vec amalgamation | Official sufficient archives without vendoring: sufficient official archives, unavailable content and repository boundary | 2.1, 3.1 |
| D/C-inputs fresh clean acquisition portion; D/C-failure no substitution/automatic repair within this unit | Frozen source pair without automatic fallback; Fresh acquisition and complete handoff: clean checkout, earlier trees, second-input failure, exact successful pair | 2.1, 3.1 |

Reverse examination: each of the seven effective capability requirements has the source grounding above. Latest-stable helper defaults are a retained baseline realization choice, not a new future-dispatch rule. Version parsing, consistent release metadata and exact official asset/digest checks implement admissibility/identity; they add no distribution channel policy. Archive extraction and handoff refinements remain within source acquisition. All proposal/design/task obligations implement these requirements or required repository checks, without introducing another allocation unit.

The channel calculation from D/C-inputs is attributed to A-release and consumed as a boundary; this helper does not implement it. Toolchain/build reproduction belongs to A-build; clean full-path/browser proof to A-acceptance. Source provenance supplied here does not implement complete release provenance or product publication. The official SQLite path still requires a published release and sufficient full-source/digest metadata; development snapshots are not promoted into released inputs and no hypothetical prerelease archive format is claimed.

## Pre-Apply derivation finding

Read-only `42p-verify-derivation`, profile Allocation → OpenSpec Change: PASS for coverage, grounding, preservation and consistency of the full attributed A-inputs responsibility, composed with the retained baseline. Both coverage directions are 100%. This is semantic judgment after independently reading the source portions and target artifacts, not inferred from this table, identifiers or hashes. No unresolved obligation or authority revision was found in this segment. It certifies neither original-source fidelity nor implementation behavior. The known browser-build stable-only contradiction remains outside this Change.
