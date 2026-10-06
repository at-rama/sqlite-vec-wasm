# Verification standard

This normative standard defines post-Apply Verification for one OpenSpec Change realizing one allocation unit. It is subordinate to [SPEC.md](../../SPEC.md) and follows the [OpenSpec usage canon](openspec.md), [technical canon](software.md) and [editorial standard](editorial.md). **MUST** and **MUST NOT** are mandatory.

## Three required controls

When Verification is invoked after Apply, the agent MUST read and use the repository-owned [42p-verify-change composition skill](../.agents/skills/42p-verify-change/SKILL.md) to perform the following three controls on the current candidate snapshot. Together they constitute 42P Verification; no additional verification stage is required.

1. **Allocation unit ↔ Change coverage.** Confirm that the semantic bidirectional mapping required before Apply remains valid: every obligation of the selected allocation unit is represented in the Change, and every Change requirement is justified by that unit, with relevant scenarios and tasks. Both directions MUST be 100%. Links or matching identifiers alone do not establish coverage. Record the Allocation snapshot, unit handle and Change artifacts reviewed. Do not require coverage of other allocation units. An authorized semantic revision requires renewed coverage; missing, contradictory or insufficient upstream content MUST be escalated rather than reinterpreted locally.
2. **OpenSpec verify.** Read and use the generated [openspec-verify-change skill](../.agents/skills/openspec-verify-change/SKILL.md) to assess implementation completeness, correctness and coherence against the Change's requirements, scenarios, tasks and design. Connect required behavior to implementation and suitable evidence, including applicable failure cases. `verify` is an agent workflow, not an assumed `openspec verify` CLI command. Task completion and `openspec validate` structural success alone MUST NOT establish implementation conformity. The official skill MUST be available before Verification. If absent, stop with a blocker under the evidence rules below. Installation or update through the CLI-owned workflow selection belongs to separate preparation before Verification; MUST NOT install, restore or update skills during this invocation, invent a substitute workflow or hand-edit generated skills.
3. **Repository checks and applicable tests.** Run `sh tools/check-repository.sh` from the repository root and the tests and validation commands applicable to the implemented Change under the technical canon and Change artifacts. Run strict OpenSpec validation from `.42p` as required by the OpenSpec usage canon. Record commands, outcomes and material prerequisites. Missing prerequisites, failed checks or skipped mandatory tests MUST NOT count as a pass. Reuse suitable Apply evidence only when its identity and applicability to the current candidate are established; do not infer conformity from an earlier passing result.

## Evidence and verdict

Once the selected Change, its allocation unit, the clean committed candidate and the report destination under the confirmed OpenSpec project root are resolved, the mandatory output is `verification.md` in that Change directory returned by OpenSpec. Write or update and commit this repository-authored report before ending or escalating a completed, failed or blocked invocation, so the PR contains the available evidence. Mark unexecuted controls `blocked` and unevaluated coverage `null`, and explain the stop reason. If these report prerequisites cannot be resolved, return a diagnostic identifying them; MUST NOT invent identities, a destination or a report. Native archive moves it with the Change; synchronization does not relocate the report into the realization specs.

Use Markdown with a YAML frontmatter delimited by `---`. The following template defines version 1; placeholders MUST be replaced with actual identities and results:

```yaml
---
schema_version: 1
change: <change-name>
allocation_unit: <allocation-handle>
checked_commit: <full-git-commit-sha>
verdict: blocked
coverage:
  allocation_to_change: 0
  change_to_allocation: 0
openspec_verify: blocked
repository_checks: blocked
applicable_tests: blocked
---
```

All fields shown are required. `schema_version` MUST be the integer `1`; `change` MUST match the Change's original name, including after dated archival, and `allocation_unit` MUST match its allocated handle. `checked_commit` MUST identify the clean committed candidate actually reviewed before writing the report. Commit implementation and planning changes before Verification; do not claim a passing verdict for uncommitted reviewed inputs. The report's own commit and a subsequent native archive commit need not equal `checked_commit`; they MUST NOT silently introduce unverified implementation or requirement changes.

Use the version-1 YAML profile shown in the template: plain unquoted scalar values, top-level mappings and exactly two-space indentation for coverage entries. Field order is free, with both coverage entries immediately inside the `coverage` mapping. Blank lines and full-line comments are permitted. Quoted values, inline comments, flow collections, aliases, anchors, tags, multiline scalars and extra mappings are unsupported and MUST NOT be used. This restricted YAML profile allows dependency-free strict parsing. Change names use lowercase alphanumeric segments separated by hyphens; allocation handles use their literal repository spelling; commit identities use 40 lowercase hexadecimal characters. Coverage percentages use ordinary decimal notation or `null` for unevaluated coverage.

The two coverage values are numeric percentages from 0 through 100 representing semantic coverage, not confidence. If a direction cannot be evaluated, use YAML `null` and explain why in the body; it cannot pass. `openspec_verify`, `repository_checks`, `applicable_tests` and `verdict` accept only `passed`, `failed` or `blocked`. Use `failed` for an established conformity gap or failed mandatory check, and `blocked` for missing or unusable evidence, unavailable prerequisites, or a required control that could not be completed. If both conditions exist, use `failed` for the aggregate verdict and document the blockers as well.

