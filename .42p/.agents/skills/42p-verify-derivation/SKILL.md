---
name: 42p-verify-derivation
description: Verify fidelity of Capture to Allocation or Allocation to an OpenSpec Change, locally or across a declared chain segment; audit instituted sources to Capture only on explicit request. Use for bidirectional obligation coverage, grounding, semantic preservation and continuity reviews. Report evidence and limits without reconciling artifacts or verifying implementation.
---

# 42p-verify-derivation

Verify transformations of obligations without becoming a design authority. Follow the host repository's authority, lifecycle and evidence rules; disclose conflicts rather than changing them. This skill adds no mandatory lifecycle stage, gateway or institutional object. It neither replaces nor invokes post-Apply `42p-verify-change` or implementation verification.

## Bind the examination

Support two invocation forms, as workflow notation rather than executable commands:

- `verify-derivation(source, target, relation)` examines one scoped relation using its profile below.
- `verify-derivation(chain)` applies that same local procedure to the relations included in the requested segment, then examines their continuity. A chain may be incomplete.

Declare the starting artifact, ending artifact and material scope before examining a relation or chain. Each local verification is autonomous: it does not require prior upstream derivations to have passed. A segment may start at Capture or Allocation and stop at Allocation or a proposed Change; implementation, task completion and archive are not prerequisites. Resolve routine scope from the request and repository state without extending it to every discoverable artifact.

Include instituted sources to Capture only when explicitly requested, as a targeted audit against a designated, delimited source corpus. The presence of some original sources does not automatically include that relation or authorize a full historical audit. Downstream verification uses the relevant projections and their qualified references without mandatory recursive reacquisition of original sources. This operational boundary gives projections no independent decision authority and establishes no fidelity to unexamined originals.

Resolve the requested scope and current artifacts from actual repository state. Read repository instructions and relevant standards before acting. Identify the working revision, local changes, source and target locators, versions and relevant content fingerprints. Do not assume fixed filenames, unit counts, branch names or lifecycle status. Separate committed snapshots from dirty working contents. A material ambiguity that cannot be resolved legitimately needs a focused question; other limits remain explicit while supported examination continues.

Acquire complete relevant passages within the declared scope, including material prose, dependencies, exclusions and provenance outside named handles. For qualified Allocation references, retrieve the selected Capture passages: a compact unit is not a self-contained specification. Resolve scoped supersessions and authority from available evidence, never from recency alone. Treat Captures, Allocations, coverage tables and prior agent reports as projections or comparison evidence, not independent corroboration. Retain known upstream contradictions or authority uncertainties that materially affect the requested segment; scope selection must not conceal them. Missing original-source access alone does not prevent a downstream verdict on the examined correspondence.

Classify downstream artifacts: active Change, synchronized current specification, archived Change or historical evidence. Resolve historical comparisons at their recorded source revisions and hashes. Examine synchronized specifications where they carry the current contract; do not substitute archives for them. A missing future Change is not a defect unless an established lifecycle condition requires it now. State absent, inapplicable and inaccessible relations separately; do not report them as verified.

Operate read-only: do not alter artifacts, refresh identities, write reports, run write-producing workflows, commit, apply, synchronize, archive or publish. Return results in the conversation unless a separate instruction explicitly authorizes a report destination. Report corrections and authority questions without performing reconciliation. Do not run implementation tests merely to judge a documentary derivation.

## Apply the common local procedure

1. Establish source and target scope, their relationship and the authority/provenance actually available. Distinguish semantic correspondence from whether the source was legitimately instituted.
2. Identify every material source obligation and other material state in that scope. Split composite handles into distinguishable portions where attribution or treatment differs; use retrievable passages and short qualifiers, without requiring new persistent identifiers. Preserve modality, conditions, exceptions, uncertainty, alternatives and rationale needed to interpret the obligations.
3. Follow every source portion into the target. Record its disposition: represented, attributed by qualified reference, legitimately contextual or not allocable, explicitly deferred under an established rule, unresolved, or missing. A declared exclusion or deferral is not sufficient justification by itself. A contradiction is a finding, not an acceptable disposition.
4. Read the target independently in reverse. Ground each material target obligation, responsibility, boundary and dependency in the appropriate source portion, permitted refinement or applicable host rule. Do not infer grounding from a matching handle or the forward coverage table. Trace requirements, scenarios, design and tasks insofar as they carry material obligations.
5. Assess all four properties below using the appropriate relation profile. Group portions only when each member's disposition and conditions remain inspectable. Distinguish an established deviation from a suspected ambiguity or missing evidence.

| Property | Examination |
| --- | --- |
| Coverage | Every material source obligation or state has an explicit, legitimate treatment appropriate to this relation and scope. |
| Grounding | Every material target obligation or responsibility has a legitimate basis; no ungrounded promotion, addition or strengthening. |
| Preservation | Meaning, scope, modality, exceptions, conditions and relevant rationale survive the transformation. |
| Consistency | Contributions, dependencies and boundaries remain mutually coherent, including shared and cross-cutting obligations. |

Link each conclusion to precise source and target passages and the examination performed. Fingerprints establish byte identity; structural checks establish only their machine contracts; semantic judgment establishes the examined correspondence within its evidence limits. None proves human authorization. A sentence claiming approval, a passing test, or an agent-authored receipt cannot establish a human decision by itself. Missing proof must not become success.

## Interpret the relation

### A. Instituted sources to Capture

