# Global Capture-derived Allocation

## Identity, source, and authority

Direct inputs are the current Captures:

- [Distribution Capture](2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md), snapshot SHA-256 `5d63e5462f31ac994f02d57550ff2a4997d41eb022f4703c4ba37e2369fcf086`.
- [Site Capture](2026-10-08_sqlite-vec-wasm_site_capture_edit-0.1.md), snapshot SHA-256 `64e31e3e4b0afe0ca9e23bd13dda2f316f7421fcbb61538c5bef9c168a423894`.
- [Release/Watch Capture](2026-10-09_sqlite-vec-wasm_release-watch_capture_edit-0.1.md), snapshot SHA-256 `1086bbb58a5563c53f7e154809d76dcba5368854c8f7ab3717bb0df115b3cd82`.

Release/Watch input registration records its exact current snapshot only. Its designated source explicitly revises distribution versioning, admissible upstreams and watch/candidate behavior. Detailed reconciliation of affected units, compositions and coverage below remains pending; superseded descriptions are retained as the comparison state, not current obligations. The earlier Distribution/Site accounting below does not establish current completeness across all three inputs. The Release/Watch Capture's impact map identifies the affected responsibilities and retained boundaries; no new allocation unit or implementation status is instituted by this registration.

Their handles retain their identity within each Capture; references below identify the corresponding scope. Instituted decisions and sources ground the design. Captures are reconciled non-authoritative projections; this Allocation organizes responsibility coverage without instituting requirements or proving implementation, subject to the pending Release/Watch reconciliation above. Distribution's S-spec retains the immutable historical contract provenance; Site's S-site-design and S-site-mission ground the site responsibility. OpenSpec contractualizes each unit's realization. The scopes do not create competing product authorities. Distribution and Site's S-product-design records the scoped 2026-10-09 identity revision; Release/Watch's S-release-watch-design records the distinct versioning/watch revision and its explicit supersessions. The same nine units remain; input registration neither changes completion status nor realizes future watch/update/release/bootstrap/site responsibilities.

An allocation surface denotes a responsibility boundary, not a prescribed file, workflow, library, API, or architectural component. The modalities, exclusions, conditions, and exceptions attributed to the Capture retain their force. Evidence described below identifies what later Verification must connect to that responsibility; it is not a separate Verification model.

The [technical architecture](2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) records current harness choices supporting these responsibilities. It adds no allocation unit or product obligation; the tooling described there does not establish completion of the production, acceptance, or publication responsibilities below.

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

Preserve the pinned canonical default browser baseline: conventional JavaScript and ESM initialization, documented C-style and OO1 APIs, BigInt, Worker1 and its promise interface, FTS5, and default persistence VFSes including OPFS. Preserve upstream SQL and extension semantics and upstream browser/storage prerequisites and limitations. Document required Worker contexts, secure hosting, and VFS-specific isolation/header requirements without promising main-thread OPFS. Browser execution alone is supported; Node.js runtime, native binaries, and WASI distributions are excluded, while Node.js tooling remains permitted. Server use of node:sqlite with native sqlite-vec is outside this project's runtime responsibility.

Build-defining toolchain/dependency versions and options are pinned and recorded. Document the prerequisites for reproducing this build from a clean checkout. No functional upstream modification, SQL abstraction, ORM, application API, FluidJ behavior, or custom vector semantics is added. Glue is limited to building, initializing, locating, and exposing upstream functionality. Source patches remain excluded; any unavoidable patch requires an explicit contract revision identifying necessity and isolation.

**Composition:** consumes A-inputs and supplies A-package; A-acceptance checks the retained behavior. **Evidence target:** build environment/options, documented reproduction and browser/storage prerequisites, common SQLite release identity, integration/configuration boundaries, and resulting baseline capabilities and extension registration.

### A-package — Consumer-ready verified payload

**Capture:** C-purpose, C-nonmodification, C-inputs, C-browser, C-storage, C-release. **Surface:** distributable package contents and asset resolution, plus repository exclusion of generated artifacts.

Own the complete browser runtime payload from A-build, including required loaders, workers, proxies, and WASM assets with working asset resolution. Upstream bundler variants remain accessible where supplied without promising every bundler's compatibility. The baseline excludes demos, benchmarks, test applications, and optional experimental build variants. Consumers require no native/WASM compilation step. Generated SQLite JavaScript/WASM artifacts are not committed.

