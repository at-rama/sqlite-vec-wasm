# Design

## Context

See [proposal](proposal.md) for motivation and [upstream-inputs](specs/upstream-inputs/spec.md) for behavior. `tools/harness.sh` currently locks and verifies tooling only. Its architecture already lists Bash, Python 3, curl, tar and unzip as prerequisites; source acquisition needs none of its SDK or browser installation. No product source lock or synchronized OpenSpec capability exists at the recorded baseline.

This design is included because source authorization, immutable pins and the resolution/acquisition boundary benefit from explicit decisions before coding. The initial file names and command spelling below are realization defaults chosen here, not additional product requirements.

## Goals / Non-Goals

**Goals:** provide a small source-lock interface that future candidate orchestration can call; make each acquisition reconstructible and incapable of silently refreshing trust; hand verified temporary sources to the build.

**Non-Goals:** expose a new product API or runtime; install or refactor the harness; implement GitHub dispatch, PR management, historical-release scanning, release collision detection, a build-chain manifest, compilation, browser acceptance or publishing. Source resolution does not prove the selected pair's compatibility.

## Decisions

### Separate resolution from acquisition

Use `bash tools/inputs.sh resolve` and `bash tools/inputs.sh acquire`, backed by a small standard-library `tools/inputs.py`. The shell orchestrates curl and extraction; Python parses official metadata and JSON and verifies SHA-256/SHA3-256. No third-party module, runtime manager, npm dependency or new system executable is introduced. A Python-only downloader or the installed SDK Node would be possible, but using existing curl and system Python avoids custom HTTP handling and an SDK installation prerequisite.

`resolve` accepts independent optional `--sqlite-version` and `--sqlite-vec-version` values, a baseline lock when available, and an explicit output path. It resolves omitted values to each project's latest official stable release, then emits a complete candidate lock atomically. Explicit malformed or unstable values fail; neither source is silently replaced. Resolve does not stage, commit, open a PR or acquire source trees. The future `A-updates` caller owns recording its candidate changes.

`acquire --lock inputs/sources.lock.json` reads the already recorded lock without changing it or consulting moving checksum metadata. Production use records the candidate lock in the Git snapshot being verified before acquisition. A candidate emitted under `.work/` alone is not a repository-authorized production lock. Test fixtures may supply temporary locks for isolated negative tests; that does not establish production authority.

### Keep a source lock, not a complete build manifest

Propose `inputs/sources.lock.json`, with `schemaVersion: 1` and one entry each for `sqlite` and `sqliteVec`. Each entry records `version`, `archiveUrl`, `digest.algorithm`, `digest.value`, `releaseUrl` and `digestUrl`. The last two locate official release classification and digest provenance; all fields come from checked official metadata. Reject malformed structure, unsupported algorithms and inconsistent version/archive identities rather than guessing.

This lock contains source identity only. It has no source-revision field, output digest, historical-release inventory, toolchain fingerprint or publication identity. Later allocations can consume it without deciding the complete release manifest here. Do not maintain a duplicate set of source versions in shell constants or copy qualification fixtures into product pins as an implicit version selection. The initial production lock is generated from the approved selection rules during authorized implementation and reviewed as repository content.

### Resolve official metadata, not documentation examples

For SQLite, use official stable release records and the official full-source archive's published SHA3-256. The observed download page supplies machine-readable product rows with version, relative URL and SHA3 digest. Parse that source metadata instead of inferring the release year from today's date, selecting the WASM binary or treating a snapshot as a release.

For sqlite-vec, use `asg017/sqlite-vec` release metadata and the selected amalgamation asset's SHA-256 digest. Verify the release is published, not draft or prerelease, and its version is not alpha, beta, RC or a development snapshot. The examined stable `v0.1.9` provides this archive and digest; current documentation's alpha examples do not select product inputs. Use the release identity's version and official asset URL, not its example WASM recipe's SQLite version.

