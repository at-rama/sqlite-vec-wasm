# Distribution Capture

## Purpose, scope, and authority

Purpose: retain the reconciled design of the canonical `sqlite-vector-wasm` distribution for later reasoning and allocation. Scope: the product decisions recorded in S-spec and the user's validated rationale in S-release-model, S-doc-model, and S-watch-model, with the scoped identity, versioning and engine-selection revision in S-product-design. This Capture is a non-authoritative working projection; it neither institutes decisions nor proves implementation, acceptance, or publication.

The user mission of 2026-10-08, “Mission Work — Réconcilier le design 42p et intégrer A-Site”, explicitly preserves the existing product design while replacing the live root specification with distinct Captures and a global Allocation. Decisions and instituted sources ground the design; Captures retain reconciled working projections; Allocation organizes responsibility coverage; OpenSpec contractualizes realization. This migration changes representation and provenance, not the requirements retained below. S-spec is the immutable historical contract source, not a live file that this Capture must regenerate. Prior assistant projections and receipts are not independent sources or decision authority.

All normative modalities below preserve S-spec's requirements, permissions, preferences, and exceptions except within S-product-design's explicit revision scope. MUST denotes a requirement; SHOULD denotes a preference whose departure needs a concrete justification. Source-stated technical context remains attributed to S-spec and is not independently validated here. R-updates records the user's adopted rationale from S-release-model as revised by S-watch-model, not a new product requirement. An explicit contract revision means a revision instituted by the competent decision authority; it does not require a living root `SPEC.md`. The root specification has been removed; its immutable history remains available through S-spec.

The [technical architecture](2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) describes current harness realization choices under the existing Allocation. It is a derived projection, not a substantive source for this product Capture or evidence that product acceptance and publication have succeeded.

## Material constraints and lifecycle boundaries

### C-purpose — Responsibility and runtime boundary