Packaging must preserve A-build's behavior and allowed glue boundary, including no silent transient-storage substitution for requested persistence. Include required upstream licensing notices. A-release owns the shared independent product SemVer/revision/publication identity under C-release; A-package carries the caller's explicit name/version, supplies the runtime payload and output digests, and retains exact SQLite and selected-engine identities in the existing runtime manifest. `inputs.sqliteVec` explicitly identifies sqlite-vec; it is upstream identity, not product identity. No competing version registry is required.

**Composition:** consumes A-build; supplies the final assets to A-acceptance and the exact verified payload to A-release. **Evidence target:** distributable contents, asset resolution, output digests, notices, and repository artifact exclusions.

### A-acceptance — Production and browser acceptance gates

**Capture:** C-inputs, C-browser, C-static, C-storage, C-verification, C-release. **Surface:** CI production verification and browser acceptance evidence for the final packaged assets.

Own CI proof of the full clean-checkout acquisition, integrity verification, build, verification, and packaging path using documented prerequisites, without unpublished files, pre-existing outputs, or necessary caches. Reproduction covers defined functionality and package contents; byte-identical rebuilds are not required.

Own the acceptance obligations already captured in C-verification:

- Main-thread and Worker initialization/SQL execution, with SQLite and vec_version() matching pins, including independently opened connections.
- FTS5 creation, insertion, and expected query matches.
- vec0 creation, insertion, and deterministic nearest-neighbor identifiers and distances.
- Binary bit vectors and Hamming nearest-neighbor distances/order independently known, with no ambiguous fixture ties.
- Worker1 and its promise interface opening, executing sqlite-vec SQL, returning results, and closing.
- Every retained default OPFS VFS preserving committed ordinary/vector data through write, close, runtime/Worker termination, fresh initialization, reopen, and query under the same origin, including expected reopened vector-search results.

Tests consume final packaged assets, not a separate development build. Every mandatory gate executes in at least one real browser meeting relevant upstream prerequisites; unavailable OPFS is neither a pass nor grounds for silently skipping persistence. Results record browser versions and hosting conditions. Public API/loading-surface and default-capability checks against the pinned baseline detect accidental omissions.

Own acceptance evidence applicable to the authoritative source revision actually released and the exact payload published. A PR-head result is not sufficient merely because that PR was merged when differences in the resulting authoritative revision or payload are not covered by that evidence. Establish this applicability for A-release without prescribing a realization mechanism.

**Composition:** gathers the complete production outcomes from A-inputs, A-build, and A-package; gate results constrain A-updates and A-release. **Evidence target:** the recorded clean-checkout and packaged-browser results required above, their evaluated repository state/payload, and their applicability to the authoritative revision and exact payload actually released. This does not select how evidence is produced or its applicability established.

### A-watch — Upstream release awareness and assigned notification

**Capture:** C-watch, C-inputs, C-autonomy, R-updates. **Surface:** daily upstream-monitoring workflow and assigned GitHub notification issues.

Own daily scheduled GitHub Actions detection of official stable releases of both SQLite and sqlite-vec, using official SQLite release publications and official sqlite-vec GitHub Releases. Retain C-inputs' stable classification. Signal versions newer than the corresponding currently integrated repository pins without notifying the full historical backlog on first execution.

Create one issue per signaled upstream/version pair, assigned to the maintenance owner and identifying the upstream, version, and official source. Repeated detection must not create duplicates, including after closure. Closure may record evaluation with adoption declined; monitoring neither recreates nor reopens the issue. Own issue creation/assignment and documentation of the GitHub Mobile settings required for push notifications, without guaranteeing push delivery.

Stop at notification: do not change pins, trigger candidate preparation, merge, enable automatic merge, tag, or publish. Autonomous adoption and machinery used solely to sustain zero-human-touch adoption remain excluded. Consultation, version comparison, and deduplication mechanisms remain realization choices.

**Composition:** reads the integrated pin identities owned by A-inputs; issues may supply human evaluation context for A-updates but are neither prerequisites nor automatic triggers. **Evidence target:** scheduled operation, official source/stable classification and newer-than-pins filtering, initial historical-backlog exclusion, issue identity/source/assignment, deduplication across repeated detection and closure, documented push settings and delivery limitation, and stop at notification.

### A-updates — Manually triggered candidate preparation and human integration

**Capture:** C-inputs, C-autonomy, C-failure, C-nonmodification, C-release, R-updates. **Surface:** manual candidate workflow, candidate repository changes/PR, and human authoritative integration boundary.

