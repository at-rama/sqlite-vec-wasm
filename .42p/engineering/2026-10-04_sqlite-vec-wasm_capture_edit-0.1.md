# Specification-derived Capture

## Purpose, scope, and authority

Purpose: structure the current `sqlite-vec-wasm` project contract for later reasoning. Scope: the root specification and the user's validated rationale in S-release-model and S-doc-model. This Capture is a derived, non-authoritative working set; [S-spec](../../SPEC.md) governs every difference in reading. It introduces no decision, allocation, implementation choice, or implementation plan.

All normative modalities below report S-spec's requirements, permissions, preferences, and exceptions; they confer no independent authority. MUST denotes a requirement; SHOULD denotes a preference whose departure needs a concrete justification. S-spec establishes the contract, not evidence that bootstrap, compatibility, verification, or publication has already succeeded. Source-stated technical context remains attributed to S-spec and is not independently validated here. R-updates records the user's adopted rationale from S-release-model, not a new product requirement.

The [technical architecture](2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) describes current harness realization choices under the existing Allocation. It is a derived projection, not a substantive source for this product Capture or evidence that product acceptance and publication have succeeded.

## Material constraints and lifecycle boundaries

### C-purpose — Responsibility and runtime boundary

Source: [S-spec, responsibility and boundaries](../../SPEC.md#responsibility-and-boundaries).

The project MUST build and publish the canonical SQLite browser/WASM distribution with an official stable `sqlite-vec` release statically integrated, without functionally modifying either upstream.

Browser execution is the only supported runtime. Node.js runtime support, native binaries, and WASI distributions are out of scope; server consumers use `node:sqlite` with native `sqlite-vec`. Node.js may be used as build or test tooling.

### C-nonmodification — Added behavior and patch boundary

Source: [S-spec, responsibility and boundaries](../../SPEC.md#responsibility-and-boundaries).

The project MUST NOT add SQL abstractions, ORM functionality, application APIs, FluidJ behavior, or custom vector-search semantics. Integration and packaging glue are permitted only to build, initialize, locate, and expose upstream functionality. Upstream source patches are excluded; an unavoidable compatibility patch would require an explicit contract revision identifying its necessity and isolation.

### C-inputs — Source authority, integrity, acquisition, and reproduction

Source: [S-spec, inputs and reproduction](../../SPEC.md#inputs-and-reproduction).

- SQLite and `sqlite-vec` inputs MUST come from their official upstreams and identify exact released versions. Stable means released, non-draft, non-prerelease versions; alpha, beta, release-candidate, and development snapshots are excluded, including prereleases displayed by current documentation.
- Every downloaded source input MUST have a cryptographic digest recorded in the repository state being verified and checked before use. A mismatch MUST fail the build; fetching a checksum alongside changed bytes MUST NOT silently authorize them. Official release archives SHOULD be preferred when sufficient.
- Upstream source trees and generated SQLite JavaScript/WASM artifacts MUST NOT be committed. Source acquisition MUST NOT require submodules or recursive mirroring unless an upstream constraint demonstrably requires them.
- From a clean checkout and documented prerequisites, the project MUST obtain and verify the pinned inputs, build, verify, and package the distribution without unpublished files, pre-existing outputs, or necessary caches. Build-defining toolchain/dependency versions and options MUST be pinned and recorded sufficiently to repeat that process. Reproduction means the same defined functionality and package contents; byte-identical rebuilds are not required.

### R-inputs — Source-stated build context

Source: [S-spec, inputs and reproduction](../../SPEC.md#inputs-and-reproduction).

The supported canonical SQLite build currently needs the full SQLite source tree, rather than only its amalgamation. Temporary acquisition satisfies the no-vendoring boundary. SQLite core, WASM support, and JavaScript bindings MUST originate from the same SQLite release. Official `sqlite-vec` amalgamation releases provide its C source and generated header without requiring its source repository or vendored SQLite copy.

### C-browser — Retained browser baseline

Source: [S-spec, distribution contract](../../SPEC.md#distribution-contract).

The baseline is the pinned SQLite release's canonical default browser/WASM distribution, excluding demos, benchmarks, test applications, and optional experimental build variants.

The package MUST preserve that baseline's documented browser APIs, loading modes, SQL behavior, and default capabilities, adding only upstream `sqlite-vec` functionality. This includes conventional JavaScript and ES module initialization, C-style and OO1 APIs, BigInt support, Worker1 and its promise interface, FTS5, and the default persistence VFSes, including OPFS. Associated loaders, workers, proxies, and WASM assets MUST be distributed with working asset resolution. Upstream bundler variants MUST remain accessible where supplied; compatibility with every bundler is not promised.

### C-static — Per-connection extension availability

Source: [S-spec, distribution contract](../../SPEC.md#distribution-contract).

`sqlite-vec` MUST be compiled and automatically registered through SQLite's supported WASM static-extension initialization mechanism, making its SQL functionality available on every newly opened connection. Consumers MUST NOT load an extension dynamically or register it themselves. Upstream extension semantics MUST be preserved.

### C-storage — Conditional browser and persistence availability

Source: [S-spec, distribution contract](../../SPEC.md#distribution-contract).

Browser and storage availability remain subject to the pinned upstream's prerequisites and limitations. The project MUST document required Worker contexts, secure hosting, and VFS-specific isolation/header requirements; it MUST NOT promise OPFS on the main thread or silently substitute transient storage when persistence was requested.

### C-release — Version, revision, payload, and distribution identity

Source: [S-spec, distribution contract](../../SPEC.md#distribution-contract).

The distribution MUST be consumable through npm and as downloadable GitHub Release assets without a consumer-side native/WASM compilation step. Every published project version MUST correspond to one authoritative source revision, one Git tag, one GitHub Release, and one npm publication. Both publication channels MUST use the same project version, derive from that verified revision, contain the same verified runtime payload, and identify the included SQLite WASM and `sqlite-vec` versions. Every release MUST identify upstream and output digests and build environment/options, and preserve required upstream licensing notices. Automatically derived concise version information is sufficient; manually maintained narrative release notes are not required.

Publication MUST be supported by acceptance evidence applicable to the authoritative source revision actually being released and to the exact payload being published. A PR-head verification result MUST NOT be treated as sufficient merely because the PR was later merged if differences in the resulting authoritative revision or payload are not covered by that evidence.

### C-verification — Required evidence and test conditions

Source: [S-spec, acceptance gates](../../SPEC.md#acceptance-gates).

CI MUST demonstrate the complete clean-checkout production path. Browser acceptance tests MUST consume the final packaged assets, rather than a separate development build, and establish:

- Successful initialization and SQL execution on the main thread and in a browser Worker; reported SQLite and `vec_version()` values match the pinned inputs, including on independently opened connections.
- FTS5 table creation, insertion, and a query returning expected matches.
- `vec0` creation, insertion, and nearest-neighbor queries returning expected identifiers and distances for deterministic fixtures.
- Binary `bit` vectors and Hamming nearest-neighbor search with independently known distances and ordering; fixtures MUST avoid ambiguous ties.
- Worker1 and its promise interface can open, execute SQL using `sqlite-vec`, return results, and close.
- For each default OPFS VFS retained from the baseline, committed ordinary and vector data survive write, close, runtime/Worker termination, fresh initialization, reopen, and query under the same origin. Reopened vector search MUST return the expected results.

At least one real browser satisfying the relevant upstream prerequisites MUST execute every mandatory gate; unavailable OPFS MUST NOT count as a pass or silently skip the persistence gate. Verification results MUST record browser versions and hosting conditions. Public API/loading-surface and default-capability checks against the pinned baseline MUST detect accidental omissions.

### C-autonomy — Manually initiated candidate and human adoption lifecycle

Source: [S-spec, updates and publication](../../SPEC.md#updates-and-publication).

Upstream release awareness is external to the repository, for example through GitHub release notifications watched by a human. The repository MUST NOT monitor upstream releases or contain scheduled polling, autonomous adoption, automatic merge, heartbeat activity, or notification/bookkeeping machinery used solely to sustain zero-human-touch upstream adoption.

A human decides when to evaluate an upstream release and manually triggers candidate preparation through `workflow_dispatch`. That workflow MUST accept explicit upstream versions or resolve stable versions at invocation, retrieve and verify the corresponding official sources, prepare repository changes containing pins and integrity data, build and package the distribution, run all mandatory build, compatibility, packaging, integrity, and acceptance checks, and create or update a candidate PR targeting the authoritative branch, normally `main`. Candidate selection MUST NOT depend on continuous polling history or processing every intervening upstream release. The workflow MUST stop at the qualified candidate PR after all mandatory checks have passed; it MUST NOT merge, enable automatic merge, tag a release, or publish. All mandatory gates MUST pass before integration, and the merge decision MUST remain human.

Merging the approved candidate into the authoritative branch MUST automatically trigger Git tagging and GitHub Release publication, and npm publication except where the bounded initial npm-publication exception below applies. Tagging and publication MUST derive from the resulting authoritative source revision verified against the complete contract, using the exact verified payload. Candidate preparation and post-merge publication are separate workflow responsibilities; passing candidate checks does not authorize adoption or publication before the human-approved merge.

### R-updates — Mechanical automation and authority boundary

Source: S-release-model, the user's validated upstream-release-model correction.

Periodic repository polling and zero-human-touch adoption offer insufficient marginal value for their complexity and are excluded from the adopted design. External notifications support human awareness; the human initiates evaluation and retains merge authority. Automation performs candidate preparation and mandatory checks and post-merge publication. Fully autonomous adoption is not selected, rather than technically refuted. Reconsidering it would require an explicit product decision demonstrating sufficient value to change this complexity and authority trade-off; missed notifications alone do not require it because candidate selection is independent of sequential release processing.

### C-failure — Failed update and intervention boundary

Source: [S-spec, updates and publication](../../SPEC.md#updates-and-publication).

Automation MUST fail closed: failure of any mandatory build, compatibility, packaging, integrity, or acceptance requirement MUST stop the candidate before it is eligible for merge, before successful integration, and before release tagging, GitHub Release publication, or npm publication. Human approval does not waive mandatory gates. Automatic repair of upstream incompatibilities is not required; the upstream non-modification boundary continues to apply.

### C-bootstrap — Publication setup exception and publication mechanisms

Source: [S-spec, updates and publication](../../SPEC.md#updates-and-publication).

Initial repository/registry bootstrap MAY include the minimum unavoidable manual registry configuration and first npm publication needed to establish trusted publishing. This bounded initial publication-setup exception MAY override the normal automatic post-merge npm-publication requirement only for the minimum unavoidable first-publication/bootstrap case. It MUST NOT waive mandatory verification, weaken source/revision/payload identity requirements, provide a recurring manual release path, or alter recurring human candidate initiation or merge authority. After bootstrap is established, the normal automatic post-merge tagging, GitHub Release publication, and npm publication rule applies without this exception. Steady-state publication MUST use npm trusted publishing and verifiable build provenance/asset attestations where supported by the chosen publishing environment; any unsupported mechanism and fallback MUST be explicit. Persistent npm publishing credentials MUST NOT be the normal mechanism where trusted publishing provides secretless publication.

### C-obsolescence — End of project responsibility

Source: [S-spec, updates and publication](../../SPEC.md#updates-and-publication).

The project is obsolete when SQLite or `sqlite-vec` upstream publishes and maintains an equivalent distribution satisfying this browser, API, vector, and persistence contract. A demonstration package alone does not meet that condition.

## Material relationships

C-inputs governs the inputs and reproduction whose complete production path C-verification requires CI to demonstrate. C-browser, C-static, and C-storage define the retained behavior exercised by C-verification; storage availability remains conditional on the upstream prerequisites, but unavailable OPFS cannot satisfy its mandatory acceptance gate.

C-autonomy separates external awareness and human initiation, mandatory candidate checks ending at a PR, human merge authority, and automatic post-merge tagging/publication. R-updates explains this boundary without treating passing checks as adoption authority. C-release binds revision, version and payload across both channels and requires acceptance evidence applicable to the authoritative revision and exact payload actually released; merge alone cannot establish applicability of PR-head evidence. C-failure blocks candidate eligibility, integration and publication on failed mandatory gates; human approval cannot waive them. C-bootstrap may override only automatic npm publication for the minimum unavoidable initial setup/first-publication case, without waiving verification or identity requirements, creating a recurring manual release path, or changing recurring human initiation/merge authority. After bootstrap, the normal automatic post-merge publication rule applies without that exception; C-nonmodification continues to constrain intervention. These are lifecycle invariants, not claims of current readiness for a forthcoming commitment.

## Material sources

**S-spec** — [root SPEC.md](../../SPEC.md), the user-designated authoritative project specification. Its current requirements govern this projection; prior assistant receipts and this Capture are not corroboration. Snapshot SHA-256: `40d0cf9e9de1a70c95f6648cdbfa57ecd7c067c2c334344347ad6fc20f404eb4`.

**S-release-model** — User mission for `at-rama/sqlite-vec-wasm`, submitted 2026-10-04 in the sqlite-vec-wasm project conversation, beginning “Correct the repository design to replace the previously specified autonomous upstream detection and release model”. The explicit validated decision and execution requirement 4 supply the adopted mechanical-automation/human-authority boundary and insufficient-marginal-value rationale in R-updates. Product obligations are now expressed in S-spec; this primary user instruction and the updated specification are related sources, not independent corroboration.

**S-doc-model** — User mission for PR #8 in `at-rama/sqlite-vec-wasm`, submitted 2026-10-04 in the same project conversation, beginning “Amend the existing PR to complete the strict inter-document coherence correction discovered during review”. The validated decision removes a premature standalone README checklist without replacing it with a generic documentation obligation. Documentation remains attached to substantive product concerns and emerges with their concrete surfaces; C-storage, C-inputs, C-release, and C-verification retain their existing prerequisites and record requirements. The existing editorial standard governs README presentation. S-spec expresses the resulting product requirements; this primary user instruction and S-spec are related sources, not independent corroboration.

The specification's [upstream references](../../SPEC.md#upstream-references) remain retrievable through S-spec; their contents are not additional acquired evidence for this Capture. S-spec states: references explain upstream mechanisms; moving documentation does not change its requirements, and version-specific behavior is evaluated against pinned releases.
