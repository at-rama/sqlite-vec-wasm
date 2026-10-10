## RENAMED Requirements

- FROM: `### Requirement: Official stable source selection`
- TO: `### Requirement: Official published source selection`

## MODIFIED Requirements

### Requirement: Official published source selection

The resolver SHALL select exact published, non-draft official upstream releases. Explicit versions SHALL take precedence independently and admit published alpha, beta or release-candidate versions with sufficient official source/integrity metadata. Omitted versions SHALL select the latest stable release. Development snapshots, malformed or ambiguous release identities SHALL fail without fallback. The helper SHALL NOT select npm channels or waive downstream checks.

#### Scenario: Both versions omitted
- **WHEN** neither project has an explicit version
- **THEN** the resolver selects each project's latest official stable release, excluding newer prereleases, and returns both exact versions

#### Scenario: One explicit version
- **WHEN** an exact admissible SQLite version is supplied and sqlite-vec is omitted
- **THEN** that SQLite version is retained and the latest stable sqlite-vec release is selected

#### Scenario: Explicit sqlite-vec or both versions
- **WHEN** an exact published stable or prerelease sqlite-vec version is supplied, alone or with an exact admissible SQLite version
- **THEN** each supplied version takes precedence and only an omitted version is resolved to latest stable

#### Scenario: Published prerelease selection
- **WHEN** an exact sqlite-vec alpha, beta or release-candidate version identifies a published non-draft official release with sufficient source and digest metadata
- **THEN** the resolver retains its exact suffix in the source lock without replacing it by its stable base or computing a distribution channel

#### Scenario: Invalid or unstable selection
- **WHEN** a supplied identity is malformed, absent, draft, unpublished, a development snapshot or supported by ambiguous or contradictory release metadata
- **THEN** resolution fails without replacing it with another version

#### Scenario: SQLite development download
- **WHEN** a SQLite download is a development snapshot rather than an identified published release with sufficient full-source/integrity metadata
- **THEN** resolution rejects it even when it is hosted by the official upstream

#### Scenario: Newest stable metadata is insufficient
- **WHEN** the newest stable release lacks sufficient official archive or digest metadata
- **THEN** resolution fails without choosing an older stable release or a prerelease

### Requirement: Repository-recorded official source identities

The source lock SHALL record each exact version, official archive URL, digest algorithm and expected digest before production acquisition uses it. A new pin SHALL use the official published archive digest: SQLite SHA3-256 or sqlite-vec release-asset SHA-256. Missing, malformed or ambiguous official version/archive/digest metadata SHALL fail resolution; a self-computed download digest SHALL NOT authorize a new pin.

#### Scenario: New official source pin
- **WHEN** a new published stable or prerelease source has sufficient official release and archive-integrity metadata
- **THEN** resolution emits its exact identity and official digest for recording in the candidate repository state before production acquisition

#### Scenario: Missing official digest
- **WHEN** an otherwise admissible released archive has no usable official published digest
- **THEN** resolution fails without authorizing the archive from a digest computed on its downloaded bytes

#### Scenario: Incomplete source lock
- **WHEN** acquisition receives a lock with missing, malformed or inconsistent required identities
- **THEN** it fails before exposing or using any source tree

### Requirement: Fresh acquisition and complete handoff

Each invocation SHALL acquire sources in a fresh temporary workspace under ignored `.work/`, without relying on a cache, earlier extracted trees or unpublished files. Both archives SHALL pass integrity and extraction/content checks before the invocation reports a successful pair handoff. A failed invocation SHALL NOT fall back to earlier outputs.

#### Scenario: Clean checkout
- **WHEN** acquisition runs from a clean checkout with the documented existing prerequisites and tracked source pins
- **THEN** it obtains and verifies both inputs without an installed WASM SDK, pre-existing source output or necessary cache

#### Scenario: Earlier temporary trees exist
- **WHEN** acquisition runs with existing files under `.work/`
- **THEN** it uses a new workspace and freshly downloaded archives rather than those earlier inputs

#### Scenario: Second source fails
- **WHEN** one source succeeds but the other fails download, integrity, extraction or required-content checks
- **THEN** the invocation fails without reporting a usable source pair or falling back to previous trees

#### Scenario: Successful pair handoff
- **WHEN** both inputs pass the required acquisition checks
- **THEN** the invocation reports their temporary source locations and the exact lock identity consumed, without claiming build compatibility or product acceptance

#### Scenario: Acquired prerelease identity
- **WHEN** a recorded source pair includes a published sqlite-vec prerelease and both archives pass integrity, extraction and content checks
- **THEN** the handoff preserves that exact prerelease identity and recorded digest, without selecting a distribution channel or claiming build compatibility