Own a human-triggered `workflow_dispatch` accepting explicit upstream versions or resolving stable versions at invocation. For the selected candidate, automate source retrieval/integrity verification through A-inputs, repository changes containing pins/integrity data, A-build/A-package production, all mandatory build, compatibility, packaging, integrity, and A-acceptance checks, and creation or update of a candidate PR targeting the authoritative branch, normally `main`. Selection does not depend on polling history or processing every intervening release, and preparation remains possible without a prior issue or complete monitoring history. Missed notifications do not prevent a later candidate.

The candidate must include an explicitly justified independent product-version choice under C-release, based on public compatibility impact rather than upstream version composition or merely passing tests. The workflow stops at the qualified candidate PR after all mandatory checks have passed. It must not merge, enable automatic merge, tag a release, or publish. All mandatory gates pass before integration; the merge decision remains human. A-watch owns repository release awareness; the decision to evaluate and initiate preparation remains human. A-watch issues may provide context but neither trigger preparation automatically nor become prerequisites. R-updates explains the revised awareness boundary and retained exclusion of autonomous adoption and machinery used solely to sustain zero-human-touch adoption.

A failed mandatory build, compatibility, packaging, integrity, or acceptance requirement stops the candidate before it is eligible for merge and before successful integration. Human approval does not waive mandatory gates. Automatic upstream incompatibility repair is not required; human initiation and adoption do not relax the patch prohibition or authorize a new design decision here.

**Composition:** optionally receives A-watch issue context through a human decision; supplies candidates to A-inputs and requires complete A-acceptance outcomes before the candidate PR is eligible for human merge. Identify the human-approved merged authoritative revision and corresponding payload for A-acceptance/A-release; merge alone does not establish applicability of candidate evidence to them. **Evidence target:** manual invocation and selected-version records, preparation independent of notification issues/history, candidate changes and mandatory check outcomes, PR creation/update and stop before merge/publication, human-approved merge, the authoritative revision/payload and applicable acceptance evidence, and captured failure stops; no polling history is required.

### A-release — Synchronized tagging and publication

**Capture:** C-purpose, C-release, C-autonomy, C-failure, C-bootstrap. **Surface:** Git tag, GitHub Release assets/record, npm publication, and publication provenance.

Own the automatic post-merge sequence of tagging, GitHub Release, and npm publication, triggered by the human-approved candidate merged into the authoritative branch, normally `main`, making the distribution consumable through npm and downloadable GitHub Release assets. Only automatic npm publication may be overridden by A-bootstrap's minimum unavoidable initial setup/first-publication exception; after bootstrap, the normal automatic post-merge sequence applies without that exception. Candidate preparation cannot trigger publication before the human-approved merge. Every published version corresponds to one authoritative source revision, one tag, one GitHub Release, and one npm publication. Both channels use the `sqlite-vector-wasm` name and same independent product SemVer under C-release, derive from the same verified revision, represent the exact same verified runtime payload, and explicitly identify the exact SQLite WASM version and selected vector engine/version (currently sqlite-vec). Product increments follow C-release’s pre-/post-1.0 compatibility policy, not upstream version size/composition; future engine replacement is classified by observed contract impact. The intended initial example `0.1.0` establishes no release pin. Release records identify upstream/output digests and build environment/options; automatically derived concise version information suffices without mandatory narrative release notes.

Permit publication only with A-acceptance evidence applicable to the authoritative source revision actually released and the exact payload published. Do not infer applicability solely from merging a PR whose head passed checks when resulting revision/payload differences are not covered by the evidence. This property leaves the implementation mechanism open and also applies to the bounded first-publication exception.

Any mandatory gate failure prevents the corresponding release tag, GitHub Release, and npm version. Steady-state publication uses npm trusted publishing and verifiable build provenance/asset attestations where supported by the chosen environment; unsupported mechanisms/fallbacks are explicit. Persistent npm credentials cannot be the normal mechanism where trusted publishing provides secretless publication.

**Composition:** consumes A-package's exact verified payload, applicable A-acceptance evidence, A-updates' human-approved merged authoritative revision, and the publishing relationship established under A-bootstrap. Bootstrap does not waive this unit's verification or source/revision/payload identity obligations. Its published archive supplies A-site; site consumption adds no package or publication responsibility here. **Evidence target:** approved candidate merge as the normal publication trigger, any bounded initial npm-publication exception, tag/revision/version identity, both channel payloads and metadata, applicable acceptance evidence and publication gate outcomes, authentication mechanism, and supported provenance/attestations.

