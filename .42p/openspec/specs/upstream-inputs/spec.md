# upstream-inputs Specification

## Purpose
Provide exact official stable SQLite and sqlite-vec source identities and verified temporary sources for the browser build, implementing the source-selection and acquisition responsibility of `A-inputs`.

## Requirements

### Requirement: Official stable source selection

The resolver SHALL select an exact published stable version of each project from its official upstream. A supplied exact version SHALL take precedence independently for that project; an omitted version SHALL select its latest stable release. Drafts, prereleases, alpha, beta, release candidates and development snapshots SHALL be rejected, regardless of documentation examples.

#### Scenario: Both versions omitted
- **WHEN** neither project has an explicit version
- **THEN** the resolver selects each project's latest official stable release and returns both exact versions

#### Scenario: One explicit version
- **WHEN** an exact stable SQLite version is supplied and sqlite-vec is omitted
- **THEN** that SQLite version is retained and the latest stable sqlite-vec release is selected

#### Scenario: Explicit sqlite-vec or both versions
- **WHEN** an exact stable sqlite-vec version is supplied, alone or with an exact stable SQLite version
- **THEN** each supplied version takes precedence and only an omitted version is resolved to latest stable

#### Scenario: Invalid or unstable selection
- **WHEN** a supplied version is malformed, absent from official release records, draft, prerelease or a development snapshot
- **THEN** resolution fails without replacing it with another version

### Requirement: Frozen source pair without automatic fallback

The selected source pair SHALL be frozen before acquisition. Acquisition SHALL use those exact pins without re-resolving latest versions. Selection or acquisition failure SHALL terminate processing without an automatic older-version fallback or upstream repair; the helpers SHALL NOT replace the pair in response to a later compatibility failure.

#### Scenario: New release during acquisition
- **WHEN** another stable upstream release appears after resolution
- **THEN** acquisition retains the already frozen source pair

#### Scenario: Frozen candidate cannot proceed
- **WHEN** source processing fails or a caller reports an incompatible selected pair
- **THEN** the helpers provide no automatic replacement pair or repair

### Requirement: Repository-recorded official source identities

The source lock SHALL record each exact version, official archive URL, digest algorithm and expected digest before production acquisition uses it. A new pin SHALL use the official published archive digest: SQLite SHA3-256 or sqlite-vec release-asset SHA-256. Missing, malformed or ambiguous official version/archive/digest metadata SHALL fail resolution; a self-computed download digest SHALL NOT authorize a new pin.

#### Scenario: New official source pin
- **WHEN** a new stable source has sufficient official release and archive-integrity metadata
- **THEN** resolution emits its exact identity and official digest for recording in the candidate repository state before production acquisition

#### Scenario: Missing official digest
- **WHEN** an otherwise stable archive has no usable official published digest
- **THEN** resolution fails without authorizing the archive from a digest computed on its downloaded bytes

#### Scenario: Incomplete source lock
- **WHEN** acquisition receives a lock with missing, malformed or inconsistent required identities
- **THEN** it fails before exposing or using any source tree

### Requirement: Existing pin integrity is retained

For an already recorded source identity, the resolver and acquirer SHALL retain its recorded expected digest. Changed official metadata or downloaded bytes SHALL NOT silently replace that digest. An announced or observed digest mismatch SHALL fail the operation and require explicit upstream-authority handling outside automatic acquisition.

#### Scenario: Official metadata changes an existing digest
- **WHEN** resolution encounters a different official digest for a source identity already present in the supplied baseline pins
- **THEN** resolution fails and preserves the existing pin

#### Scenario: Acquisition is independent of moving checksums
- **WHEN** the acquisition command consumes the recorded lock
- **THEN** it checks downloaded bytes against that lock and does not fetch a replacement checksum or modify the lock

### Requirement: Verification precedes source use

Every downloaded source archive SHALL be verified against its repository-recorded cryptographic digest before extraction or other source use. Download, digest or extraction failure SHALL return failure and SHALL NOT expose sources for a build.

#### Scenario: Matching archive
- **WHEN** a complete downloaded archive matches its recorded digest
- **THEN** that archive is eligible for extraction

#### Scenario: Changed or incomplete archive
- **WHEN** downloaded bytes fail the recorded digest or the download is incomplete
- **THEN** acquisition fails before extracting or using that archive

### Requirement: Official sufficient archives without vendoring

Acquisition SHALL use the official SQLite full-source release archive and the official sqlite-vec amalgamation archive containing its C source and generated header. It SHALL NOT require upstream clones, submodules or recursive mirroring for these sufficient archives, and upstream source trees SHALL NOT be committed. An upstream constraint requiring a different acquisition mechanism SHALL stop this realization for explicit reconsideration.

#### Scenario: Sufficient official archives
- **WHEN** the two selected official archives are verified and extracted
- **THEN** acquisition provides the complete SQLite source tree and sqlite-vec C/header sources without obtaining a separate sqlite-vec repository or vendored SQLite copy

#### Scenario: Required content unavailable
- **WHEN** a selected archive cannot supply the required source content
- **THEN** acquisition fails without silently substituting a clone, mirror or unrelated source bundle

#### Scenario: Repository content boundary
- **WHEN** source acquisition completes
- **THEN** acquired upstream archives and trees remain outside tracked repository content

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
