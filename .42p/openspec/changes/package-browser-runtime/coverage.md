# Allocation and Change coverage

## Source snapshot and boundaries

Direct source: [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, at baseline `14c4c8fc545cd69ee083632505cbaf581905e6b0`. [Capture](../../../engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) SHA-256: `1fa058a1d65708d69495b59d8e04b42a38a2cccc3093f114db538edb52621b67`. [SPEC.md](../../../../SPEC.md) SHA-256: `40d0cf9e9de1a70c95f6648cdbfa57ecd7c067c2c334344347ad6fc20f404eb4`; it remains the product authority.

This Change realizes exactly `A-package`, grounded in `C-purpose`, `C-nonmodification`, `C-inputs`, `C-browser`, `C-storage` and `C-release`. The confirmed 2026-10-07 exploration selects direct upstream exposure, unchanged runtime names/bytes/layout and a common runtime payload for npm and GitHub Releases. One shared npm-compatible archive, explicit caller-supplied metadata, controlled notices and a success-only package handoff are proposed realization details under those obligations, not additional product authority.

## Allocation unit to Change

Requirement names identify blocks in [the delta](specs/browser-package/spec.md); task numbers refer to [tasks](tasks.md). This mapping covers planned behavior and evidence, not acquired implementation results.

| A-package obligation | Delta requirement | Scenario coverage | Tasks |
| --- | --- | --- | --- |
| Consume the complete browser runtime from A-build and preserve its output | Validated build input; Complete conservative runtime assembly | Matching runtime; invalid/altered handoff; all loading surfaces | 1.1, 1.2, 1.3, 1.4, 5.1 |
| Distribute required loaders, workers, proxies and WASM with working asset resolution | Complete conservative runtime assembly; Independent packaged asset resolution | All loading surfaces; relocated extraction; missing companion | 1.2, 2.1, 2.4, 3.1, 4.1, 4.2, 4.3 |
| Keep supplied bundler variants accessible without universal bundler guarantees | Complete conservative runtime assembly; Independent packaged asset resolution | All retained loading surfaces; supported upstream resolution | 2.1, 2.4, 4.1 |
| Exclude demos, benchmarks, test applications and optional experimental variants | Complete conservative runtime assembly | Unrelated build files; exact final contents | 1.2, 2.1, 3.1, 5.2 |
| Consumers require no native/WASM compilation | Consumer-ready distribution envelope | Local npm installation and static-host extraction | 2.1, 2.4, 3.1, 3.3, 5.1 |
| Generated SQLite JavaScript/WASM are not committed | Generated outputs remain uncommitted | Repository exclusion; clean packaging | 1.2, 1.4, 3.3, 5.1, 5.2 |
| Preserve A-build behavior and allowed glue boundary, including no silent transient substitution | Preserved behavior and glue boundary | Direct upstream use; unavailable persistence; semantic-change escalation | 1.2, 2.1, 2.4, 4.1, 4.2, 5.2 |
| Include required upstream licensing notices | Complete licensing material | Missing archive license files; extracted notice inventory | 2.2, 2.4, 3.1, 5.2 |
| Supply runtime payload/output digests for A-release's identity; supply final assets to A-acceptance and exact verified payload to A-release | Consumer-ready distribution envelope; Traceable final package handoff | Supplied identity; downstream handoff; failed assembly/archive | 2.3, 3.1, 3.2, 3.3, 4.3, 5.1 |

The unit's surface and evidence targets are represented: distributable contents, resolution, final digests, notices and repository exclusions. Successful assembly is distinct from full A-acceptance and publication. Browser checks here evidence packaging preservation/resolution; they do not transfer the full mandatory acceptance gates to this unit.

## Change to allocation unit

| Delta requirement | A-package grounding |
| --- | --- |
| Validated build input | Composition with A-build, preservation of its runtime, `C-inputs` integrity and final-payload identity; validates the existing handoff rather than changing upstream acquisition |
| Complete conservative runtime assembly | Explicit complete payload, required companions, accessible bundler variants and baseline exclusions under `C-browser`; confirmed conservative realization |
| Independent packaged asset resolution | Explicit working loader/Worker/proxy/WASM resolution under `C-browser` and preserved storage conditions under `C-storage` |
| Consumer-ready distribution envelope | No consumer compilation, distributable surface and `C-release` channel-consumption context; package metadata carries external identity without owning release policy |
| Preserved behavior and glue boundary | Explicit preservation of A-build behavior, `C-nonmodification`, browser-only `C-purpose` and no transient substitution under `C-storage` |
| Complete licensing material | Explicit upstream-notice responsibility under `C-release`; origin/digest associations make inclusion reviewable |
| Traceable final package handoff | Explicit output digests and final-assets/exact-payload composition with A-acceptance/A-release; success-only output distinguishes actual assembly from partial/old results |
| Generated outputs remain uncommitted | Explicit JavaScript/WASM artifact exclusion under `C-inputs`; clean packaging specializes the repository-input reproduction boundary without claiming full production CI |

All eight requirements are grounded in this one allocation unit. Their 17 scenarios and all 16 tasks map to its obligations or their scoped tests/documentation. Name/version argument validation, controlled notice associations, the flat file layout, exact archive inspection and handoff mechanics realize the allocation; they do not introduce a registry identity decision, release policy, new application API or additional allocation unit.

## Unit-scoped planning gate

Under [the OpenSpec usage canon](../../../standards/openspec.md#authority-and-lifecycle), **planning coverage: PASS for `A-package` ↔ `package-browser-runtime`**.

- **Allocation unit → Change: 100%.** Every material obligation and composition boundary of A-package is mapped above.
- **Change → allocation unit: 100%.** All eight delta requirements and their scenarios/tasks trace to A-package without an orphan product requirement.

This is an assessment of the authored plan. It does not establish correctness of an implementation, upstream-chain fidelity, browser results, notice audit completion or release readiness. Any necessary semantic revision requires upstream escalation where applicable and renewed coverage before Apply continues.

## Composition and next stage

`browser-build` and `upstream-inputs` requirements remain unchanged. A-acceptance owns complete clean-production CI, final-payload API/default-capability checks, deterministic vector/Hamming fixtures, restart persistence and applicability of evidence to the authoritative revision/payload. A-release owns package identity policy, revision/tag/version/publication synchronization and publication gates; A-bootstrap owns registry/trusted-publishing setup. One hashed tarball supports the shared runtime-payload requirement without performing those responsibilities.

Planning artifacts remain the reviewed basis for implementation. [Apply evidence](apply-evidence.md) records the implementation and scoped checks; [tasks](tasks.md) records completion. Distinct 42P Verification and Archive remain required; Apply does not supply their report or establish full acceptance. The affected active Change intentionally leaves the repository's Verification/Archive merge gates unsatisfied at this stage.