### A-bootstrap — Initial publishing relationship

**Capture:** C-bootstrap, C-autonomy. **Surface:** initial repository/registry bootstrap and establishment of npm trusted publishing.

Own the permitted one-time publication-setup exception: minimum unavoidable manual registry configuration and first npm publication needed to establish trusted publishing MAY occur during initial bootstrap. Only for that minimum unavoidable initial setup/first-publication case, this exception MAY override A-release's normal automatic post-merge npm-publication behavior. It MUST NOT waive mandatory verification, weaken source/revision/payload identity requirements, provide a recurring manual release path, or alter recurring human candidate initiation or merge authority. It supplies the relationship A-release uses for automatic post-merge publication; no bootstrap implementation procedure is selected.

**Composition:** the first publication remains constrained by A-acceptance and A-release; established configuration supports A-release's subsequent automatic post-merge publications. **Evidence target:** initial-versus-steady-state publishing configuration and the bounded publication-setup exception, if exercised.

### A-site — Public presentation and published-runtime demonstration

**Capture:** Site: C-site, C-readme, C-demo-release, C-emoji, C-vector-modes, C-interaction, C-search, C-memory, C-demo-checks. **Surface:** the static GitHub Pages site, its demo-specific data and its deployment, separate from the npm package and canonical runtime publication.

Own two pages with common minimal mobile-adapted styling and three navigation entries: clean README presentation, emoji-search demo and a direct GitHub repository link. Render the README as HTML at deployment from that single presentation source; adapt relative links and images. Presentation may follow `main` independently of engine releases. Documentation-only updates require no engine publication and preserve the demo release identity. No CMS or application-framework selection is instituted.

Consume JS/WASM extracted from A-release's actually published archive without rebuilding the engine. Resolve the latest stable release when deploying/updating the demo and then retain that exact release until the next demo update. Show the sqlite-vector-wasm independent product version, exact SQLite version and selected engine identity/version (currently sqlite-vec via vec_version()), and a link to the release. Keep site/data separate from package contents, without adding a package API, runtime capability or third canonical runtime distribution.

Use all 1,661 emoji2vec emojis with their original precomputed 300-dimensional embeddings and enriched English names/associated words. Identify the upstream data revision and retain the MIT notice and credit. Use system Unicode rendering without an image collection; retain the old-corpus/recent-emoji limitation and exclusion of initial French labels. Dataset preparation belongs to this site responsibility, not A-inputs' engine-source acquisition or A-package's payload.

Import demo data into an exclusively in-memory SQLite database, destroyed on explicit connection closure. No authentication, local persistence or OPFS cleanup is needed. Text search finds a starting emoji by names/words; sqlite-vec searches its existing embedding, without free-sentence vectorization; no model, remote embedding service or API key is required. Provide the matching grid, six neighbors excluding the selected emoji, clickable neighbor exploration, copy button, binary/Float32 selector and collapsible distances/technical controls.

Load sign-quantized binary vectors by default, padded to 304 dimensions with four equal noncontributing components, and search by Hamming distance. Load original 300-dimensional Float32 vectors on first selection and retain them in memory; search by cosine distance. Preserve common emoji identifiers and the selected emoji on mode switching, then rerun its query. Semantic neighbor quality is not an acceptance criterion; representation differences remain observable.

Own deterministic comparisons of a few searches in each mode against expectations calculated independently of sqlite-vec, exercising published WASM loading, automatic extension availability, vector insertion and searches. Surprising neighbors alone establish no vector execution. Also check navigation, README rendering and links from GitHub Pages. This scoped demonstration complements A-acceptance without replacing its API, OPFS, persistence or production obligations. Retain reported-size and unverified-browser limitations; Q-volume and Q-realization remain open, without invented size gates, data formats, pipeline or framework choices. Realize this one unit through a later OpenSpec Change; this Allocation records no implementation or publication progress.

**Composition:** consumes A-release's published archive and the public README; independent README updates preserve the demo runtime identity. A-release supplies that artifact without gaining site deployment responsibility. Demo data remain site-specific; A-build/A-package and A-acceptance retain their existing contracts. **Evidence target:** the deployed navigation/presentation and valid README links/images, fixed published archive/version identity and reported SQL versions, credited pinned corpus, actual text/vector interactions and mode/lifetime behavior, and independently expected scoped query results with their limits. Build/deployment and fixture details remain realization choices.

## Coverage accounting

