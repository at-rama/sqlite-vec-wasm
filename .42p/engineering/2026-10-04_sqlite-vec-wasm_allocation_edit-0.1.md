# Capture-derived Allocation

## Identity, source, and authority

Direct input: [the current Capture](2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md), as present in repository revision `1fe626e98e9a5f85d9d360e2968f0f6dc622dee1`. Capture handles below retain their existing identity. [spec.md](../../spec.md) remains the ultimate authority through S-spec; this Allocation is a derived responsibility model, not a new contract or evidence of implementation progress.

An allocation surface denotes a responsibility boundary, not a prescribed file, workflow, library, API, or architectural component. The modalities, exclusions, conditions, and exceptions attributed to the Capture retain their force. Evidence described below identifies what later Verification must connect to that responsibility; it is not a separate Verification model.

S-spec's upstream references explain mechanisms rather than adding acquired evidence. Moving documentation does not change the contract; version-specific behavior is evaluated against pinned releases.

## Allocation units

### A-inputs — Upstream selection and acquisition

**Capture:** C-inputs, R-inputs, C-purpose. **Surface:** upstream input identities and acquisition, including repository-recorded source pins and digests.

Own the use of official inputs with exact released versions: non-draft, non-prerelease stable releases only, excluding alpha, beta, release candidates, and development snapshots even when documentation displays them. Verify every downloaded source input against its cryptographic digest recorded in the repository state being verified, before use; mismatches fail the build, and fetching a checksum alongside changed bytes cannot silently authorize them. Official release archives remain a SHOULD preference when sufficient. No upstream source trees are committed; submodules or recursive mirroring require a demonstrated upstream constraint.

R-inputs supplies acquisition context: the canonical build currently needs the full SQLite source tree; temporary acquisition satisfies the no-vendoring boundary. Official sqlite-vec amalgamations provide C and the generated header without needing its repository or vendored SQLite copy. This context does not manufacture a separate acquisition task. Its same-SQLite-release MUST is owned by A-build.

**Composition:** candidate pin/digest changes originate in A-updates; verified inputs feed A-build. **Evidence target:** input origins, release classifications, pins/digests, acquisition/integrity outcomes, and absence of committed upstream trees.

### A-build — Canonical browser build and static integration

**Capture:** C-purpose, C-nonmodification, C-inputs, R-inputs, C-browser, C-static, C-storage. **Surface:** build configuration/toolchain and upstream integration output.

Own the canonical browser/WASM build with stable sqlite-vec statically compiled and automatically registered through SQLite's supported mechanism on every new connection. Consumers neither dynamically load nor register the extension. SQLite core, WASM support, and JavaScript bindings MUST come from the same SQLite release, preserving the normative content in R-inputs.

Preserve the pinned canonical default browser baseline: conventional JavaScript and ESM initialization, documented C-style and OO1 APIs, BigInt, Worker1 and its promise interface, FTS5, and default persistence VFSes including OPFS. Preserve upstream SQL and extension semantics and upstream browser/storage prerequisites and limitations. Browser execution alone is supported; Node.js runtime, native binaries, and WASI distributions are excluded, while Node.js tooling remains permitted. Server use of node:sqlite with native sqlite-vec is outside this project's runtime responsibility.

Build-defining toolchain/dependency versions and options are pinned and recorded. No functional upstream modification, SQL abstraction, ORM, application API, FluidJ behavior, or custom vector semantics is added. Glue is limited to building, initializing, locating, and exposing upstream functionality. Source patches remain excluded; any unavoidable patch requires an explicit contract revision identifying necessity and isolation.

**Composition:** consumes A-inputs and supplies A-package; A-acceptance checks the retained behavior. **Evidence target:** build environment/options, common SQLite release identity, integration/configuration boundaries, and resulting baseline capabilities and extension registration.

### A-package — Consumer-ready verified payload

**Capture:** C-purpose, C-nonmodification, C-inputs, C-browser, C-storage, C-release. **Surface:** distributable package contents and asset resolution, plus repository exclusion of generated artifacts.

Own the complete browser runtime payload from A-build, including required loaders, workers, proxies, and WASM assets with working asset resolution. Upstream bundler variants remain accessible where supplied without promising every bundler's compatibility. The baseline excludes demos, benchmarks, test applications, and optional experimental build variants. Consumers require no native/WASM compilation step. Generated SQLite JavaScript/WASM artifacts are not committed.

Packaging must preserve A-build's behavior and allowed glue boundary, including no silent transient-storage substitution for requested persistence. Include required upstream licensing notices. A-release owns the shared version/revision/publication identity; A-package supplies the runtime payload and output digests to which that identity attaches.

**Composition:** consumes A-build; supplies the final assets to A-acceptance and the exact verified payload to A-release. **Evidence target:** distributable contents, asset resolution, output digests, notices, and repository artifact exclusions.

