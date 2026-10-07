# sqlite-vec-wasm — Specification

This is the authoritative project contract. **MUST** denotes a requirement; **SHOULD** denotes a preference whose departure needs a concrete justification.

The [technical architecture](.42p/engineering/2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) records realization choices derived from the engineering allocation; it is subordinate to this product contract and adds no product requirements.

## Responsibility and boundaries

The project MUST build and publish the canonical SQLite browser/WASM distribution with an official stable `sqlite-vec` release statically integrated, without functionally modifying either upstream.

Browser execution is the only supported runtime. Node.js runtime support, native binaries, and WASI distributions are out of scope; server consumers use `node:sqlite` with native `sqlite-vec`. Node.js may be used as build or test tooling.

The project MUST NOT add SQL abstractions, ORM functionality, application APIs, FluidJ behavior, or custom vector-search semantics. Integration and packaging glue are permitted only to build, initialize, locate, and expose upstream functionality. Upstream source patches are excluded; an unavoidable compatibility patch would require an explicit contract revision identifying its necessity and isolation.

## Inputs and reproduction

- SQLite and `sqlite-vec` inputs MUST come from their official upstreams and identify exact released versions. Stable means released, non-draft, non-prerelease versions; alpha, beta, release-candidate, and development snapshots are excluded, including prereleases displayed by current documentation.
- Every downloaded source input MUST have a cryptographic digest recorded in the repository state being verified and checked before use. A mismatch MUST fail the build; fetching a checksum alongside changed bytes MUST NOT silently authorize them. Official release archives SHOULD be preferred when sufficient.
- Upstream source trees and generated SQLite JavaScript/WASM artifacts MUST NOT be committed. Source acquisition MUST NOT require submodules or recursive mirroring unless an upstream constraint demonstrably requires them.
- From a clean checkout and documented prerequisites, the project MUST obtain and verify the pinned inputs, build, verify, and package the distribution without unpublished files, pre-existing outputs, or necessary caches. Build-defining toolchain/dependency versions and options MUST be pinned and recorded sufficiently to repeat that process. Reproduction means the same defined functionality and package contents; byte-identical rebuilds are not required.

The supported canonical SQLite build currently needs the full SQLite source tree, rather than only its amalgamation. Temporary acquisition satisfies the no-vendoring boundary. SQLite core, WASM support, and JavaScript bindings MUST originate from the same SQLite release. Official `sqlite-vec` amalgamation releases provide its C source and generated header without requiring its source repository or vendored SQLite copy.

## Distribution contract

The baseline is the pinned SQLite release's canonical default browser/WASM distribution, excluding demos, benchmarks, test applications, and optional experimental build variants.

The package MUST preserve that baseline's documented browser APIs, loading modes, SQL behavior, and default capabilities, adding only upstream `sqlite-vec` functionality. This includes conventional JavaScript and ES module initialization, C-style and OO1 APIs, BigInt support, Worker1 and its promise interface, FTS5, and the default persistence VFSes, including OPFS. Associated loaders, workers, proxies, and WASM assets MUST be distributed with working asset resolution. Upstream bundler variants MUST remain accessible where supplied; compatibility with every bundler is not promised.

`sqlite-vec` MUST be compiled and automatically registered through SQLite's supported WASM static-extension initialization mechanism, making its SQL functionality available on every newly opened connection. Consumers MUST NOT load an extension dynamically or register it themselves. Upstream extension semantics MUST be preserved.

Browser and storage availability remain subject to the pinned upstream's prerequisites and limitations. The project MUST document required Worker contexts, secure hosting, and VFS-specific isolation/header requirements; it MUST NOT promise OPFS on the main thread or silently substitute transient storage when persistence was requested.

The distribution MUST be consumable through npm and as downloadable GitHub Release assets without a consumer-side native/WASM compilation step. Every published project version MUST correspond to one authoritative source revision, one Git tag, one GitHub Release, and one npm publication. Both publication channels MUST use the same project version, derive from that verified revision, contain the same verified runtime payload, and identify the included SQLite WASM and `sqlite-vec` versions. Every release MUST identify upstream and output digests and build environment/options, and preserve required upstream licensing notices. Automatically derived concise version information is sufficient; manually maintained narrative release notes are not required.

Publication MUST be supported by acceptance evidence applicable to the authoritative source revision actually being released and to the exact payload being published. A PR-head verification result MUST NOT be treated as sufficient merely because the PR was later merged if differences in the resulting authoritative revision or payload are not covered by that evidence.

## Acceptance gates

CI MUST demonstrate the complete clean-checkout production path. Browser acceptance tests MUST consume the final packaged assets, rather than a separate development build, and establish:

- Successful initialization and SQL execution on the main thread and in a browser Worker; reported SQLite and `vec_version()` values match the pinned inputs, including on independently opened connections.
- FTS5 table creation, insertion, and a query returning expected matches.
- `vec0` creation, insertion, and nearest-neighbor queries returning expected identifiers and distances for deterministic fixtures.
- Binary `bit` vectors and Hamming nearest-neighbor search with independently known distances and ordering; fixtures MUST avoid ambiguous ties.
- Worker1 and its promise interface can open, execute SQL using `sqlite-vec`, return results, and close.
- For each default OPFS VFS retained from the baseline, committed ordinary and vector data survive write, close, runtime/Worker termination, fresh initialization, reopen, and query under the same origin. Reopened vector search MUST return the expected results.