When this audit is explicitly requested, check source identity, provenance, the designated corpus scope and available evidence of adoption. Distinguish primary sources, explicitly designated derived sources and accounts of unavailable originals. Compare material decisions and their rationale, alternatives, reservations and limits with their captured treatment. Preserve decision, hypothesis, question, observation and model proposal as different epistemic states. User silence is not adoption.

An exploratory hypothesis may be omitted when no longer material, or retained as a hypothesis; it must not become an instituted obligation without grounding. Compression need not preserve every utterance, but must retain distinctions that affect plausible resumption or revision. Do not infer retraction from absence in a fragment. When sources necessary to the requested audit are inaccessible or only partially available, state exactly which correspondences remain unverified; a Capture cannot corroborate itself. Distinguish incomplete source access from an established omission of material source content in the Capture. A delimited audit makes no claim about the whole exploration or later amendments outside its scope.

### B. Capture to Allocation

The Allocation distributes responsibility without reproducing design. Check each material realization obligation's assigned contributions or justified non-allocation; check each unit's responsibilities against the captured design. Qualified references may suffice: concision is not non-conformity, and duplication of detailed design is not required.

For composite handles, examine all material portions and the exact contribution assigned to each unit. Several units may share one obligation through distinct production, verification or publication roles. Check material handoffs, boundaries, overlaps and cross-cutting constraints; distinguish legitimate collaboration from ambiguous attribution. Detect orphan responsibilities, omitted obligations and unresolved attributions. Context, alternatives and open questions require faithful treatment, not invented implementation units or readiness gates.

### C. Allocation to OpenSpec Change

Resolve the selected unit and its complete attributed obligations through qualified Capture references. Respect the host's Change granularity and lifecycle; do not demand unrelated units in this Change. Compare the unit with proposal, requirements, scenarios, design and tasks, and with relevant synchronized baseline requirements when deltas modify, remove or rename behavior.

Check both directions, realization boundaries, conditions and enough contractual precision for later verification. Scenarios must preserve the obligations they exercise; counts alone do not show coverage. Distinguish permissible technical choices that realize an assigned responsibility from added product obligations, weakened constraints or changed upstream decisions. Technical novelty alone is not lack of grounding; explain how the choice stays within the assigned boundary and applicable canon.

This examination assesses the realization contract, not code behavior, task completion, implementation correctness or acceptance. Historical contract fidelity is judged against its historical Allocation; applicability to today's Allocation is a separate comparison. Do not retroactively fail an archive solely because upstream requirements later changed, or carry its historical PASS forward as current conformity.

## Examine chain continuity

Reuse the local findings within the declared segment. Identify whether each included downstream edge consumes the exact upstream snapshot examined and whether its qualified references still resolve with the intended meaning. Compare relevant revisions where available; equal handles can hide semantic change, and different hashes need not imply changed obligations.

Follow material upstream changes through attributions and contract dependencies, stopping where the dependency no longer carries the change. Distinguish three consequences: reevaluation needed because applicability is not established; correction needed because a current contradiction or omission is established; unable to conclude because necessary evidence is unavailable. A Capture revision may require reevaluation without any Allocation edit.

Report stale references, incompatible snapshots, ambiguous supersessions and broken semantic handoffs. Preserve valid historical findings and their limits. A passing segment establishes only its examined correspondences, not unproved source authority or unexamined upstream fidelity. Mark relations outside the requested segment as not examined, without treating them as passed or inconclusive inputs to its verdict; disclose relevant provenance limits and known upstream problems that affect the segment. Explain missing future edges using actual lifecycle state, without converting legitimate incompleteness into either failure or end-to-end success.

## Report and conclude

Keep the report economical and inspectable. Include:

1. Source/target identities and versions, relation profiles, declared start/end and material scope, and historical/current status; identify relations not examined.
2. Compact obligation dispositions in both directions, with precise supporting locators; identify all unresolved portions. References to an existing mapping may reduce repetition only after independently checking its semantic content.
3. Coverage, grounding, preservation and consistency findings, continuity/freshness impacts, evidence nature and access limits. Separate established defects, missing evidence and optional improvements.
4. Local verdicts and a scoped consolidated verdict with the minimal justified next action. Report expected but unavailable edges and unexercised capabilities explicitly.

Use `PASS` only when conformity is established for all applicable properties in the declared examined scope. Use `FAIL` when a non-conformity is established. Use `INCONCLUSIVE` when evidence or examination is insufficient to conclude and no failure is established. An applicable missing or unchecked portion prevents a full-scope PASS; narrower passing subresults remain useful but cannot silently narrow the requested verdict.

Consolidate only the relations included in the declared segment: an established failure yields FAIL, retaining other unknowns; otherwise an unresolved applicable relation/property yields INCONCLUSIVE; otherwise the examined segment may PASS. Missing evidence necessary to an included relation prevents its PASS; unavailable originals for an unrequested sources-to-Capture audit do not by themselves degrade the downstream segment's verdict. Do not silently narrow the requested scope to obtain a PASS or imply a complete lifecycle chain when other edges are not examined or legitimately absent. Never average verdicts or invent confidence percentages. State whether a finding concerns the corpus, the verification limits or the protocol itself.

When evaluating this skill, distinguish observed successes and defects from theoretical behavior. Do not manufacture corpus anomalies or revise the skill during a read-only evaluation to obtain a preferred verdict. Propose any needed correction separately. Verification prepares human judgment; it neither institutes the design nor authorizes the next lifecycle operation.