### A-acceptance — Production and browser acceptance gates

**Capture:** C-inputs, C-browser, C-static, C-storage, C-verification. **Surface:** CI production verification and browser acceptance evidence for the final packaged assets.

Own CI proof of the full clean-checkout acquisition, integrity verification, build, verification, and packaging path using documented prerequisites, without unpublished files, pre-existing outputs, or necessary caches. Reproduction covers defined functionality and package contents; byte-identical rebuilds are not required.

Own the acceptance obligations already captured in C-verification:

- Main-thread and Worker initialization/SQL execution, with SQLite and vec_version() matching pins, including independently opened connections.
- FTS5 creation, insertion, and expected query matches.
- vec0 creation, insertion, and deterministic nearest-neighbor identifiers and distances.
- Binary bit vectors and Hamming nearest-neighbor distances/order independently known, with no ambiguous fixture ties.
- Worker1 and its promise interface opening, executing sqlite-vec SQL, returning results, and closing.
- Every retained default OPFS VFS preserving committed ordinary/vector data through write, close, runtime/Worker termination, fresh initialization, reopen, and query under the same origin, including expected reopened vector-search results.

Tests consume final packaged assets, not a separate development build. Every mandatory gate executes in at least one real browser meeting relevant upstream prerequisites; unavailable OPFS is neither a pass nor grounds for silently skipping persistence. Results record browser versions and hosting conditions. Public API/loading-surface and default-capability checks against the pinned baseline detect accidental omissions.

**Composition:** gathers the complete production outcomes from A-inputs, A-build, and A-package; gate results constrain A-updates and A-release. **Evidence target:** the recorded clean-checkout and packaged-browser results required above, tied to their evaluated repository state/payload. No additional test obligation is introduced here.

### A-updates — Autonomous proposed update and integration

**Capture:** C-inputs, C-autonomy, C-failure, C-nonmodification. **Surface:** stable upstream detection, candidate repository changes, and authoritative integration control.

Own scheduled detection of both upstreams' compatible stable releases and proposed updates containing pins/integrity data. After bootstrap, these updates proceed through full build/verification and authoritative branch integration with zero human intervention. Reviewability/auditability is permitted, not mandatory human review or approval. All mandatory gates pass before integration.

A failed mandatory build, compatibility, packaging, integrity, or acceptance requirement stops the candidate before successful integration. Automatic upstream incompatibility repair is not required. Intervention after bootstrap is reserved for project evolution when the existing contract cannot be satisfied automatically; it does not relax the patch prohibition or authorize a new design decision here.

**Composition:** supplies candidates to A-inputs and requires complete A-acceptance outcomes before integration. The resulting authoritative revision feeds A-release and must satisfy the complete verification contract. **Evidence target:** detection/candidate/integration records showing successful autonomous progression or the captured failure stop.

### A-release — Synchronized tagging and publication

**Capture:** C-purpose, C-release, C-autonomy, C-failure, C-bootstrap. **Surface:** Git tag, GitHub Release assets/record, npm publication, and publication provenance.

Own the post-integration sequence of tagging, GitHub Release, and npm publication without human intervention in steady state, making the distribution consumable through npm and downloadable GitHub Release assets. Every published version corresponds to one authoritative source revision, one tag, one GitHub Release, and one npm publication. Both channels use the same project version, derive from the same verified revision, represent the exact same verified runtime payload, and identify SQLite WASM/sqlite-vec versions. Release records identify upstream/output digests and build environment/options; automatically derived concise version information suffices without mandatory narrative release notes.

Any mandatory gate failure prevents the corresponding release tag, GitHub Release, and npm version. Steady-state publication uses npm trusted publishing and verifiable build provenance/asset attestations where supported by the chosen environment; unsupported mechanisms/fallbacks are explicit. Persistent npm credentials cannot be the normal mechanism where trusted publishing provides secretless publication.

**Composition:** consumes A-package's exact verified payload, A-acceptance results, A-updates' authoritative revision, and the publishing relationship established under A-bootstrap. Bootstrap does not waive this unit's verification or synchronized release obligations. **Evidence target:** tag/revision/version identity, both channel payloads and metadata, publication gate outcomes, authentication mechanism, and supported provenance/attestations.

### A-bootstrap — Initial publishing relationship

**Capture:** C-bootstrap, C-autonomy. **Surface:** initial repository/registry bootstrap and establishment of npm trusted publishing.

Own the permitted one-time exception: minimum unavoidable manual registry configuration and first npm publication needed to establish trusted publishing MAY occur during initial bootstrap. This is the only manual exception in the normal release lifecycle, with no waiver of verification or synchronized publication. It supplies the relationship A-release uses for steady-state autonomy; it does not authorize recurring manual release steps or specify a bootstrap procedure.