Source: [S-spec, responsibility and boundaries](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#responsibility-and-boundaries).

The product is `sqlite-vector-wasm`. The project MUST build and publish the canonical SQLite browser/WASM distribution with exactly one selected vector-search engine statically integrated, without functionally modifying either upstream. S-product-design D1–D3 establishes the engine-independent product identity and retains `sqlite-vec` as the initial and only currently selected engine, using an official stable release and its native semantics. This introduces no multi-engine runtime, backend selection API, plugin interface or commitment to simultaneous engine support. All existing sqlite-vec-specific integration and acceptance obligations below remain applicable; the generalized name does not authorize their removal.

Browser execution is the only supported runtime. Node.js runtime support, native binaries, and WASI distributions are out of scope; server consumers use `node:sqlite` with native `sqlite-vec`. Node.js may be used as build or test tooling.

### C-nonmodification — Added behavior and patch boundary

Source: [S-spec, responsibility and boundaries](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#responsibility-and-boundaries).

The project MUST NOT add SQL abstractions, ORM functionality, application APIs, FluidJ behavior, or custom vector-search semantics. Integration and packaging glue are permitted only to build, initialize, locate, and expose upstream functionality. Upstream source patches are excluded; an unavoidable compatibility patch would require an explicit contract revision identifying its necessity and isolation.

### C-inputs — Source authority, integrity, acquisition, and reproduction

Source: [S-spec, inputs and reproduction](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#inputs-and-reproduction).

- SQLite and `sqlite-vec` inputs MUST come from their official upstreams and identify exact released versions. Stable means released, non-draft, non-prerelease versions; alpha, beta, release-candidate, and development snapshots are excluded, including prereleases displayed by current documentation.
- Every downloaded source input MUST have a cryptographic digest recorded in the repository state being verified and checked before use. A mismatch MUST fail the build; fetching a checksum alongside changed bytes MUST NOT silently authorize them. Official release archives SHOULD be preferred when sufficient.
- Upstream source trees and generated SQLite JavaScript/WASM artifacts MUST NOT be committed. Source acquisition MUST NOT require submodules or recursive mirroring unless an upstream constraint demonstrably requires them.
- From a clean checkout and documented prerequisites, the project MUST obtain and verify the pinned inputs, build, verify, and package the distribution without unpublished files, pre-existing outputs, or necessary caches. Build-defining toolchain/dependency versions and options MUST be pinned and recorded sufficiently to repeat that process. Reproduction means the same defined functionality and package contents; byte-identical rebuilds are not required.

### R-inputs — Source-stated build context

Source: [S-spec, inputs and reproduction](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#inputs-and-reproduction).

The supported canonical SQLite build currently needs the full SQLite source tree, rather than only its amalgamation. Temporary acquisition satisfies the no-vendoring boundary. SQLite core, WASM support, and JavaScript bindings MUST originate from the same SQLite release. Official `sqlite-vec` amalgamation releases provide its C source and generated header without requiring its source repository or vendored SQLite copy.

### C-browser — Retained browser baseline

Source: [S-spec, distribution contract](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#distribution-contract).

The baseline is the pinned SQLite release's canonical default browser/WASM distribution, excluding demos, benchmarks, test applications, and optional experimental build variants.

The package MUST preserve that baseline's documented browser APIs, loading modes, SQL behavior, and default capabilities, adding only upstream `sqlite-vec` functionality. This includes conventional JavaScript and ES module initialization, C-style and OO1 APIs, BigInt support, Worker1 and its promise interface, FTS5, and the default persistence VFSes, including OPFS. Associated loaders, workers, proxies, and WASM assets MUST be distributed with working asset resolution. Upstream bundler variants MUST remain accessible where supplied; compatibility with every bundler is not promised.

### C-static — Per-connection extension availability

Source: [S-spec, distribution contract](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#distribution-contract).

`sqlite-vec` MUST be compiled and automatically registered through SQLite's supported WASM static-extension initialization mechanism, making its SQL functionality available on every newly opened connection. Consumers MUST NOT load an extension dynamically or register it themselves. Upstream extension semantics MUST be preserved.

### C-storage — Conditional browser and persistence availability

Source: [S-spec, distribution contract](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#distribution-contract).

Browser and storage availability remain subject to the pinned upstream's prerequisites and limitations. The project MUST document required Worker contexts, secure hosting, and VFS-specific isolation/header requirements; it MUST NOT promise OPFS on the main thread or silently substitute transient storage when persistence was requested.

### C-release — Version, revision, payload, and distribution identity

Source: [S-spec, distribution contract](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#distribution-contract).

S-product-design D4–D5 revises product version identity: `sqlite-vector-wasm` MUST use its own full `MAJOR.MINOR.PATCH` Semantic Versioning, independently of SQLite and vector-engine versions. The former proposed `<SQLite.version>-<sqlite-vec.version>` composition MUST NOT be used as the product version or release tag: its hyphen denotes a prerelease of the first version, not independent product identity. Product versions can change without either upstream changing; an upstream update does not mechanically select an increment.

Before `1.0.0`, compatible corrections and independently validated compatible upstream updates normally use PATCH. The pre-1.0 convention is MINOR for additive or breaking public-contract evolution, with explicit justification of compatibility impact; a MAJOR transition establishes the stable contract or introduces a breaking change after it. Breaking changes MUST NOT be hidden in a PATCH. From `1.0.0`, conventional SemVer applies: MAJOR for breaking changes, MINOR for backward-compatible functionality and PATCH for backward-compatible corrections. Classification follows the observed public compatibility contract, not upstream update size or merely passing existing tests. A future engine replacement is neither automatically MAJOR nor automatically PATCH. `0.1.0` is the intended initial-version example, not an instituted release pin or evidence of publication.

The distribution MUST be consumable through npm and as downloadable GitHub Release assets without a consumer-side native/WASM compilation step. Every release MUST have one product name and independent product SemVer corresponding to one authoritative source revision, one Git tag, one GitHub Release, and one npm publication. Both publication channels MUST use the same project version, derive from that verified revision, contain the same verified runtime payload, and explicitly identify the included SQLite WASM version and selected vector engine and exact version (currently `sqlite-vec`). Every release MUST identify upstream and output digests and build environment/options, and preserve required upstream licensing notices. Automatically derived concise version information is sufficient; manually maintained narrative release notes are not required. Existing package metadata, release records and runtime manifest should carry these identities without competing manually synchronized version registries; no new file or schema is instituted here.

Publication MUST be supported by acceptance evidence applicable to the authoritative source revision actually being released and to the exact payload being published. A PR-head verification result MUST NOT be treated as sufficient merely because the PR was later merged if differences in the resulting authoritative revision or payload are not covered by that evidence.

### C-verification — Required evidence and test conditions

Source: [S-spec, acceptance gates](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#acceptance-gates).

CI MUST demonstrate the complete clean-checkout production path. Browser acceptance tests MUST consume the final packaged assets, rather than a separate development build, and establish:

- Successful initialization and SQL execution on the main thread and in a browser Worker; reported SQLite and `vec_version()` values match the pinned inputs, including on independently opened connections.
- FTS5 table creation, insertion, and a query returning expected matches.
- `vec0` creation, insertion, and nearest-neighbor queries returning expected identifiers and distances for deterministic fixtures.
- Binary `bit` vectors and Hamming nearest-neighbor search with independently known distances and ordering; fixtures MUST avoid ambiguous ties.
- Worker1 and its promise interface can open, execute SQL using `sqlite-vec`, return results, and close.
- For each default OPFS VFS retained from the baseline, committed ordinary and vector data survive write, close, runtime/Worker termination, fresh initialization, reopen, and query under the same origin. Reopened vector search MUST return the expected results.

At least one real browser satisfying the relevant upstream prerequisites MUST execute every mandatory gate; unavailable OPFS MUST NOT count as a pass or silently skip the persistence gate. Verification results MUST record browser versions and hosting conditions. Public API/loading-surface and default-capability checks against the pinned baseline MUST detect accidental omissions.

### C-watch — Upstream awareness and notification boundary

Source: S-watch-model; [S-spec, updates and publication](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#updates-and-publication).

The repository MUST monitor official stable releases of both SQLite and `sqlite-vec` through a daily scheduled GitHub Actions workflow. Stable classification remains as defined under inputs and reproduction. Detection MUST use official SQLite release publications and official `sqlite-vec` GitHub Releases, and signal stable versions newer than the corresponding currently integrated repository pins, without notifying the full historical release backlog on first execution.

Each signaled upstream/version pair MUST have one GitHub issue assigned to the maintenance owner, identifying the upstream, detected version, and official release source. Repeated detection MUST NOT create duplicates, including after issue closure. Closing an issue MAY mean that the version was evaluated and adoption declined; monitoring MUST NOT recreate or reopen it. The repository-controlled outcome is issue creation and assignment, not delivery of a mobile push notification, which depends on GitHub Mobile settings. Required push-notification settings MUST be documented with the monitoring mechanism.

Monitoring MUST stop at notification. It MUST NOT change source pins, initiate candidate preparation, merge, enable automatic merge, tag, or publish. Autonomous adoption and heartbeat or bookkeeping machinery used solely to sustain zero-human-touch adoption remain excluded.

### C-autonomy — Manually initiated candidate and human adoption lifecycle

Source: [S-spec, updates and publication](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#updates-and-publication).

C-watch owns automated upstream awareness. The decision to evaluate a version and initiate candidate preparation remains human. An issue may supply evaluation context but is neither an automatic trigger nor a prerequisite.

A human decides when to evaluate an upstream release and manually triggers candidate preparation through `workflow_dispatch`. That workflow MUST accept explicit upstream versions or resolve stable versions at invocation, retrieve and verify the corresponding official sources, prepare repository changes containing pins and integrity data, build and package the distribution, run all mandatory build, compatibility, packaging, integrity, and acceptance checks, and create or update a candidate PR targeting the authoritative branch, normally `main`. Candidate preparation MUST remain possible without a prior notification issue or complete monitoring history. Candidate selection MUST NOT depend on continuous polling history or processing every intervening upstream release. The workflow MUST stop at the qualified candidate PR after all mandatory checks have passed; it MUST NOT merge, enable automatic merge, tag a release, or publish. All mandatory gates MUST pass before integration, and the merge decision MUST remain human.

Merging the approved candidate into the authoritative branch MUST automatically trigger Git tagging and GitHub Release publication, and npm publication except where the bounded initial npm-publication exception below applies. Tagging and publication MUST derive from the resulting authoritative source revision verified against the complete contract, using the exact verified payload. Candidate preparation and post-merge publication are separate workflow responsibilities; passing candidate checks does not authorize adoption or publication before the human-approved merge.

### R-updates — Mechanical automation and authority boundary

Source: S-release-model, revised by the explicitly adopted S-watch-model.

The former design excluded repository polling because external release notifications were expected to supply sufficient awareness without additional maintenance machinery. That assumption covers sqlite-vec but not SQLite: SQLite uses Fossil as its primary repository and its official GitHub mirror publishes no GitHub Releases. S-watch-model revises the awareness boundary to daily repository monitoring for both upstreams, ending at an assigned issue. Human initiation, mandatory candidate checks, human merge authority, and post-merge publication retain their distinct roles.

Monitoring stays in sqlite-vector-wasm because its alerts directly serve this project's maintenance; a separate watch repository would add another place to maintain and is not selected. One issue per upstream/version retains an explicit evaluation disposition; a cumulative issue is not selected. Signaling versions newer than the current pins targets actionable maintenance rather than an exhaustive release archive. These alternatives are not technically refuted. Fully autonomous adoption remains unselected for its complexity/value and authority trade-off; missing notifications do not require it because candidate preparation remains independent of monitoring history and sequential release processing.

Source consultation, version comparison, and deduplication mechanisms remain realization choices for A-watch. No monitoring implementation or successful notification delivery is established by this Capture.

### C-failure — Failed update and intervention boundary

Source: [S-spec, updates and publication](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#updates-and-publication).

Automation MUST fail closed: failure of any mandatory build, compatibility, packaging, integrity, or acceptance requirement MUST stop the candidate before it is eligible for merge, before successful integration, and before release tagging, GitHub Release publication, or npm publication. Human approval does not waive mandatory gates. Automatic repair of upstream incompatibilities is not required; the upstream non-modification boundary continues to apply.

### C-bootstrap — Publication setup exception and publication mechanisms

Source: [S-spec, updates and publication](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#updates-and-publication).

Initial repository/registry bootstrap MAY include the minimum unavoidable manual registry configuration and first npm publication needed to establish trusted publishing. This bounded initial publication-setup exception MAY override the normal automatic post-merge npm-publication requirement only for the minimum unavoidable first-publication/bootstrap case. It MUST NOT waive mandatory verification, weaken source/revision/payload identity requirements, provide a recurring manual release path, or alter recurring human candidate initiation or merge authority. After bootstrap is established, the normal automatic post-merge tagging, GitHub Release publication, and npm publication rule applies without this exception. Steady-state publication MUST use npm trusted publishing and verifiable build provenance/asset attestations where supported by the chosen publishing environment; any unsupported mechanism and fallback MUST be explicit. Persistent npm publishing credentials MUST NOT be the normal mechanism where trusted publishing provides secretless publication.

### C-obsolescence — End of project responsibility

Source: [S-spec, updates and publication](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#updates-and-publication).

The project is obsolete when SQLite or the selected vector-engine upstream publishes and maintains an equivalent distribution satisfying this browser, API, vector, and persistence contract. A demonstration package alone does not meet that condition. S-product-design D3 retains upstream-maintained equivalence as a reconsideration signal; a signal is not itself evidence that equivalence exists or authority to replace the engine or retire the project.

### R-engine — Selected engine, trade-offs and reconsideration

Source: S-product-design D1–D3 and D6; existing C-browser, C-static and C-verification obligations.

sqlite-vec is selected for native Float32 vectors, native binary bit vectors and Hamming search, browser/WASM static integration, preservation of SQLite's browser API/capabilities, and a small integration footprint without unnecessary runtime abstractions. These user-validated selection reasons do not replace the existing deterministic vec0, real-browser and persistence requirements. Retaining sqlite-vec keeps its native SQL/API behavior and integration architecture, while depending on its upstream maintenance, security and compatibility. The product name no longer makes that component choice permanent.

Reconsideration is justified by sustained maintenance concerns supported by observable evidence, an unresolved security or compatibility problem, incompatibility with the supported SQLite browser/WASM distribution, an alternative with materially better maintainability, reliability or technical properties, or an upstream-maintained equivalent distribution that may make this project redundant. An arbitrary period without releases is not an automatic migration threshold. These are evaluation signals, not evidence authorizing replacement. No abandonment claim is established here.

`vec1` remains a relevant unselected alternative, not a proven admissible replacement. Its actual capabilities and browser/WASM compatibility must be independently verified. Any replacement must demonstrate preservation of the applicable functional and distribution contract, including binary vectors and Hamming distance; retaining the product name alone proves none of that. A technical replacement proposal and the human decision authorizing it remain distinct. Human adoption, source integrity, upstream nonmodification, acceptance, release evidence and publication gates remain in force. No abstraction code or future replacement allocation is instituted by this selection rationale.

## Material relationships

C-purpose and R-engine distinguish the revisable selected component from stable product obligations and future human-authorized replacement. C-release classifies product compatibility independently of exact upstream composition; changing the engine is not an automatic version increment rule. C-inputs governs the inputs and reproduction whose complete production path C-verification requires CI to demonstrate. C-browser, C-static, and C-storage define the retained behavior exercised by C-verification; storage availability remains conditional on the upstream prerequisites, but unavailable OPFS cannot satisfy its mandatory acceptance gate.

C-watch separates automated awareness ending at an assigned issue from C-autonomy's human initiation, mandatory candidate checks ending at a PR, human merge authority, and automatic post-merge tagging/publication. R-updates explains this boundary without treating passing checks as adoption authority. C-release binds revision, version and payload across both channels and requires acceptance evidence applicable to the authoritative revision and exact payload actually released; merge alone cannot establish applicability of PR-head evidence. C-failure blocks candidate eligibility, integration and publication on failed mandatory gates; human approval cannot waive them. C-bootstrap may override only automatic npm publication for the minimum unavoidable initial setup/first-publication case, without waiving verification or identity requirements, creating a recurring manual release path, or changing recurring human initiation/merge authority. After bootstrap, the normal automatic post-merge publication rule applies without that exception; C-nonmodification continues to constrain intervention. These are lifecycle invariants, not claims of current readiness for a forthcoming commitment.

## Material sources

**S-product-design** — Primary user instruction dated 2026-10-09 in the sqlite-vec-wasm project conversation, titled “Mission — Rename, independent SemVer and vector-engine rationale”, section 2, validated decisions D1–D6. It explicitly authorizes the `sqlite-vector-wasm` identity, initial sqlite-vec selection and reconsideration rationale, independent full product SemVer with an explicit pre-1.0 convention, exact release composition and preservation of existing obligations. It supersedes earlier orientations only within that scope. No public conversation permalink is available; this source is identified by date, title and decision locators, not reconstructed from prior assistant output or treated as independently corroborated by this Capture.

**S-spec** — [historical SPEC.md](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md), the user-designated product contract as last changed by commit `d463c4034604d6593cf45bbf5a523598dd3f53cc` and present unchanged at the migration baseline `87f7d0c0fc7e721c018461d77405d176ec84104a`. SHA-256: `23c94ad50be9559a5846b083996d46bc12607a73473d5272726d0faae4c6acb1`. Its historical authority and the decisions it records are preserved; the 2026-10-08 user mission authorizes retaining that design without a live root specification. This immutable source predates the reconciled Capture and does not derive its authority from it. Copies, related user decisions, and this projection are not independent corroboration.

**S-release-model** — User mission for `at-rama/sqlite-vec-wasm`, submitted 2026-10-04 in the sqlite-vec-wasm project conversation, beginning “Correct the repository design to replace the previously specified autonomous upstream detection and release model”. The explicit validated decision and execution requirement 4 supply the mechanical-automation/human-authority boundary and original complexity/value rationale in R-updates. S-watch-model revises only the awareness and polling exclusion; this source remains relevant to the retained human authority boundary. Product obligations were materialized in S-spec; this primary user instruction and the updated specification are related sources, not independent corroboration.

**S-doc-model** — User mission for PR #8 in `at-rama/sqlite-vec-wasm`, submitted 2026-10-04 in the same project conversation, beginning “Amend the existing PR to complete the strict inter-document coherence correction discovered during review”. The validated decision removes a premature standalone README checklist without replacing it with a generic documentation obligation. Documentation remains attached to substantive product concerns and emerges with their concrete surfaces; C-storage, C-inputs, C-release, and C-verification retain their existing prerequisites and record requirements. The existing editorial standard governs README presentation. S-spec expresses the resulting product requirements; this primary user instruction and S-spec are related sources, not independent corroboration.

**S-watch-model** — User decisions in the sqlite-vec-wasm project conversation on 2026-10-07: adoption of the common notification mechanism for both upstreams; validation of the exploration and the newer-than-pins orientation; confirmation that the operational order is reconciled Capture then materialization in the Specification; and the instruction beginning “Ouvre une PR et applique l'évolution présentée en détail dans le message précédent”. That instruction explicitly designates the preceding assistant-authored consolidation, “Objet : évolution du design de sqlite-vec-wasm — surveillance des versions upstream”, as the revision input. The consolidation is a designated derived source, not independent corroboration; the user decisions establish adoption. The discovery motivating the revision is retrievable from the [official SQLite mirror](https://github.com/sqlite/sqlite), its [empty GitHub Releases page](https://github.com/sqlite/sqlite/releases), and the [official release timeline](https://sqlite.org/src/timeline?t=release). The adopted revision was materialized in S-spec; neither this Capture nor its operational receipt supplies independent evidence.

The specification's [upstream references](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md#upstream-references) remain retrievable through S-spec; their contents are not additional acquired evidence for this Capture. S-spec states: references explain upstream mechanisms; moving documentation does not change its requirements, and version-specific behavior is evaluated against pinned releases.
