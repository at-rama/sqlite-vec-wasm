# browser-package Specification

## Purpose

Assemble the canonical browser runtime from A-build into a consumer-ready distribution with working asset resolution, upstream notices and traceable final bytes. This capability realizes `A-package` and supplies A-acceptance and A-release.

## Requirements

### Requirement: Validated build input

Packaging SHALL consume an explicit successful A-build handoff and verify its source-lock identity, input versions/digests and complete runtime inventory against the repository state being packaged. Each consumed file SHALL match its declared size and SHA-256. Missing, altered, unsupported or ambiguous input SHALL fail packaging without using earlier outputs.

#### Scenario: Matching constructed runtime
- **WHEN** the handoff identifies the recorded source pair and every expected runtime file matches its declared size and digest
- **THEN** packaging consumes those exact files without acquiring a different engine or compiling another runtime

#### Scenario: Invalid handoff or changed bytes
- **WHEN** the handoff is incomplete, unsupported, inconsistent with recorded inputs, or declares missing, duplicate, unsafe, nonregular, empty or altered runtime files
- **THEN** packaging fails without a successful package result or substitution of previous output

### Requirement: Complete conservative runtime assembly

The distribution SHALL retain the complete pinned canonical browser runtime from A-build, including all required loaders, Worker1/promiser variants, proxies and WASM assets. It SHALL preserve upstream names, bytes and relative layout, expose supplied bundler variants, and exclude demos, benchmarks, test applications, intermediate engines and optional experimental variants.

#### Scenario: All retained loading surfaces
- **WHEN** the final distribution is inspected
- **THEN** conventional JavaScript, ESM and supplied bundler-friendly loaders and their Worker1/promiser companions, the shared WASM and required proxies are accessible directly

#### Scenario: Unrelated build files
- **WHEN** upstream build directories contain demos, benchmarks, tests, sources or intermediates alongside the required runtime
- **THEN** the distribution contains only the defined runtime and its package metadata, notices and consumption documentation

### Requirement: Independent packaged asset resolution

Final packaged loaders, workers, promisers and proxies SHALL resolve their companion assets under the pinned upstream's supported browser/hosting conditions from the documented package layout. Resolution SHALL work independently of temporary build/source directories. Supplied bundler variants SHALL remain accessible without promising compatibility with every bundler.

#### Scenario: Relocated extracted distribution
- **WHEN** the final archive is extracted separately and hosted at a non-root URL prefix using the documented upstream loading mechanisms
- **THEN** each retained loader, Worker1/promiser variant and applicable OPFS proxy resolves its packaged companions without fetching files from the build tree

#### Scenario: Missing companion
- **WHEN** a required WASM, Worker or proxy companion is removed from an extracted test copy
- **THEN** the affected requested capability does not initialize successfully and the packaging check reports failure

### Requirement: Consumer-ready distribution envelope

Packaging SHALL supply an npm-compatible archive usable for npm publication and GitHub Release download, with the same runtime payload for both channels and no consumer native/WASM compilation. It SHALL carry explicit supplied package identity metadata without selecting the shared version/revision/publication policy owned by A-release.

#### Scenario: Consumer installation and download
- **WHEN** the archive is installed locally as an npm package or extracted for static hosting
- **THEN** the complete browser assets are available without compiler tools, install-time builds or upstream acquisition

#### Scenario: Supplied identity
- **WHEN** packaging is invoked with a valid package name and project version
- **THEN** the generated package metadata carries those inputs and identifies the included upstream versions without claiming a tag, registry publication or accepted release

### Requirement: Preserved behavior and glue boundary

Packaging SHALL preserve A-build's browser APIs, SQL/vector semantics, default capabilities and storage limitations. Glue SHALL only initialize, locate or expose upstream functionality. It SHALL NOT add an application API, SQL abstraction, ORM, FluidJ behavior, Node.js/native/WASI runtime, upstream patch or silent transient-storage substitution for requested persistence.

#### Scenario: Direct upstream use
- **WHEN** a consumer initializes the packaged runtime through its upstream loading surface
- **THEN** the same upstream initialization/API behavior and statically integrated sqlite-vec functionality remain available without a new wrapper or consumer extension registration

#### Scenario: Unavailable requested persistence
- **WHEN** a requested persistent VFS lacks its required Worker, browser or hosting conditions
- **THEN** upstream failure or unavailability remains observable without silently opening transient storage

#### Scenario: Packaging requires a semantic change
- **WHEN** working packaging would require an upstream patch, altered behavior or omission of a retained capability
- **THEN** the incompatibility is escalated for an upstream authority revision rather than repaired by local reinterpretation

### Requirement: Complete licensing material

The distribution SHALL include required upstream licensing notices for the delivered runtime and retain embedded notices. Repository-authored licensing material SHALL distinguish its own license from those applicable to included upstream code. Missing required notices SHALL prevent a successful package result.

#### Scenario: Upstream archive lacks license files
- **WHEN** a verified source archive omits license texts required for binary redistribution
- **THEN** the package includes version-associated, repository-recorded upstream notice material with traceable origins rather than relying on that archive's contents alone

#### Scenario: Extracted license inventory
- **WHEN** the final archive is extracted
- **THEN** its required SQLite, sqlite-vec and included generated-glue licensing material is present alongside repository-authored license information

### Requirement: Traceable final package handoff

Successful packaging SHALL identify final runtime paths, sizes and SHA-256 digests, the archive identity/digest, notice and metadata contents, upstream versions/digests and build environment/options. It SHALL supply the exact final assets to A-acceptance and the verified payload identities to A-release without asserting full acceptance or publication readiness.

#### Scenario: Successful downstream handoff
- **WHEN** assembly and final-archive content/integrity checks succeed
- **THEN** one complete success result identifies the final bytes and their build inputs for downstream testing and publication

#### Scenario: Assembly or archive failure
- **WHEN** copying, notice inclusion, packing or final-byte checks fail
- **THEN** packaging returns failure without a success handoff, partial distribution represented as complete, or reuse of an earlier package

### Requirement: Generated outputs remain uncommitted

Generated SQLite JavaScript/WASM, package assemblies, archives and execution reports SHALL remain temporary and uncommitted. Only repository-controlled packaging inputs, code, tests and documentation SHALL enter source control; distribution use SHALL not depend on unpublished files or necessary pre-existing package outputs.

#### Scenario: Clean checkout packaging
- **WHEN** documented prerequisites and a fresh successful A-build handoff are available from a clean checkout
- **THEN** packaging can construct the defined contents from repository-recorded inputs without an earlier package or required cache

#### Scenario: Repository exclusion
- **WHEN** packaging completes or fails
- **THEN** its generated files remain in ignored or external temporary storage and are not committed as implementation inputs
