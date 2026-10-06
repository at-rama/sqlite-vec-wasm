# Allocation and Change coverage

## Source snapshot and boundaries

Direct source: [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, at baseline `3a0dc12b598f93b122a38e90f03452e3626d84e9`. [Capture](../../../engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) snapshot: `1fa058a1d65708d69495b59d8e04b42a38a2cccc3093f114db538edb52621b67`. [SPEC.md](../../../../SPEC.md) snapshot: `40d0cf9e9de1a70c95f6648cdbfa57ecd7c067c2c334344347ad6fc20f404eb4`; it remains the product authority.

This Change realizes exactly `A-build`, grounded in `C-purpose`, `C-nonmodification`, `C-inputs`, `R-inputs`, `C-browser`, `C-static` and `C-storage`. The confirmed 2026-10-06 discussion selects canonical build orchestration, one static C bridge, explicit browser targets, an absolute include in temporary glue and fresh acquisition in the build invocation. The requested planning capture also retains the proposed traceable success-only handoff as a realization of A-build's integration-output/environment evidence and composition with A-package. File names, JSON layout and test tooling are realization details, not new product authority.

## Allocation unit to Change

Requirement names identify [delta-spec blocks](specs/browser-build/spec.md); task numbers identify [pending Apply work](tasks.md). Scenario coverage states expected behavior, not acquired implementation evidence.

| Allocated content | OpenSpec requirement | Scenario coverage | Tasks |
| --- | --- | --- | --- |
| Canonical browser/WASM construction consumes the official stable inputs supplied by A-inputs | Fresh verified build inputs | Recorded pair; failed acquisition; prior temporary sources | 1.1, 1.2, 2.1, 5.1 |
| SQLite core, WASM support and JavaScript bindings originate from the same release; full-source acquisition context retained | Common SQLite release identity | Consistent generation; missing component | 2.1, 2.4, 5.1 |
| Stable sqlite-vec is compiled statically and automatically registered through the supported mechanism for every new connection; no consumer load/registration | Static registration on every connection | Independent connections; Worker/Worker1 connections; failed registration | 1.3, 2.2, 2.4, 4.2, 4.3 |
| Conventional JavaScript and ESM, C-style and OO1, BigInt, Worker1/promiser, FTS5 and the complete canonical default capabilities | Canonical browser baseline is retained | Loading/API surface; SQL/extension semantics; Worker1; baseline omissions | 2.2, 2.3, 4.1, 4.2, 4.3 |
| Default persistence VFSes including OPFS, preserved semantics and upstream prerequisites/limitations; no main-thread OPFS promise or transient fallback | Upstream storage conditions are preserved | Default VFS availability; unsupported persistence context | 2.2, 4.1, 4.4, 4.5 |
| Build-defining toolchain/dependency versions and options pinned and recorded; clean reproduction prerequisites | Recorded reproducible construction | Clean reconstruction; tool-integrity failure; actual parameters | 1.1, 1.4, 2.1, 2.2, 3.1, 5.1 |
| Browser-only runtime; Node tooling permitted; Node runtime/native/WASI excluded; server node:sqlite/native sqlite-vec outside scope | Integration and runtime boundaries | Unmodified inputs; excluded outputs; required patch escalation | 1.3, 2.2, 2.3, 2.4, 5.2 |
| No functional upstream modification, ORM/SQL abstraction/application API/FluidJ/custom vector semantics; glue restricted to build/init/locate/expose; unavoidable patch requires contract revision | Integration and runtime boundaries; Canonical browser baseline is retained | Unmodified sources; patch escalation; preserved SQL/extension semantics | 1.3, 2.4, 4.1, 4.2, 5.2 |
| Build output supplies A-package and identifies source/environment/options and retained capability surface | Traceable runtime handoff | Complete success; missing file; packaging boundary | 2.3, 3.1, 3.3, 4.1, 5.2 |
| Construction must actually produce the defined output; earlier or partial output cannot establish success | Failure does not reuse previous output | Failure with earlier success; retained diagnostic; successful lifetime | 1.1, 1.2, 2.1, 2.2, 3.2, 3.3 |
| Document clean-checkout build prerequisites and upstream Worker, secure-hosting and VFS-specific isolation/header requirements and limitations | Reproduction and browser prerequisites are documented | Reproduction instructions; storage prerequisites | 1.4, 2.4, 3.3, 4.5, 5.1 |

Every material A-build obligation is represented. Fresh acquisition and failure isolation specialize verified-source use and construction rather than change A-inputs selection. Runtime hashes and temporary output inventory support the A-build handoff; A-package still owns assembled payload digests and licensing. Browser checks are evidence for A-build's retained functionality, not a transfer of A-acceptance's final-package responsibility.

## Change to allocation unit

| Delta requirement | A-build authority / realization grounding |
| --- | --- |
| Fresh verified build inputs | Consumes A-inputs under `C-inputs`; confirmed fresh-acquisition realization |
| Common SQLite release identity | Explicit same-release MUST from `R-inputs` owned by A-build |
| Static registration on every connection | `C-static`, canonical integration purpose and supported mechanism |
| Canonical browser baseline is retained | `C-browser`, preserved default API/loading/SQL capabilities |
| Upstream storage conditions are preserved | `C-storage`, default persistence, prerequisites and limitations |
| Recorded reproducible construction | A-build's `C-inputs` tooling/options and clean-reproduction responsibility |
| Integration and runtime boundaries | `C-purpose`, `C-nonmodification`, `C-browser` and explicit patch/runtime exclusions |
| Traceable runtime handoff | A-build integration-output surface, environment/options evidence and composition with A-package; proposed handoff realization |
| Failure does not reuse previous output | Verified-input and actual-construction obligations under `C-inputs`/`C-purpose`; confirmed fresh execution and diagnostic realization |
| Reproduction and browser prerequisites are documented | Explicit A-build documentation obligations under `C-inputs` and `C-storage` |

All ten requirements are grounded in this one unit; there are no orphan product requirements. Their 28 scenarios cover observable success, failure and boundary behavior, and all 18 implementation tasks are connected to these requirements or their applicable evidence/documentation needs.

## Unit-scoped planning gate

Under [the OpenSpec usage canon](../../../standards/openspec.md#authority-and-lifecycle), **planning coverage: PASS for `A-build` ↔ `build-canonical-browser`**.

- **Allocation unit → Change: 100%.** All material A-build content is mapped above, including default capabilities beyond named examples, common-release identity, static registration, preservation boundaries and both reproduction/storage documentation.
- **Change → allocation unit: 100%.** All ten delta requirements and their realization choices map back to A-build. No additional allocation unit is introduced.

The coverage verdict assesses the authored plan, not runtime correctness. Compilation of the bridge, header resolution, actual browser/VFS behavior and baseline preservation remain to be demonstrated during Apply. An incompatibility needing a patch, contract change or omitted capability must be escalated rather than waived; a semantic artifact revision requires renewed coverage.

## Composition and next stage

A-inputs remains the existing source-selection/integrity capability and is not modified here. A-package owns consumer payload assembly, licensing and publication-ready contents. A-acceptance owns the complete clean production CI path and mandatory browser gates on final packaged assets, including independently known vector/Hamming results and persistence across runtime termination/reopen. Build-time checks do not establish those outcomes. A-updates/A-release retain candidate, human-merge and publication responsibilities.

This planning PR contains no implementation, Apply evidence, Verification report, synchronized main spec or archive. After separate Apply authorization, complete the tasks and obtain distinct 42P Verification through the repository-owned composition skill, then archive under the repository canon. Existing merge gates are expected to block this active, unverified Change; no gate is bypassed and no passing Verification is invented for planning.