The following accounting retains the Distribution/Site comparison state before the Release/Watch revision. It is not a current coverage claim for all inputs. Distribution handles are listed first; Site handles follow. Multiple units in a covered row jointly account for its content; context and obligations within a handle are distinguished rather than assigning the handle two classifications. Reconsider affected rows together with the unit descriptions during the pending reconciliation.

| Capture handle | Classification | Allocation / treatment |
| --- | --- | --- |
| C-purpose | Covered | A-inputs, A-build, A-package, A-release: sqlite-vector-wasm identity and exactly one selected static engine, currently sqlite-vec, official integrated browser distribution and publication boundary; no backend API or simultaneous engine support. Revisability does not remove current integration/acceptance duties. |
| C-nonmodification | Covered | A-build, A-package, A-updates: allowed glue, exclusions, unchanged semantics, patch/revision and intervention boundary. |
| C-inputs | Covered | A-inputs, A-build, A-package, A-acceptance, A-updates: origins/pins/digests, acquisition exclusions, toolchain pins, artifact exclusions, reproduction, proposed updates and documented prerequisites. A-watch reuses the stable-release classification without owning source acquisition or integrity verification. |
| R-inputs | Covered | A-inputs retains source-stated acquisition context; A-build owns the embedded same-SQLite-release MUST. Context does not create separate work. |
| C-browser | Covered | A-build, A-package, A-acceptance: full retained baseline, assets/variants, exclusions and omission checks. |
| C-static | Covered | A-build, A-acceptance: supported static registration, every connection, unchanged extension semantics and availability evidence. |
| C-storage | Covered | A-build, A-package, A-acceptance: upstream conditions, persistence preservation/no fallback, mandatory evidence and documented prerequisites owned by A-build. |
| C-release | Covered | A-package, A-acceptance, A-updates, A-release: consumer-ready payload/notices, independent product SemVer policy and explicit selected-engine composition, identity across revision/tag/channels, versions/digests/environment, and acceptance evidence applicable to the authoritative revision and exact payload actually released; merge alone proves no applicability. |
| C-verification | Covered | A-acceptance: all captured production/browser obligations, evidence conditions and omitted-capability detection. |
| C-watch | Covered | A-watch: daily official stable-release monitoring for both upstreams, newer-than-pins filtering and initial backlog boundary, assigned issue/source identity, closure-resistant deduplication, push-setting documentation and delivery limitation, notification-only stop. |
| C-autonomy | Covered | A-watch, A-updates, A-release, A-bootstrap: automated awareness separated from human initiation, issue-independent preparation, manual candidate selection independent of polling history, qualified PR stop, human merge, automatic post-merge publication, excluded autonomy machinery and publication-setup exception. |
| R-updates | Non-allocatable | Adopted complexity/value and human-authority rationale informs A-watch and A-updates; no additional implementation obligation or technically refuted alternative. |
| C-failure | Covered | A-updates, A-release: no eligibility for merge/integration/tag/channel publication on any mandatory failure; human approval waives no gate; no required automatic repair. |
| C-bootstrap | Covered | A-bootstrap, A-release: bounded initial exception overrides only automatic npm publication; no recurring manual release path, waived verification or weakened revision/payload identity; recurring human trigger/merge authority, trusted publishing/provenance and explicit unsupported fallbacks retained. |
| C-obsolescence | Non-allocatable | Terminal lifecycle condition retained as a project invariant: SQLite or the selected vector-engine upstream publishes and maintains an equivalent distribution satisfying the browser, API, vector, and persistence contract; a demonstration package alone is insufficient. It creates no current implementation responsibility. If the condition becomes plausibly satisfied, any concrete retirement behavior requires a new design decision and allocation. |
| R-engine | Non-allocatable | User-validated selection/trade-offs, unselected vec1 alternative and evidence-based reconsideration signals; no current abstraction/replacement responsibility. C-purpose preserves current duties, C-release owns impact-based versioning. A future replacement needs independently verified preservation and human authorization, not this rationale alone. |
| S-product-design | Non-allocatable | Primary dated user authority for D1–D6 and scoped supersession; not an additional realization unit or independent evidence. |
| S-spec | Non-allocatable | Immutable historical contract provenance and its instituted design, retained through the current Capture and source links; not implementation work or independent corroboration. |
| S-watch-model | Non-allocatable | User adoption and designated derived consolidation for the awareness revision materialized in S-spec; no separate implementation work or independent corroboration. |
| S-release-model | Non-allocatable | Primary user provenance for the retained human-authority boundary and original R-updates rationale, revised by S-watch-model; not separate implementation work or independent corroboration. |
| S-doc-model | Non-allocatable | Primary user provenance for removing the standalone README checklist while preserving substantive product obligations in S-spec; not separate implementation work or independent corroboration. |

