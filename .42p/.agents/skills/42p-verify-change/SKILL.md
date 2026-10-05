---
name: 42p-verify-change
description: Perform post-Apply 42P Verification for one allocation unit and its OpenSpec Change. Use when the user invokes Verification after Apply or asks to verify a realized Change under the repository canon.
---

# Verify a Change under 42P

Compose the repository controls with the official OpenSpec verification workflow. Do not copy, fork or edit OpenSpec skills.

1. Read repository-root `AGENTS.md`, [the Verification standard](../../../standards/verification.md), [the OpenSpec usage canon](../../../standards/openspec.md) and [the technical canon](../../../standards/software.md). Resolve the selected Change and its allocation unit from current artifacts; require clean committed review inputs and record their full commit identity before producing the report; follow the OpenSpec canon's project-root check from `.42p` before any workflow write.
2. Confirm semantic allocation-unit ↔ Change coverage at 100% in both directions under the Verification standard. Escalate missing authority or contradictions without revising upstream obligations.
3. Read and execute the current generated [openspec-verify-change skill](../openspec-verify-change/SKILL.md) for that Change. Delegate completeness, correctness and coherence checks to it; do not reimplement its procedure here. Restore an absent official skill through the CLI-owned workflow selection documented in the OpenSpec canon.
4. Run repository checks and applicable tests under the Verification standard and technical canon. Record their results alongside coverage and the official verify report for the same candidate snapshot.
5. Write or update the mandatory `verification.md` inside the selected Change directory with the versioned YAML frontmatter and evidence body defined by the Verification standard. Record failures and blockers as well as successes; commit the report on the working branch. Produce the scoped verdict using the standard's evidence and acceptance rules. Treat the official report as an input to that verdict: its advisory archive-readiness wording does not establish passage of the other two controls or waive an unresolved obligation.

These three controls constitute Verification. Do not add a fourth procedure or perform Apply, synchronization, archive, merge or publication during this invocation. Keep this composition skill repository-owned and separate from CLI-generated `openspec-*` skills; OpenSpec updates must leave it intact.
