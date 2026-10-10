## MODIFIED Requirements

### Requirement: Fresh verified build inputs

Each construction SHALL consume a fresh successful A-inputs acquisition of the repository-recorded source lock. It SHALL use that exact verified pair without latest-version resolution, source-cache reuse, fallback versions or externally supplied prior handoffs.

#### Scenario: Recorded pair is built
- **WHEN** construction starts with documented prerequisites and a recorded source lock
- **THEN** it acquires and builds that exact verified SQLite and sqlite-vec pair without adopting newer releases

#### Scenario: Acquisition fails
- **WHEN** A-inputs rejects the lock, download, digest or extracted content
- **THEN** construction stops without compiling unverified sources or using an earlier acquisition

#### Scenario: Previous sources exist
- **WHEN** an earlier acquisition or build remains in temporary state
- **THEN** a new construction uses freshly acquired trees rather than those earlier sources or outputs

#### Scenario: Published prerelease pair
- **WHEN** A-inputs successfully acquires a recorded pair containing an official published prerelease
- **THEN** construction consumes that exact verified pair with its complete version suffixes, without independently resolving releases or deciding a publication channel

#### Scenario: Acquisition identity drifts
- **WHEN** the acquisition handoff no longer matches the consumed lock bytes, exact version including suffix, or expected digest
- **THEN** construction fails before generation or compilation without substituting another pair

### Requirement: Static registration on every connection

The runtime SHALL compile the pinned official published sqlite-vec release, whether stable or prerelease, into its WASM and automatically register it through SQLite's supported static-extension initialization mechanism on every new connection. Consumers SHALL NOT dynamically load or register sqlite-vec themselves. Registration failure SHALL fail initialization or connection opening, as applicable.

#### Scenario: Independent connections
- **WHEN** a consumer opens multiple independent connections through the conventional or ESM browser runtime
- **THEN** each exposes the pinned sqlite-vec SQL functionality without consumer registration and reports the selected SQLite and sqlite-vec versions

#### Scenario: Worker connections
- **WHEN** a browser Worker opens a connection directly or through Worker1 and its promise interface
- **THEN** sqlite-vec is available without consumer registration

#### Scenario: Registration cannot complete
- **WHEN** static-extension registration or a connection's extension initialization fails
- **THEN** the corresponding initialization or opening fails instead of returning a usable connection without sqlite-vec

#### Scenario: Exact prerelease runtime identity
- **WHEN** the selected sqlite-vec release is a published prerelease and the canonical build succeeds
- **THEN** independent browser connections expose its SQL functionality without consumer registration and report its exact upstream version including the prerelease suffix

### Requirement: Traceable runtime handoff

Successful construction SHALL supply packaging with runtime locations, the complete expected browser asset inventory and per-file sizes and SHA-256 digests, input versions/archive digests/lock identity, actual build environment/options and a diagnostic-log location. Runtime sources and generated outputs SHALL remain temporary and uncommitted. The handoff SHALL NOT claim product acceptance or publication readiness.

#### Scenario: Complete successful output
- **WHEN** all required construction steps succeed and each expected runtime file is present and nonempty
- **THEN** construction atomically records and emits one complete handoff with identities and digests for those exact outputs

#### Scenario: Missing runtime file
- **WHEN** an expected loader, Worker, proxy or WASM output is missing or empty
- **THEN** construction fails without a successful runtime handoff

#### Scenario: Packaging boundary
- **WHEN** packaging consumes a successful build handoff
- **THEN** it can locate and check the runtime bytes while package assembly, licensing, final-asset acceptance and publication remain separate responsibilities

#### Scenario: Prerelease handoff provenance
- **WHEN** construction succeeds for a verified source pair containing a published prerelease
- **THEN** its complete handoff retains the exact input versions including suffixes, source digests and lock identity alongside actual build tools/options and output digests, without claiming product acceptance