| Site Capture handle | Classification | Allocation / treatment |
| --- | --- | --- |
| C-site | Covered | A-site: GitHub Pages, two pages, common mobile presentation and the three navigation destinations; no selected CMS/framework. |
| C-readme | Covered | A-site: single README source, deployment rendering, usable relative links/images, optional main-following presentation and documentation-only release-identity preservation. |
| C-demo-release | Covered | A-site: exact published archive consumption, latest stable at demo deployment then fixed identity, visible project/SQL versions and release link, site/data/package/API boundary. A-release supplies its existing archive; no runtime publication ownership moves. |
| C-emoji | Covered | A-site: complete precomputed corpus, identified upstream revision, English enriched descriptions, system Unicode, MIT notice/credit, recent-emoji limitation and initial French-label exclusion. |
| C-vector-modes | Covered | A-site: default sign-bit/304/Hamming with noncontributing padding; optional original 300/Float32/cosine, first-selection load and memory reuse, common identifiers, selection retention/requery, no semantic-quality gate. |
| C-interaction | Covered | A-site: name/word field and grid, six neighbors excluding self, clickable exploration, copy, mode selector and collapsible technical information. |
| C-search | Covered | A-site: SQLite import, text starting point and existing query embedding, actual sqlite-vec vector execution, no free-sentence vectorization or required model/service/key. |
| C-memory | Covered | A-site: exclusively in-memory database and destruction on explicit close; no authentication, persistence, OPFS cleanup or invented logout flow. |
| C-demo-checks | Covered | A-site: both-mode independent expectations and exercised initialization/registration/insertion/query paths; navigation/README/link checks and explicit complement-to-acceptance boundary. A-acceptance's full obligations remain unchanged. |
| R-demo | Non-allocatable | Web-friendly use case, functional rather than semantic-quality rationale and reported file-size observations; not new size requirements or independent browser evidence. |
| O-corpus | Non-allocatable | Unselected miniature alternative and rejection of unrelated commercial promotion; no extra corpus implementation. The selected full corpus is covered by C-emoji. |
| Q-volume | Non-allocatable | Explicitly open final SQLite/vec0 volume; no instituted threshold or gate. Future observation is not a hidden uncovered product obligation. |
| Q-realization | Non-allocatable | Open lower-level choices for the one future A-site Change, not additional obligations or allocation units; decisions must stay within the captured behavior. |
| S-product-design | Non-allocatable | Same scoped user identity/composition revision as Distribution, propagated through A-site without altering dataset/modes/execution or claiming deployment. |
| S-site-design | Non-allocatable | User-designated edited consolidation, including reported observations and superseded SPEC integration; provenance, not independent evidence or realization work. |
| S-site-exploration | Non-allocatable | Primary user intent/rationale and earlier alternatives; no unseen assistant proposal is promoted into a requirement. |
| S-site-mission | Non-allocatable | Human authority for the local migration, one A-site unit and deferred realization; not a site implementation obligation or independent corroboration of measurements. |

**Prior Distribution/Site accounting, before the Release/Watch revision:** Distribution: 21/21 material handles examined; 13 covered, eight non-allocatable. Site: 17/17 examined; nine covered, eight non-allocatable. Their prior union: 38/38 examined; 22 covered, 16 non-allocatable. Prior grounding: 9/9 units. Current three-input coverage and revised grounding remain unevaluated; the previous 100% result must not be applied to the revised design.

The two explicit Site questions remain open and represented; 100% responsibility accounting does not claim their answers are known. Source authority and scope prose outside handles is non-allocatable provenance/boundary material, retained in the source descriptions and compositions. C-demo-release is a consumer dependency on A-release, not a new publication channel. C-demo-checks is a limited additional site check, not duplicated ownership or weakening of C-verification.

Authority and epistemic distinctions outside the Capture handles are retained in this document's source boundary. Lifecycle invariants are not reclassified as current readiness conditions. Pending Release/Watch reconciliation must update the affected responsibilities, material relationships and accounting; unspecified lower-level mechanisms remain open. Coverage concerns responsibility/grounding accounting, not successful implementation, technical compatibility, completed bootstrap, or passed production gates.
