# Design

## Context

See [proposal](proposal.md) for motivation and [the delta](specs/browser-package/spec.md) for behavior. A design is needed because archive contents, npm exposure, upstream asset references and downstream byte identity interact.

At baseline `14c4c8fc545cd69ee083632505cbaf581905e6b0`, `tools/build/build.mjs` emits schema-version-1 handoffs with `inputs`, `build`, `runtimeDirectory`, `runtimeFiles` and `logPath`. `tools/build/config.mjs` defines eleven files for the pinned SQLite `3.53.4` / sqlite-vec `0.1.9` pair. `docs/build.md` requires downstream consumers to validate declared sizes/hashes and retain temporary build/input directories until consumed. There is no product package manifest or packaging implementation. Existing browser checks consume raw constructed assets; they do not establish final-package acceptance.

Inspection of a fresh, digest-verified A-inputs acquisition during planning confirms that the sqlite-vec amalgamation archive contains only `sqlite-vec.c` and `sqlite-vec.h`. The SQLite archive includes `LICENSE.md` and `ext/wasm/api/sqlite3-license-version-header.js`; the latter identifies Emscripten glue licensing as well as SQLite's public-domain terms. sqlite-vec's official `v0.1.9` tree supplies `LICENSE-MIT` and `LICENSE-APACHE`. Packaging cannot rely solely on license files in the acquired amalgamation.

## Goals / Non-Goals

**Goals:** Make the copied runtime independent of build directories; retain all eleven upstream assets unchanged; provide direct filename access and one final archive that downstream consumers can identify and test.

**Non-Goals:** Choose the npm namespace or project-version policy, establish registry configuration, create publication automation, rebuild the engine, or claim the complete A-acceptance gates. Those responsibilities remain with their allocated owners.

## Decisions

### 1. Thin explicit handoff consumer

Add `tools/package.sh` and plain ES-module helpers under `tools/package/`, using the existing qualified SDK Node/npm through `tools/harness.sh exec`. Proposed contributor invocation is `bash tools/package.sh --build-handoff PATH --name PACKAGE_NAME --version PROJECT_VERSION`. Names/versions are explicit caller inputs, validated as package metadata; there is no latest resolution, default release version or registry probe. A-release will supply them under its own identity policy; fixtures may supply nonpublished test identities.

Validate the handoff schema, source-lock digest and recorded pair, and match its file inventory to `runtimeNames`. Reject unsafe or duplicate names, symlinks/special files, missing/empty files and size/hash mismatches. Read each runtime file once into the bytes that are hashed and written, then rehash the copied bytes. This prevents a validate-then-copy gap from accepting different content. The handoff carries build provenance; validating its hashes does not prove acceptance or revision applicability.

Alternative: rebuilding inside packaging would conceal which A-build output was consumed, duplicate responsibility and complicate downstream identity. A generic packaging framework adds no demonstrated value.

### 2. One flat upstream runtime layout

Create a new ignored `.work/package/run-<unique>/assembly/` with the eleven runtime files at its root. Keep original names, relative placement and bytes; do not minify, bundle, rewrite imports, rename assets or add an initialization wrapper. Upstream supported asset-location mechanisms remain available.

The generated `package.json` has explicit filename subpath exports for all eleven assets, plus metadata access as needed. It introduces no root convenience entry, Node-specific runtime condition, install/build lifecycle script, runtime dependency or `sideEffects: false` assertion. `.js` files retain conventional browser-script usage; `.mjs` files retain upstream module usage. npm acquisition supplies files, and consumers host/copy the complete set using the documented layout. Merely installing the package does not cause browser URLs to resolve inside `node_modules` automatically.

Alternative: selecting only the ESM entry or hiding companion files behind a restrictive export map would narrow the baseline. A new root wrapper would establish an additional surface before a need is demonstrated. Splitting workers/WASM into separate directories would require asset-location glue.

### 3. The same tarball serves both channels

Run the harness-pinned `npm pack --ignore-scripts --json` against the isolated assembly, with an explicit generated file allowlist. The npm-compatible `.tgz` with its `package/` prefix is also the downloadable GitHub Release asset. No separate ZIP or second archive is needed: using the same archive is a conservative realization of the confirmed common-payload decision and reduces opportunities for drift. A-release publishes this artifact later; packaging never invokes `npm publish`.

Inspect the actual tarball, reject extra/missing/unsafe/duplicate entries, extract it into a new isolated directory and compare runtime names/sizes/digests with both the assembly and build handoff. Check included metadata, documentation and notices too. Local npm installation of this tarball into a disposable consumer fixture, with scripts disabled and no dependencies/compiler, establishes packaging consumability, not Node.js runtime support. No packlist dry run substitutes for final archive inspection.

Alternative: two independently packed envelopes would require another content-equivalence check while providing no contracted benefit. Archive-byte reproducibility is not promised; each invocation identifies its actual final bytes.

### 4. Controlled notice inputs and portable metadata