**Composition:** the first publication remains constrained by A-acceptance and A-release; established configuration supports A-release's subsequent autonomous publications. **Evidence target:** initial-versus-steady-state publishing configuration and the bounded exception, if exercised.

### A-docs — Minimal consumer and maintainer documentation

**Capture:** C-docs, C-storage, C-inputs. **Surface:** the required concise README and only concretely necessary additional documentation/governance.

Own explicit README coverage of responsibility/exclusions, concrete consumption and asset-hosting examples, included upstream versions, reproduction prerequisites/commands, the maintainer bootstrap boundary, autonomous steady-state lifecycle, and failed-verification publication blocking. Document required Worker contexts, secure hosting, and VFS-specific isolation/header requirements without promising main-thread OPFS. Additional documentation/governance SHOULD exist only for a concrete need; separate license notices may be necessary, with distributed notices owned by A-package.

**Composition:** describes the consumption/reproduction surfaces of A-inputs/A-build/A-package and the lifecycle of A-updates/A-release/A-bootstrap. **Evidence target:** documentation coverage and consistency with those surfaces, without a required maintenance manual or new implementation feature.

### A-lifecycle — Obsolescence boundary

**Capture:** C-obsolescence. **Surface:** project lifecycle/maintenance state.

Own the condition under which the project is considered obsolete: SQLite or sqlite-vec upstream publishes and maintains an equivalent distribution satisfying the browser, API, vector, and persistence contract. A demonstration package alone is insufficient. This allocates the lifecycle criterion, not new monitoring, retirement automation, or an unestablished shutdown/publication rule.

**Composition:** equivalence is judged against the retained contract represented by the other units. **Evidence target:** any later obsolescence determination and its grounding in the captured condition.

## Coverage accounting

Each material handle has one classification. Multiple units in a covered row jointly account for its content; context and obligations within a handle are distinguished rather than assigning the handle two classifications.

| Capture handle | Classification | Allocation / treatment |
| --- | --- | --- |
| C-purpose | Covered | A-inputs, A-build, A-package, A-release: official integrated browser distribution and publication boundary. |
| C-nonmodification | Covered | A-build, A-package, A-updates: allowed glue, exclusions, unchanged semantics, patch/revision and intervention boundary. |
| C-inputs | Covered | A-inputs, A-build, A-package, A-acceptance, A-updates, A-docs: origins/pins/digests, acquisition exclusions, toolchain pins, artifact exclusions, reproduction, proposed updates and prerequisites. |
| R-inputs | Covered | A-inputs retains source-stated acquisition context; A-build owns the embedded same-SQLite-release MUST. Context does not create separate work. |
| C-browser | Covered | A-build, A-package, A-acceptance: full retained baseline, assets/variants, exclusions and omission checks. |
| C-static | Covered | A-build, A-acceptance: supported static registration, every connection, unchanged extension semantics and availability evidence. |
| C-storage | Covered | A-build, A-package, A-acceptance, A-docs: upstream conditions, persistence preservation/no fallback, mandatory evidence and documented prerequisites. |
| C-release | Covered | A-package, A-release: consumer-ready payload/notices, identity across revision/tag/channels, versions, digests and environment/options. |
| C-verification | Covered | A-acceptance: all captured production/browser obligations, evidence conditions and omitted-capability detection. |
| C-autonomy | Covered | A-updates, A-release, A-bootstrap: candidate-to-integration-to-publication sequence, mandatory gates, no human approval and initial exception. |
| C-failure | Covered | A-updates, A-release: no successful integration/tag/channel publication on any mandatory failure; no required automatic repair; bounded intervention. |
| C-bootstrap | Covered | A-bootstrap, A-release: initial-only manual exception, no waived gates, trusted publishing/provenance and explicit unsupported fallbacks. |
| C-docs | Covered | A-docs: all README subjects and conditional additional-documentation preference. |
| C-obsolescence | Covered | A-lifecycle: exact equivalent-maintained-upstream condition and demo insufficiency. |
| S-spec | Non-allocatable | Provenance and ultimate-authority identity, retained through the unchanged Capture and source links; not implementation work or independent corroboration. |

**Capture coverage: 100% — 15/15 material handles examined; 14 covered, one non-allocatable, none unresolved or omitted.** All nine A- units cite explicit Capture handles. **Allocation grounding: 100% — 9/9 units grounded; no orphan units.**

Authority and epistemic distinctions outside the Capture handles are retained in this document's source boundary, and its material relationships are represented in unit composition. Lifecycle invariants are not reclassified as current readiness conditions. No explicit unresolved Capture issue prevents allocation; unspecified lower-level mechanisms remain open. Coverage certifies responsibility/grounding accounting, not successful implementation, technical compatibility, completed bootstrap, or passed production gates.
