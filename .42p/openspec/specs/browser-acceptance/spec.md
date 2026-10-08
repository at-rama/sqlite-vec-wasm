# browser-acceptance Specification

## Purpose

Establish complete production and real-browser acceptance for the final sqlite-vec-wasm package, with evidence bound to its evaluated source revision and payload. This capability realizes `A-acceptance`.

## Requirements

### Requirement: Clean production in CI

CI SHALL demonstrate acquisition, integrity verification, construction, verification and packaging from a clean checkout with documented prerequisites and recorded tool/source identities, without unpublished files, prior outputs or necessary caches. Reproduction SHALL cover defined functionality and contents, without requiring byte-identical rebuilds.

#### Scenario: Empty production state
- **WHEN** CI evaluates a repository revision with empty tool, dependency, source and output state
- **THEN** it obtains and verifies the recorded inputs and tools and completes the production path using documented prerequisites

#### Scenario: Production step fails
- **WHEN** a prerequisite, acquisition, integrity, build, verification or packaging step fails
- **THEN** acceptance fails without using earlier outputs or reporting a partial production path as successful

### Requirement: Final packaged asset consumption

Browser acceptance SHALL consume independently extracted final packaged assets and verify their correspondence to the recorded archive and runtime digests. It SHALL NOT substitute development/build-tree assets or another runtime payload.

#### Scenario: Relocated final archive
- **WHEN** acceptance extracts the final archive outside its build/source directories and hosts it under a non-root URL prefix
- **THEN** the browser uses the identified packaged loaders, WASM, workers and proxies with working companion resolution

#### Scenario: Payload identity fails
- **WHEN** archive or consumed runtime bytes differ from their recorded identities, or runtime resolution escapes the packaged asset mount
- **THEN** acceptance fails rather than certifying the substituted or altered payload

### Requirement: Initialization and independent connection versions

Acceptance SHALL establish main-thread and Worker initialization and SQL execution with SQLite and `vec_version()` matching the recorded pins on independently opened connections, without consumer dynamic loading or sqlite-vec registration.

#### Scenario: Main-thread and Worker connections
- **WHEN** supported conventional JavaScript and ESM packaged loading surfaces initialize and independently open C-style and OO1 connections on the main thread and in a Worker
- **THEN** each connection executes SQL and reports the pinned SQLite and sqlite-vec versions without consumer extension registration

#### Scenario: Missing or wrong extension
- **WHEN** a newly opened connection lacks sqlite-vec or reports an unexpected upstream version
- **THEN** acceptance fails even if another connection passed

### Requirement: FTS5 query behavior

Acceptance SHALL establish FTS5 virtual-table creation, fixture insertion and querying that returns the expected matches from the packaged runtime.

#### Scenario: Known text matches
- **WHEN** deterministic text fixtures are inserted into a newly created FTS5 table and queried
- **THEN** returned matching identifiers equal the expected set

### Requirement: Deterministic vector queries

Acceptance SHALL establish `vec0` creation, insertion and nearest-neighbor searches with deterministic fixtures returning independently expected identifiers and distances through the packaged runtime.

#### Scenario: Known Float32 neighbors
- **WHEN** deterministic Float32 fixtures are inserted and searched through vec0
- **THEN** identifiers, ordering and distances match expectations calculated independently of sqlite-vec, within an explicit justified floating-point tolerance

### Requirement: Binary Hamming queries

Acceptance SHALL establish binary `bit` vector insertion and nearest-neighbor queries returning independently known Hamming distances and ordering. Fixtures SHALL avoid ambiguous ties.

#### Scenario: Distinct binary neighbors
- **WHEN** bit-vector fixtures with distinct known query distances are inserted into vec0 and searched
- **THEN** returned identifiers and ordering match the independent expectations and Hamming distances match exactly

### Requirement: Worker1 and promise interface behavior

Acceptance SHALL establish that packaged Worker1 and its promise interface can open a database, execute sqlite-vec SQL, return expected results and close through their retained upstream loading surfaces.

#### Scenario: Worker1 lifecycle
- **WHEN** the packaged Worker1 protocol opens a database, executes SQLite/sqlite-vec SQL and closes it
- **THEN** it returns the expected rows and upstream versions and successfully completes closure