Support exact versions only, with documented normalization of sqlite-vec's official `v` tag prefix; reject ranges and moving aliases in explicit fields. Resolution of an old explicit release succeeds only if its stable identity and required official integrity metadata are available or retained in supplied baseline pins. If official metadata cannot substantiate a new pin, fail; do not calculate a digest from downloaded bytes and promote it to authority. Record the official endpoints and observations used by a resolution in temporary evidence.

### Preserve established trust

Compare a selected project's exact version and archive identity with supplied baseline pins before authorizing a new digest. Preserve matching pins. An official digest change, archive-identity substitution for the same established pin, or downloaded-byte mismatch fails without rewriting the baseline. Acquisition always checks the stored digest. Changes requiring new authorization are outside automatic operation.

The initial selection trusts the official release/checksum channels; it is not an independent upstream signature verification. Missing official metadata must fail closed. Do not invent a historical pin database in `A-inputs`: orchestration can supply retained pins when revisiting a source; preserving and retrieving published manifests belongs to later responsibilities.

### Fresh temporary workspace and complete handoff

Each acquire invocation creates a unique directory under `.work/inputs/`. Download both archives there with HTTP failures treated as failures and bounded transport retries; retries repeat the same source identity, never version selection. Verify each archive before extraction, extract into separate directories, preserve required executable modes, and check expected content: a full SQLite source root with its build/WASM tree, and sqlite-vec C plus generated header. Keep extraction within the invocation workspace.

Only after both sources succeed, emit a small machine-readable handoff with both source paths and a digest of the consumed lock. That digest associates the handoff with its source record; it is not the deferred build-chain fingerprint. Until success there is no handoff. On failure remove the invocation's partial workspace; never delete unrelated older directories or reuse them. On success the caller owns the temporary workspace lifetime. No persistent cache or stable extracted-tree path is introduced.

### Verify the acquisition responsibility proportionately

Use Python's standard-library test facilities and repository-authored tiny fixtures to exercise independent version overrides, unstable releases, official digest absence, existing-pin drift, malformed locks, changed/truncated archive bytes, content/extraction failure and complete-pair handoff. Network fixtures test parsing and error behavior; they do not stand in for real acquisition evidence.

An isolated clean-checkout acquisition with no SDK, source cache or outputs establishes the source path independently of tooling installation. A separate real official-archive run validates origins and digests. Add only cheap offline source-tooling checks to the canonical repository gateway when the implementation exists; network reconstruction remains an explicit validation step. Record commands and outcomes for subsequent distinct 42P Verification.

## Risks / Trade-offs

- Official metadata may move or omit an old digest: fail with the exact missing identity; do not silently weaken the integrity rule. A pinned acquisition remains independent of moving checksum pages.
- Fresh downloads use more network than caching: accepted for the two source archives; cache machinery is deferred until a measured need exists.
- Latest stable releases may be incompatible: keep the frozen pair, report the later failure and require human intervention; no compatibility search or source patch is introduced.
- A complete source tree is not an accepted distribution: source checks establish `A-inputs` only, not static integration or browser/API/persistence acceptance.
- Planning coverage is not implementation acceptance: the [coverage record](coverage.md) establishes the unit-scoped gate for `A-inputs`, while separately authorized Apply, distinct 42P Verification and archive using normal OpenSpec behavior remain subsequent stages. OpenSpec file-existence status proves none of those stages.

## Migration Plan

The `A-inputs`/Change coverage gate is satisfied under the revised canon. Obtain separate Apply authorization before adding the source tooling, generated/reviewed initial source lock, focused tests and contributor acquisition instructions. Distinct 42P Verification follows implementation, then archive follows normal OpenSpec behavior, including native delta-spec synchronization. No other allocation unit must be proposed or synchronized first. No harness migration or deployed runtime replacement is needed. Rollback removes those repository-authored surfaces and leaves acquired/generated state disposable under `.work/`.
