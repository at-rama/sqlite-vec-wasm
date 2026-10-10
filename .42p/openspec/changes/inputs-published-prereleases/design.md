# Design

## Context

See proposal.md for scope and the Allocation snapshot. The Python helper currently validates numeric stable versions everywhere; `stable_vec` rejects every GitHub prerelease. Lock schema version 1 already carries exact strings and immutable archive/digest provenance, so no schema extension is needed.

## Goals / Non-Goals

Preserve the existing command and handoff surface while accepting official sqlite-vec prereleases. No channel parameter, new dependency, acquisition adapter, build change or pin update is introduced.

## Decisions

1. Extend sqlite-vec exact-version parsing with upstream alpha/beta/rc SemVer suffixes, preserving the optional `v` normalization and rejecting development/range inputs. Separate published-release admissibility from latest-stable filtering. Validate publication/classification metadata before selecting an explicit release; a stable-looking tag with prerelease classification or a suffixed tag classified stable is contradictory, not an implicit channel decision.
2. Keep omitted-input resolution latest-stable, ordered by numerical version, rather than selecting the newest release of any maturity. Reject insufficient metadata for the selected release without fallback. Explicit tag lookup remains independent for each upstream.
3. Keep source-lock schema 1, exact official versioned URLs and existing digest provenance. All downstream acquisition checks apply unchanged to prerelease locks: staged bytes, frozen pair, hash before extraction, fresh workspace, sufficient content and failure cleanup.
4. Retain the established SQLite published-release/full-source mechanism. The official download page calls its prerelease snapshots unofficial development snapshots; these remain excluded by Distribution C-inputs. No numbered alpha/beta/RC release/full-source archive convention was established by upstream inspection, so do not manufacture one or strip a suffix to acquire a stable archive. A future release requiring another archive mechanism uses the existing explicit-reconsideration boundary, not a blanket product stable-only policy.
5. Update the current capability Purpose during synchronization and rename its selection requirement through the native delta. Do not rewrite historical archives, Captures, Allocation or `browser-build`.

## Risks / Trade-offs

- Release labels and suffixes can disagree → fail on contradictory metadata; never silently reclassify or replace an explicit version.
- A syntactically valid prerelease may lack a sufficient official amalgamation or digest → fail without a self-authorized digest or source substitution.
- SQLite release-format evolution remains upstream-dependent → fail closed; this correction demonstrates no SQLite prerelease format or snapshot acceptance.
- Acquisition can succeed while the build contract still rejects the selected maturity → document the remaining `A-build` correction; no end-to-end prerelease claim.
- Authored fixtures share implementation assumptions → supplement them with fresh official stable-SQLite/prerelease-sqlite-vec resolution/acquisition in an isolated checkout, without SDK/npm state.

## Migration Plan

Existing stable locks remain valid and unchanged. Explicit prerelease locks become usable by acquisition after review/staging. Removing the correction restores the old maturity limitation; no data migration or product release is required.