#### Scenario: Promiser lifecycle
- **WHEN** the packaged promise interface opens a database, executes SQLite/sqlite-vec SQL and closes it
- **THEN** its promises return the expected rows and upstream versions and successfully complete closure

### Requirement: Every default OPFS VFS survives runtime restart

Acceptance SHALL establish that every retained default OPFS VFS preserves committed ordinary and vector data through write, close, runtime/Worker termination, fresh initialization, reopen and query under the same origin. Reopened vector search SHALL return expected results without recreating or repopulating the database.

#### Scenario: OPFS write and fresh reopen
- **WHEN** each retained default OPFS VFS commits ordinary and vector fixtures, closes its connection and terminates its Worker/runtime, then a fresh runtime reopens the same database under the same origin
- **THEN** it reads the original ordinary data and returns independently expected vector-search identifiers and distances

#### Scenario: Persistence is unavailable or lost
- **WHEN** a retained default OPFS VFS is unavailable, cannot reopen, loses committed data or yields incorrect reopened search results
- **THEN** acceptance fails without skipping that VFS or substituting transient storage

### Requirement: Real-browser prerequisites and recorded conditions

Every mandatory gate SHALL execute in at least one real browser satisfying the pinned upstream's relevant prerequisites. Acceptance SHALL record browser versions, Worker/secure-context conditions and VFS-specific hosting/isolation conditions. Missing prerequisites SHALL NOT count as a pass or silently skip persistence.

#### Scenario: Supported browser execution
- **WHEN** the required suite runs in the selected real browser
- **THEN** its evidence records the actual browser version and applicable hosting/context prerequisites with explicit outcomes for every mandatory gate

#### Scenario: Prerequisite is absent
- **WHEN** browser, Worker, storage or isolation prerequisites required for a mandatory gate are absent
- **THEN** that gate prevents overall acceptance instead of becoming a skipped success

### Requirement: Packaged baseline preservation checks

Acceptance SHALL compare packaged public API/loading surfaces and default capabilities against the same pinned canonical SQLite browser baseline and detect accidental omissions. Supplied upstream bundler variants SHALL remain covered without promising compatibility with every bundler.

#### Scenario: Retained baseline
- **WHEN** packaged loading/API and capability results are compared with the same pinned unmodified baseline
- **THEN** documented C-style/OO1 APIs, BigInt, conventional/ESM and supplied bundler surfaces, Worker1/promisers, FTS5 and default VFS capabilities are retained, permitting sqlite-vec additions

#### Scenario: Baseline omission
- **WHEN** a retained API, loading surface, companion or default capability is absent from the package
- **THEN** acceptance detects the omission and fails

### Requirement: Revision and payload applicable evidence

Acceptance SHALL supply evidence identifying the evaluated revision and exact archive/runtime payload, upstream identities, production and browser outcomes, applicable to the authoritative revision actually released and exact payload published. A passing PR head SHALL NOT establish that applicability solely because it was merged.

#### Scenario: Authoritative revision is evaluated
- **WHEN** acceptance evaluates the authoritative revision and the exact archive supplied for publication
- **THEN** the recorded evidence identifies both and all mandatory successful production/browser results, enabling A-release to establish applicability

#### Scenario: Revision or payload differs
- **WHEN** the proposed authoritative revision or publication payload differs from the evaluated revision or bytes without evidence covering that difference
- **THEN** existing results do not establish publication applicability and fresh or otherwise demonstrably applicable evidence is required

### Requirement: Complete acceptance outcomes

Acceptance SHALL return failure on any mandatory failed or unavailable gate and retain available diagnostic outcomes with evaluated identities. A successful verdict SHALL require the complete required production/browser matrix; partial or historical results SHALL NOT substitute for missing current evidence.

#### Scenario: Complete success
- **WHEN** every mandatory production and browser gate passes for the identified revision and payload
- **THEN** the result supplies a complete successful acceptance record for downstream evaluation without claiming publication or human merge approval

#### Scenario: Incomplete or failed run
- **WHEN** a gate fails, remains unavailable or execution stops early
- **THEN** the operation returns nonzero and records available outcomes and diagnostics without issuing a successful acceptance handoff or reusing an earlier pass
