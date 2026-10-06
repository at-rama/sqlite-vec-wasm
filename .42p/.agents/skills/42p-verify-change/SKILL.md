---
name: 42p-verify-change
description: Perform post-Apply 42P Verification for one allocation unit and its OpenSpec Change. Use when the user invokes Verification after Apply or asks to verify a realized Change under the repository canon.
---

# Verify a Change under 42P

Compose the repository controls with the official OpenSpec verification workflow. Do not copy, fork or edit OpenSpec skills.

1. Read repository-root `AGENTS.md`, [the Verification standard](../../../standards/verification.md), [the OpenSpec usage canon](../../../standards/openspec.md) and [the technical canon](../../../standards/software.md). Resolve the selected Change and its allocation unit from current artifacts; require clean committed review inputs and record their full commit identity before producing the report; follow the OpenSpec canon's project-root check from `.42p` before any workflow write. Confirm that the official `openspec-verify-change` skill is available before running the controls; if absent, use the stop rules below.
2. Confirm semantic allocation-unit ↔ Change coverage at 100% in both directions under the Verification standard. Escalate missing authority or contradictions without revising upstream obligations.
3. Read and execute the current generated [openspec-verify-change skill](../openspec-verify-change/SKILL.md) for that Change. Delegate completeness, correctness and coherence checks to it; do not reimplement its procedure here. Its availability is a prerequisite: if absent, stop with a blocker under the standard; installation or update belongs to separate preparation, before Verification.
4. Run repository checks and applicable tests under the Verification standard and technical canon. Record their results alongside coverage and the official verify report for the same candidate snapshot.
5. When the report prerequisites in the standard are resolved, write or update the mandatory `verification.md` inside the selected Change directory with the versioned YAML frontmatter and evidence body defined by the Verification standard. Begin the body with the standard's concise institutional view, before the detailed evidence record. Derive it from the same candidate and findings: expose the claims established, observed results, evidence dependencies, unresolved obligations and verdict boundaries. Do not invent evidence, independence or human authorization. Record failures and blockers as well as successes; commit the report on the working branch. Produce the scoped verdict using the standard's evidence and acceptance rules. Treat the official report as an input to that verdict: its advisory archive-readiness wording does not establish passage of the other two controls or waive an unresolved obligation.

On a stop or escalation, first record the available findings and blockers in the report when its prerequisites are resolved; mark unexecuted controls `blocked` and unevaluated coverage `null`. Otherwise return a diagnostic identifying the unresolved prerequisites without inventing identities or a report destination. Do not install, restore or update generated skills during this invocation.

These three controls constitute Verification. Do not add a fourth procedure or perform Apply, synchronization, archive, merge or publication during this invocation. Keep this composition skill repository-owned and separate from CLI-generated `openspec-*` skills; OpenSpec updates must leave it intact.
