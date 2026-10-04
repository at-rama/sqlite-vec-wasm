# Specification-derived Capture

## Change identity and authority

Change: `specification` — structure the current `sqlite-vec-wasm` project contract for later reasoning. Scope: the supplied root specification only. This Capture is a derived, non-authoritative working set; [S-spec](../../../spec.md) governs every difference in reading. It introduces no decision, allocation, implementation choice, or implementation plan.

All modalities below report S-spec's requirements, permissions, preferences, and exceptions; they confer no independent authority. MUST denotes a requirement; SHOULD denotes a preference whose departure needs a concrete justification. S-spec establishes the contract, not evidence that bootstrap, compatibility, verification, or publication has already succeeded. Source-stated technical context remains attributed to S-spec and is not independently validated here.

## Material constraints and lifecycle boundaries

### C-purpose — Responsibility and runtime boundary

Source: [S-spec, responsibility and boundaries](../../../spec.md#responsibility-and-boundaries).

The project MUST build and publish the canonical SQLite browser/WASM distribution with an official stable `sqlite-vec` release statically integrated, without functionally modifying either upstream.

Browser execution is the only supported runtime. Node.js runtime support, native binaries, and WASI distributions are out of scope; server consumers use `node:sqlite` with native `sqlite-vec`. Node.js may be used as build or test tooling.

### C-nonmodification — Added behavior and patch boundary

Source: [S-spec, responsibility and boundaries](../../../spec.md#responsibility-and-boundaries).

The project MUST NOT add SQL abstractions, ORM functionality, application APIs, FluidJ behavior, or custom vector-search semantics. Integration and packaging glue are permitted only to build, initialize, locate, and expose upstream functionality. Upstream source patches are excluded; an unavoidable compatibility patch would require an explicit contract revision identifying its necessity and isolation.

### C-inputs — Source authority, integrity, acquisition, and reproduction

Source: [S-spec, inputs and reproduction](../../../spec.md#inputs-and-reproduction).

- SQLite and `sqlite-vec` inputs MUST come from their official upstreams and identify exact released versions. Stable means released, non-draft, non-prerelease versions; alpha, beta, release-candidate, and development snapshots are excluded, including prereleases displayed by current documentation.
- Every downloaded source input MUST have a cryptographic digest recorded in the repository state being verified and checked before use. A mismatch MUST fail the build; fetching a checksum alongside changed bytes MUST NOT silently authorize them. Official release archives SHOULD be preferred when sufficient.
- Upstream source trees and generated SQLite JavaScript/WASM artifacts MUST NOT be committed. Source acquisition MUST NOT require submodules or recursive mirroring unless an upstream constraint demonstrably requires them.
- From a clean checkout and documented prerequisites, the project MUST obtain and verify the pinned inputs, build, verify, and package the distribution without unpublished files, pre-existing outputs, or necessary caches. Build-defining toolchain/dependency versions and options MUST be pinned and recorded sufficiently to repeat that process. Reproduction means the same defined functionality and package contents; byte-identical rebuilds are not required.

### R-inputs — Source-stated build context

Source: [S-spec, inputs and reproduction](../../../spec.md#inputs-and-reproduction).

The supported canonical SQLite build currently needs the full SQLite source tree, rather than only its amalgamation. Temporary acquisition satisfies the no-vendoring boundary. SQLite core, WASM support, and JavaScript bindings MUST originate from the same SQLite release. Official `sqlite-vec` amalgamation releases provide its C source and generated header without requiring its source repository or vendored SQLite copy.

### C-browser — Retained browser baseline

Source: [S-spec, distribution contract](../../../spec.md#distribution-contract).

The baseline is the pinned SQLite release's canonical default browser/WASM distribution, excluding demos, benchmarks, test applications, and optional experimental build variants.

The package MUST preserve that baseline's documented browser APIs, loading modes, SQL behavior, and default capabilities, adding only upstream `sqlite-vec` functionality. This includes conventional JavaScript and ES module initialization, C-style and OO1 APIs, BigInt support, Worker1 and its promise interface, FTS5, and the default persistence VFSes, including OPFS. Associated loaders, workers, proxies, and WASM assets MUST be distributed with working asset resolution. Upstream bundler variants MUST remain accessible where supplied; compatibility with every bundler is not promised.

### C-static — Per-connection extension availability

Source: [S-spec, distribution contract](../../../spec.md#distribution-contract).

`sqlite-vec` MUST be compiled and automatically registered through SQLite's supported WASM static-extension initialization mechanism, making its SQL functionality available on every newly opened connection. Consumers MUST NOT load an extension dynamically or register it themselves. Upstream extension semantics MUST be preserved.

### C-storage — Conditional browser and persistence availability

Source: [S-spec, distribution contract](../../../spec.md#distribution-contract).

Browser and storage availability remain subject to the pinned upstream's prerequisites and limitations. The project MUST document required Worker contexts, secure hosting, and VFS-specific isolation/header requirements; it MUST NOT promise OPFS on the main thread or silently substitute transient storage when persistence was requested.

### C-release — Version, revision, payload, and distribution identity

Source: [S-spec, distribution contract](../../../spec.md#distribution-contract).

The distribution MUST be consumable through npm and as downloadable GitHub Release assets without a consumer-side native/WASM compilation step. Every published project version MUST correspond to one authoritative source revision, one Git tag, one GitHub Release, and one npm publication. Both publication channels MUST use the same project version, derive from that verified revision, contain the same verified runtime payload, and identify the included SQLite WASM and `sqlite-vec` versions. Every release MUST identify upstream and output digests and build environment/options, and preserve required upstream licensing notices. Automatically derived concise version information is sufficient; manually maintained narrative release notes are not required.

### C-verification — Required evidence and test conditions

Source: [S-spec, acceptance gates](../../../spec.md#acceptance-gates).

CI MUST demonstrate the complete clean-checkout production path. Browser acceptance tests MUST consume the final packaged assets, rather than a separate development build, and establish:

- Successful initialization and SQL execution on the main thread and in a browser Worker; reported SQLite and `vec_version()` values match the pinned inputs, including on independently opened connections.
- FTS5 table creation, insertion, and a query returning expected matches.
- `vec0` creation, insertion, and nearest-neighbor queries returning expected identifiers and distances for deterministic fixtures.
- Binary `bit` vectors and Hamming nearest-neighbor search with independently known distances and ordering; fixtures MUST avoid ambiguous ties.
- Worker1 and its promise interface can open, execute SQL using `sqlite-vec`, return results, and close.
- For each default OPFS VFS retained from the baseline, committed ordinary and vector data survive write, close, runtime/Worker termination, fresh initialization, reopen, and query under the same origin. Reopened vector search MUST return the expected results.

At least one real browser satisfying the relevant upstream prerequisites MUST execute every mandatory gate; unavailable OPFS MUST NOT count as a pass or silently skip the persistence gate. Verification results MUST record browser versions and hosting conditions. Public API/loading-surface and default-capability checks against the pinned baseline MUST detect accidental omissions.

### C-autonomy — Successful steady-state lifecycle

Source: [S-spec, updates publication and documentation](../../../spec.md#updates-publication-and-documentation).

After initial bootstrap, compatible stable releases of both upstreams MUST proceed without human intervention through scheduled detection, a proposed repository update containing pins and integrity data, full build and verification, integration into the authoritative branch, Git tagging, GitHub Release publication, and npm publication. All mandatory gates MUST pass before integration; tagging and publication MUST derive from the resulting authoritative source revision verified against the complete contract, using the exact verified payload. Updates MAY remain reviewable and auditable, but MUST NOT require human review or approval on this successful path.

### C-failure — Failed update and intervention boundary

Source: [S-spec, updates publication and documentation](../../../spec.md#updates-publication-and-documentation).

Automation MUST fail closed: failure of any mandatory build, compatibility, packaging, integrity, or acceptance requirement MUST stop the update before successful integration, release tagging, GitHub Release publication, or npm publication. Automatic repair of upstream incompatibilities is not required. Human intervention after bootstrap is reserved for evolving the project when its existing contract can no longer be satisfied automatically; the upstream non-modification boundary continues to apply.

### C-bootstrap — Manual exception and publication mechanisms

Source: [S-spec, updates publication and documentation](../../../spec.md#updates-publication-and-documentation).

Initial repository/registry bootstrap MAY include the minimum unavoidable manual registry configuration and first npm publication needed to establish trusted publishing. This is the only manual exception in the normal release lifecycle and does not waive verification or the synchronized release contract. Steady-state publication MUST use npm trusted publishing and verifiable build provenance/asset attestations where supported by the chosen publishing environment; any unsupported mechanism and fallback MUST be explicit. Persistent npm publishing credentials MUST NOT be the normal mechanism where trusted publishing provides secretless publication.

### C-docs — Minimal documentation obligations

Source: [S-spec, updates publication and documentation](../../../spec.md#updates-publication-and-documentation).

One concise `README.md` MUST explain the package's responsibility and exclusions, concrete consumption and asset-hosting examples, included upstream versions, reproduction prerequisites and commands, the one-time bootstrap boundary for maintainers, and the autonomous update/release lifecycle, including publication being blocked by failed verification. Additional documentation or governance files SHOULD exist only for a concrete need; separate license notices may be necessary.

### C-obsolescence — End of project responsibility

Source: [S-spec, updates publication and documentation](../../../spec.md#updates-publication-and-documentation).

The project is obsolete when SQLite or `sqlite-vec` upstream publishes and maintains an equivalent distribution satisfying this browser, API, vector, and persistence contract. A demonstration package alone does not meet that condition.

## Material relationships

C-inputs governs the inputs and reproduction whose complete production path C-verification requires CI to demonstrate. C-browser, C-static, and C-storage define the retained behavior exercised by C-verification; storage availability remains conditional on the upstream prerequisites, but unavailable OPFS cannot satisfy its mandatory acceptance gate.

C-autonomy places successful mandatory gates before authoritative integration, then tagging and publication. C-release binds the resulting source revision, project version, and verified payload across both channels. C-failure prevents a failed update from crossing those boundaries. C-bootstrap permits the initial manual exception without waiving verification or synchronized releases; C-nonmodification continues to constrain intervention. These are lifecycle invariants, not claims of current readiness for a forthcoming commitment.

## Material source

**S-spec** — [root spec.md](../../../spec.md), the supplied authoritative project specification. This user-designated contract is the sole substantive source of this projection; prior assistant receipts and this Capture are not corroboration. Snapshot SHA-256: `0b99fe946a28aaca6462f12a590297d47e0bb5e214d5dc61e8d1bf3382b3f893`.

The specification's [upstream references](../../../spec.md#upstream-references) remain retrievable through S-spec; their contents are not additional acquired evidence for this Capture. S-spec states: references explain upstream mechanisms; moving documentation does not change its requirements, and version-specific behavior is evaluated against pinned releases.