Add repository-controlled notice texts/metadata under a dedicated packaging-input directory. Preserve upstream origins, associated release/toolchain version and content digest for each included text. Include sqlite-vec's two supplied license texts, SQLite's source/license information, applicable Emscripten-generated-glue license texts and the project `LICENSE`, keeping their applicability distinct. Retain embedded runtime notices by preserving bytes. These are notice inputs, not vendored upstream source trees.

Already recorded source archives remain the authority for runtime sources; there is no runtime download or floating license fetch during packaging. For a future input/toolchain change, incompatible or missing notice associations fail until reviewed notice inputs are reconciled. The implementation audit must account for notices actually needed by the generated runtime; build-only tools are not included merely because they participated in construction. Additional applicable notices are included if that audit finds them, within this licensing responsibility.

The assembly includes focused consumption documentation and a portable runtime manifest with upstream versions/digests, source-lock identity, runtime relative names/sizes/SHA-256 and build environment/options. Represent temporary source/bridge paths explicitly as non-consumer provenance rather than required runtime locations. The internal package handoff retains the original build provenance. Do not identify the mixed upstream payload solely as project-authored Apache-2.0 material.

Alternative: fetching notices at pack time would introduce an unrecorded input and unnecessary network dependency. Treating the C/header archive as a complete licensing inventory would omit notice material.

### 5. Success-only final output identity

Keep assembly, archive, extracted-check copies, logs and reports under the invocation's ignored workspace. After content/integrity checks, atomically write a version-1 package handoff and emit matching JSON on stdout; progress goes to stderr. It identifies package name/version, source lock/upstream identities, original build provenance, final archive path/size/SHA-256, final runtime relative paths/sizes/SHA-256 and all other shipped-file identities. Identify complete final contents outside the archive to avoid a self-referential archive digest. No previous package is selected on failure.

A-acceptance consumes the identified final archive/extracted assets and owns full browser evidence. A-release consumes the same archive and matching digests; any repack or identity change must be covered by its applicable acceptance evidence. Package success means content/integrity assembly succeeded, not that browser acceptance, authoritative-revision applicability, tag or publication exists. Browser packaging-check reports are separately identified and their scope is explicit.

After successful assembly the original build/source workspaces can be removed by their caller; the package keeps no runtime dependency on them. Failed invocations retain diagnostics without exposing a success handoff. Cleanup is explicit and limited to the caller's invocation directories.

### 6. Check the final archive at its real boundary

Add offline tests with small synthetic handoffs for malformed input, current-lock mismatch, complete inventory, changed bytes, unsafe/nonregular files, notice mismatch, copy/pack failure, stale-output isolation and final archive omissions/changes. Register this suite in `tools/test-repository.sh`; an implemented package helper without its mandatory test suite must fail that entry point.

Add `tools/package/check.mjs` using the existing browser/server harness. Extract the actual tarball to a separate fixture, serve it at a non-root URL prefix and keep test pages/workers outside the runtime payload. Exercise conventional, ESM and bundler-friendly main-thread/Worker loaders and Worker1/promisers, verify SQL and pinned SQLite/vec versions, and exercise companion resolution for applicable OPFS VFSes. Record browser version and hosting conditions. Default promiser relative URLs and supported upstream location options are checked without rewriting sources; runtime-asset network requests must stay within the packaged runtime mount.

Remove WASM/Worker/proxy files in disposable extracted copies and check that the affected capability cannot initialize successfully; a bounded timeout is recorded as failure, not silent success. Request unavailable persistence and confirm preserved failure/no transient substitution. Recheck file hashes after tests; test probes do not enter the archive. Existing A-build probes/helpers can be reused or factored only as needed without changing `browser-build` requirements.

These checks demonstrate packaging content and resolution, not the full deterministic vector/Hamming gates, runtime-restart persistence or hosted production CI. A-acceptance remains responsible for them. Offline fixtures do not substitute for the real-archive browser checks during Apply/Verification.

## Risks / Trade-offs

- npm exports can hide required companion files → Enumerate every retained filename, inspect the tarball and test local consumption plus static hosting.
- Flat files preserve upstream references but do not solve every consumer bundler's URL handling → Document the supported upstream layout/mechanisms and retain bundler-friendly variants without universal compatibility claims.
- Source/archive identities alone do not establish notice completeness → Trace notice texts to pinned releases/toolchain, audit generated runtime licensing and fail on missing required material.
- Repacking after acceptance can invalidate byte identity → Supply one hashed archive for both channels and leave evidence applicability to A-acceptance/A-release.
- Real-browser reconstruction may encounter existing harness limitations → Use the qualified harness and record failure as a blocker, never as a skipped successful check.

## Migration Plan

There is no existing published packaging surface to migrate in this checkout. Add packaging tooling and inputs on this Change's branch, run offline and qualified final-archive checks, then use the repository's distinct 42P Verification and Archive stages. Reverting this Change removes the new tooling/inputs without modifying acquired upstreams or A-build outputs. No publication or registry rollback is part of this plan.
