# OpenSpec usage canon

This normative canon governs OpenSpec as the repository's 42P change mechanism, subordinate to [SPEC.md](../../SPEC.md). **MUST** and **MUST NOT** are mandatory. Apply the [editorial standard](editorial.md) and [technical canon](software.md) throughout.

## Project and CLI location

`.42p` is the OpenSpec project root; `.42p/openspec/` contains its configuration, changes and realization canon. Keep the built-in `spec-driven` schema. MUST NOT use an OpenSpec Store, `--store`, or a repository-root `openspec/`.

Normal OpenSpec CLI commands MUST execute with `.42p` as working directory. From the repository root:

```sh
cd .42p
openspec list
openspec list --specs
openspec status --change <change>
openspec validate --all --strict
openspec instructions proposal --change <change> --json
openspec archive <change> --skip-specs
```

MUST NOT run normal commands from the repository root or rely on downward discovery of `.42p/openspec/`. Setup/update operations that accept a project path MUST target `.42p`; pathless refresh commands MUST run from `.42p`. Initial setup from the repository root is `openspec init .42p --tools agents --profile core`. Install the official CLI in the execution environment; this integration does not require a repository dependency.

Before any workflow write, resolve the local project with `openspec list --json` or `openspec context --json` from `.42p`. The returned project root MUST be this checkout's `.42p`; generated change and spec paths MUST remain inside `.42p/openspec/`. Stop on a missing or different root. Interpret generated `openspec/...` paths relative to `.42p`; repository implementation files remain relative to the repository root, its parent.

## Generated skills

Shared skills live under `.42p/.agents/skills/openspec-*/`; `.42p/.agents/skills/.openspec-target` is generated target metadata. MUST read and use the appropriate generated `SKILL.md` for a workflow. MUST NOT hand-edit these files. Refresh them through the OpenSpec CLI when required.

Use the generated skills directly in ChatGPT Work by reading their files through repository access. Add an adapter only for a demonstrated Work incompatibility; MUST NOT duplicate workflow logic in advance. Repository 42P rules override generic OpenSpec assumptions where they differ, including optional sync, fluid Apply and archive suggestions.

## Authority and lifecycle

The authority chain is:

`SPEC.md` → Capture → Allocation → OpenSpec realization canon → Proposition → implementation → Verification.

SPEC.md remains the sole authoritative product contract. [Capture and Allocation](../engineering/) remain the authoritative rationale and allocation toward realization within their derived scope, subordinate to SPEC.md. Neither OpenSpec artifacts nor task completion can change that authority or establish implementation acceptance.

The normal operational path is:

Allocation → `propose` → allocation/change coverage gate → `sync` → `apply` → 42P Verification → `archive`.

1. **Propose.** Use `openspec-propose` to derive the Change's proposal, delta specs, design and tasks from Allocation. Record the Allocation snapshot and stable allocation handles used. MUST NOT introduce unallocated product requirements. The generated `proposal.md` is the OpenSpec Proposition artifact; it is drafted here and constrains implementation together with the synchronized canon.
2. **Coverage gate.** Before sync, record a bidirectional mapping from every allocated requirement to OpenSpec requirements and back, with relevant scenarios and tasks. Allocation → OpenSpec coverage MUST be 100% and OpenSpec → Allocation coverage MUST be 100%: no allocated requirement missing, no OpenSpec requirement without Allocation authority. For incremental Changes, account explicitly for already synchronized requirements and the current delta; cumulative coverage MUST cover the complete Allocation. Link prior mappings instead of claiming omitted allocation units are out of scope. Missing, contradictory or insufficient upstream content, or a required semantic change, MUST stop the workflow and escalate to the upstream authority. MUST NOT resolve it by local reinterpretation.
3. **Sync.** Use `openspec-sync-specs` only after the gate passes. Sync is an agent workflow, not an assumed `openspec sync` CLI command. After sync, `.42p/openspec/specs/` is the cumulative realization canon derived from Allocation and opposable to Apply and Verification. Strict validation MUST pass; synchronization does not claim implementation exists.
4. **Apply.** Use `openspec-apply-change` only after coverage and sync. Apply MUST remain constrained by the Change, synchronized realization canon and repository standards. MUST NOT reinterpret upstream authority, narrow obligations or add unallocated requirements. If an artifact needs a semantic revision, stop and escalate; repeat coverage and sync for an authorized revision before resuming Apply.
5. **Verification.** Perform distinct 42P Verification against Allocation, synchronized canon and the Change, connecting implementation and applicable checks to the required behavior. Record evidence and unresolved gaps. Task checkboxes, file-existence status and OpenSpec structural validation MUST NOT substitute for this stage or for product acceptance.
6. **Archive.** Use `openspec-archive-change` only after satisfactory 42P Verification. Confirm delta specs are already synchronized; MUST NOT use archive's optional sync or incomplete-work confirmations to bypass an earlier gate. If invoking the archive CLI, use `--skip-specs` after confirming synchronization to avoid reapplying the delta. Archive records completed work; it does not replace Verification or authorize merge/publication.

The other generated core workflows (`openspec-explore` and `openspec-update-change`) are supporting operations, not extra 42P lifecycle stages. MUST NOT use them to bypass Capture, Allocation, coverage or Verification. Any semantic update invalidates affected coverage and verification evidence until reconciled through the same gates.