At least one real browser satisfying the relevant upstream prerequisites MUST execute every mandatory gate; unavailable OPFS MUST NOT count as a pass or silently skip the persistence gate. Verification results MUST record browser versions and hosting conditions. Public API/loading-surface and default-capability checks against the pinned baseline MUST detect accidental omissions.

## Updates and publication

The repository MUST monitor official stable releases of both SQLite and `sqlite-vec` through a daily scheduled GitHub Actions workflow. Stable classification remains as defined under inputs and reproduction. Detection MUST use official SQLite release publications and official `sqlite-vec` GitHub Releases, and signal stable versions newer than the corresponding currently integrated repository pins, without notifying the full historical release backlog on first execution.

Each signaled upstream/version pair MUST have one GitHub issue assigned to the maintenance owner, identifying the upstream, detected version, and official release source. Repeated detection MUST NOT create duplicates, including after issue closure. Closing an issue MAY mean that the version was evaluated and adoption declined; monitoring MUST NOT recreate or reopen it. The repository-controlled outcome is issue creation and assignment, not delivery of a mobile push notification, which depends on GitHub Mobile settings. Required push-notification settings MUST be documented with the monitoring mechanism.

Monitoring MUST stop at notification. It MUST NOT change source pins, initiate candidate preparation, merge, enable automatic merge, tag, or publish. Autonomous adoption and heartbeat or bookkeeping machinery used solely to sustain zero-human-touch adoption remain excluded.

A human decides when to evaluate an upstream release and manually triggers candidate preparation through `workflow_dispatch`. That workflow MUST accept explicit upstream versions or resolve stable versions at invocation, retrieve and verify the corresponding official sources, prepare repository changes containing pins and integrity data, build and package the distribution, run all mandatory build, compatibility, packaging, integrity, and acceptance checks, and create or update a candidate PR targeting the authoritative branch, normally `main`. A notification issue MAY provide evaluation context but MUST NOT be a prerequisite or automatic trigger. Candidate preparation MUST remain possible without a prior issue or complete monitoring history. Candidate selection MUST NOT depend on continuous polling history or processing every intervening upstream release. The workflow MUST stop at the qualified candidate PR after all mandatory checks have passed; it MUST NOT merge, enable automatic merge, tag a release, or publish. All mandatory gates MUST pass before integration, and the merge decision MUST remain human.

Merging the approved candidate into the authoritative branch MUST automatically trigger Git tagging and GitHub Release publication, and npm publication except where the bounded initial npm-publication exception below applies. Tagging and publication MUST derive from the resulting authoritative source revision verified against the complete contract, using the exact verified payload. Candidate preparation and post-merge publication are separate workflow responsibilities; passing candidate checks does not authorize adoption or publication before the human-approved merge.

Automation MUST fail closed: failure of any mandatory build, compatibility, packaging, integrity, or acceptance requirement MUST stop the candidate before it is eligible for merge, before successful integration, and before release tagging, GitHub Release publication, or npm publication. Human approval does not waive mandatory gates. Automatic repair of upstream incompatibilities is not required; the upstream non-modification boundary continues to apply.

Initial repository/registry bootstrap MAY include the minimum unavoidable manual registry configuration and first npm publication needed to establish trusted publishing. This bounded initial publication-setup exception MAY override the normal automatic post-merge npm-publication requirement only for the minimum unavoidable first-publication/bootstrap case. It MUST NOT waive mandatory verification, weaken source/revision/payload identity requirements, provide a recurring manual release path, or alter recurring human candidate initiation or merge authority. After bootstrap is established, the normal automatic post-merge tagging, GitHub Release publication, and npm publication rule applies without this exception. Steady-state publication MUST use npm trusted publishing and verifiable build provenance/asset attestations where supported by the chosen publishing environment; any unsupported mechanism and fallback MUST be explicit. Persistent npm publishing credentials MUST NOT be the normal mechanism where trusted publishing provides secretless publication.

The project is obsolete when SQLite or `sqlite-vec` upstream publishes and maintains an equivalent distribution satisfying this browser, API, vector, and persistence contract. A demonstration package alone does not meet that condition.

## Upstream references

- [SQLite canonical build and static-extension mechanism](https://sqlite.org/wasm/doc/trunk/building.md), [API surface](https://sqlite.org/wasm/doc/trunk/api-index.md), and [persistence prerequisites](https://sqlite.org/wasm/doc/trunk/persistence.md).
- [Official SQLite release sources and checksums](https://sqlite.org/download.html).
- [Official sqlite-vec releases](https://github.com/asg017/sqlite-vec/releases), [source distributions](https://alexgarcia.xyz/sqlite-vec/compiling.html), and [WASM integration and demo status](https://alexgarcia.xyz/sqlite-vec/wasm.html).
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

References explain upstream mechanisms; moving documentation does not change the requirements above. Version-specific behavior is evaluated against the pinned releases.