`verdict: passed` is permitted only when both coverage values equal 100 and all three result fields equal `passed`, under the acceptance rules below. If no test beyond the repository check is applicable, record the scope and justification in the body; do not invent tests or silently skip a required test.

The Markdown body MUST begin with the concise institutional view defined below, followed by the detailed verification record. The detailed record MUST give the Allocation snapshot and evidence references for both coverage directions, the official verify findings and their dispositions, repository/test commands and outcomes with material prerequisites, and unresolved gaps or blockers. Reference existing suitable coverage and Apply evidence instead of duplicating them. Keep raw outputs and generated evidence in ignored `.work/` or outside the checkout under the technical canon; summarize necessary results durably in this report.

This frontmatter is the machine-readable contract for the [pull-request Verification gate](gates.md). The gate MUST reject a missing report, malformed or duplicate YAML keys, missing or unknown fields, an unsupported schema version, invalid values, identity mismatches or an inconsistent/non-passing verdict. A passing declaration is evidence metadata, not an independent proof of semantic conformity or freshness; the review and applicable executable checks remain necessary.

Verification is satisfactory only when both coverage directions are 100%, OpenSpec verify establishes conformity for every applicable obligation, and all mandatory repository checks and applicable tests pass. An unresolved conformity gap or an applicable check marked `Not verified` prevents a satisfactory verdict. Assess warnings by their substance: an unresolved obligation remains blocking regardless of its OpenSpec severity label. Optional improvement suggestions do not add obligations or block conformity. Record each finding's disposition and reason without silently waiving requirements.

The verdict MUST remain limited to the Change's allocation unit. Verification of one unit does not establish full-product acceptance or release readiness. Changes to reviewed requirements, implementation or relevant validation invalidate affected evidence until rechecked.

Verification does not implement corrective work, synchronize specs, archive, merge or publish. Report required corrections without silently revising the authorized Change. After a satisfactory verdict, archive follows normal OpenSpec behavior, including its synchronization handling, under the existing lifecycle and human integration/publication authority. Do not perform those subsequent operations merely because Verification was invoked.

## Institutional view

Every report, including a failed or blocked report, MUST expose a concise view that lets the human assess the justification and limits of the proposed conclusion before reading technical detail. Place it immediately after the frontmatter and report title. It is a projection of the same three controls and detailed record, not a fourth control, a separate artifact or a new lifecycle stage. Keep the version-1 YAML contract unchanged; its gate does not establish the semantic adequacy of this view.

Use short prose and a claim table, in this order:

1. **Scope and candidate.** Identify the Change, allocation unit, checked commit and scoped verdict consistently with the frontmatter.
2. **Claims established.** For each claim, identify the obligations it summarizes, the supporting observation and actual result, and a link to the detailed evidence. State what was established, rather than naming a command or reporting task completion. Group obligations when useful for readability, preserving their conditions and traceability; keep the exhaustive mapping in the detailed record. If no claim is established, state that explicitly.
3. **Evidence dependencies.** Explain the relevant separations from the implementation, shared mechanisms or assumptions, and material residual risks of correlated error. Keep claim-specific dependencies attached to the claim; describe common dependencies once.
4. **Limits and unresolved obligations.** Distinguish properties outside the allocation unit's scope from required properties that remain unestablished. Expose material failures, blockers and finding dispositions; an unresolved obligation MUST NOT be presented as a harmless scope exclusion.
5. **Conclusion for institution.** State what the evidence supports for this candidate within those limits, or why it cannot support a satisfactory verdict. This prepares the human decision; it MUST NOT assert that human authorization has occurred or perform a subsequent lifecycle operation.

The view MUST remain derived from the detailed record without introducing new evidence or strengthening its conclusions. Preserve material conditions, uncertainties and contrary findings even when compressing the record. Distinguish newly executed observations from reused evidence and retain a reference to the latter's established identity and applicability. For a universal claim, distinguish the cases actually exercised from the reasoning that supports generalization; finite successful examples alone MUST NOT be represented as exhaustive proof.

Describe independence through identifiable boundaries and dependencies, not an unsupported label. An executable observation through the product's public surface can be separate from an implementation's internal assertion while still depending on a repository-authored harness. A separately constructed reference can share construction functions, options and probes with the candidate; disclose those shared mechanisms and the common errors they may conceal. Disclose material common agentic authorship when known, but do not treat authorship alone as proof or disproof of independence. If a relevant dependency cannot be established, state the uncertainty.

Descriptors such as semantic, executable, black-box, comparative and external may clarify the nature of evidence; they are nonexclusive characteristics, not confidence levels or independence guarantees. MUST NOT invent confidence scores or independence percentages. An agent's semantic judgment MUST remain distinguishable from an observed execution result.

Keep the view small enough to review as a whole, using a few meaningful claims rather than repeating every scenario, command or hash. Concision MUST NOT hide a material limitation or unresolved obligation. The existing evidence and acceptance rules still determine the verdict; the view neither waives obligations nor adds a human approval field or an additional Archive lock.
