# Tasks

## 1. Handoff validation and conservative assembly

- [x] 1.1 Add `tools/package.sh` and the ES-module handoff validator using the qualified SDK environment; verify matching schema/source-lock/pair/inventory succeeds and malformed, stale-lock, duplicate, unsafe, missing, nonregular, empty and altered-file fixtures fail without a success result.
- [x] 1.2 Assemble the complete eleven-file runtime in a unique ignored workspace from the bytes validated against the handoff, preserving names/bytes/layout; verify copied hashes, exclusion of unrelated source/demo/intermediate files, fresh-run isolation and copy-failure behavior in offline tests.
- [x] 1.3 Add and register the packaging offline suite in `tools/test-repository.sh`, with a missing-suite failure when packaging is implemented; verify `sh tools/test-repository.sh` executes both the new suite and existing suites.
- [x] 1.4 Start `docs/packaging.md` with prerequisites, explicit handoff consumption and source/build workspace lifetime; verify its commands and paths match the implemented entry point and existing build documentation.

## 2. Package metadata, notices and consumer documentation

- [x] 2.1 Generate `package.json` from validated explicit package-name/version inputs with direct filename exports for every runtime asset, an explicit content allowlist, no runtime dependencies/install-build scripts/root wrapper and no tree-shaking purity assertion; verify metadata fixtures and asset subpath resolution without claiming Node.js product execution.
- [x] 2.2 Add repository-controlled upstream notice texts and provenance/version/digest associations for SQLite, sqlite-vec and applicable Emscripten-generated glue, alongside the project license; audit the emitted runtime's notice requirements and verify complete inclusion, embedded-notice preservation, and missing/incorrect-association failures in tests.
- [x] 2.3 Generate the portable runtime manifest from consumed identities and actual build environment/options; verify its versions and runtime hashes match A-build, temporary paths are not required consumer locations, and no acceptance/publication verdict is asserted.
- [x] 2.4 Add focused packaged usage documentation for conventional/ESM/Worker1/promiser/bundler-friendly filename access, keeping companions together and linking upstream browser/storage prerequisites; verify examples against the final layout and that no universal bundler support, main-thread OPFS or transient fallback is promised.

## 3. Final archive and downstream output identity

- [x] 3.1 Produce one npm-compatible `.tgz` through pinned `npm pack --ignore-scripts --json`, for unchanged use by both publication channels; verify the actual archive's exact allowed contents and extraction hashes, including tests rejecting omitted, extra, unsafe, duplicate or changed entries and failed packing.
- [x] 3.2 Add the atomic success-only package handoff with archive and all shipped-file sizes/SHA-256, upstream/source-lock identities and original build provenance; verify stdout/file equivalence, failure with earlier successful outputs, diagnostic retention, and no self-referential digest or inferred release readiness.
- [x] 3.3 Extend contributor packaging documentation with packing, inspection, downstream handoff and cleanup commands; verify a disposable local npm install of the tarball needs no native/WASM compiler, dependencies or install-time build, and that documented static-host extraction exposes the same runtime bytes.

## 4. Real-browser packaged resolution checks

- [x] 4.1 Add the final-tarball browser checker using existing browser/server helpers, a non-root runtime mount and separately located test probes; verify every conventional/ESM/bundler-friendly main-thread and Worker loader plus Worker1/promiser resolves only packaged runtime companions and reports the pinned SQLite/vec versions with usable SQL.
- [x] 4.2 Check the applicable OPFS companion-resolution paths and requested-unavailable persistence behavior, plus missing WASM/Worker/proxy and corrupt-asset negative copies; verify failures are reported rather than passed/skipped or silently substituted with transient storage, with bounded waits for failed initialization.
- [x] 4.3 Record archive/runtime identities, browser version, hosting conditions and resolution results in the checker report; verify post-check runtime hashes are unchanged and document the exact check invocation and its limits in `docs/packaging.md` without claiming Hamming, restart-persistence or complete CI acceptance.

## 5. Integrated reconstruction and review

- [x] 5.1 Execute the documented acquisition/build/package path from a clean checkout with empty generated state, using a nonpublished fixture package identity; verify a real final archive and successful scoped packaging/browser results without requiring earlier outputs or caches, and record commands, identities and available execution evidence in Change-local Apply evidence.
- [x] 5.2 Review the implementation against every A-package obligation and the recorded coverage, verify only repository-controlled inputs/code/tests/docs are tracked, and run `sh tools/check-repository.sh`, `sh tools/test-repository.sh` and strict OpenSpec validation from `.42p`; record outcomes and escalate any necessary semantic revision before resuming Apply.
