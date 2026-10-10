# Design

## Context

See proposal.md. A-inputs now validates and acquires official published sqlite-vec alpha/beta/RC versions. The build runs fresh production acquisition and compares the handoff to the lock's exact bytes, versions and digests before generating its separate static-initialization bridge. No stable-only parser or suffix stripping was found in build execution; the stale restriction is in the current contract and the lack of prerelease regression/evidence.

## Goals / Non-Goals

Demonstrate existing exact-identity construction for published prereleases and reconcile its contract. Keep the A-inputs trust boundary instead of implementing another release resolver or version policy. Build/browser checks use raw runtime assets; packaging and final-package acceptance remain downstream.

## Decisions

1. Remove the obsolete stable qualifier from static registration and add observable prerelease/identity-drift scenarios to the existing input, registration and handoff requirements. Preserve all other requirement bodies/scenarios. The canonical browser baseline, upstream storage conditions, nonmodification, diagnostic retention and reproduction obligations apply equally to prereleases.
2. Extend the existing offline fixture with test-only exact sqlite-vec identities and handoff mutations. Exercise alpha/beta/RC success and mismatched suffix/digest/lock failures before generation/compilation. Assert frozen acquisition arguments, unmodified source fixtures, actual options and complete atomic handoff identity. Avoid a new runtime version parser: A-inputs already owns admissibility and build already compares identities literally.
3. Keep production code/options/harness unchanged if these tests and real construction establish conformity. Any necessary implementation fix must follow the same obligations; a source patch, narrowed browser inventory or semantic change cannot be used to make a failing prerelease pass.
4. Resolve official SQLite 3.53.4 plus sqlite-vec 0.1.10-alpha.4 with the production acquisition helper in an isolated checkout. Commit only its test pins locally, outside the PR, then reconstruct from empty source/tool/npm state using pinned harness install/check/deps/smoke, production build and existing raw-runtime browser comparison. Recompute runtime output digests, inspect exact runtime versions in independent connections and compare upstream source files to their verified archive contents. The separate canonical reference shares config/check helpers and browser probes; disclose these dependencies rather than claiming independent implementation verification.
5. Update build documentation and the acquisition page's now-stale downstream-build limitation. Keep the broader product/packaging/acceptance limitation explicit. No release channel output or project pin update.

## Risks / Trade-offs

- A published prerelease may be incompatible with pinned tools or upstream recipes → fail with diagnostics and escalate, without upstream patches or fallback.
- Authored fixtures may share assumptions with the implementation → supplement with real official sources, separate source-byte/hash assertions and browser observations; finite evidence cannot prove all pairs.
- SDK extraction may truncate in managed workspaces → use the documented empty external HARNESS_STATE and keep mandatory integrity checks.
- Network/system prerequisites may block real verification → record available evidence and a blocked verdict; do not archive unsatisfactory Verification.

## Migration Plan

No source-lock schema, build handoff or tool migration. Existing stable pins and commands remain unchanged. Contract/docs/tests correction is reversible; adoption remains through human PR integration without product publication.
