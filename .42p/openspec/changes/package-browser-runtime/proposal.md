# Proposal

## Why

A-build now supplies a traceable browser runtime, but its files still reside in temporary upstream build directories. Realize `A-package` so consumers and downstream acceptance can use an autonomous distribution assembled from those exact bytes.

## What Changes

- Validate the A-build handoff and assemble its complete canonical runtime without changing upstream file names, bytes or relative layout.
- Expose conventional JavaScript, ESM and supplied bundler-friendly loaders, Worker1/promiser companions, the WASM and OPFS proxy directly, without a new initialization wrapper.
- Produce one npm-compatible tarball from the common assembly, usable unchanged for npm publication and GitHub Release download.
- Include upstream licensing notices and focused usage material, with no consumer compilation or install-time build.
- Emit final-file and archive digests and a success-only package handoff for A-acceptance and A-release; check asset resolution from extracted deliverables independently of the build directories.

This Change realizes exactly `A-package` from [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, at baseline `14c4c8fc545cd69ee083632505cbaf581905e6b0`. [SPEC.md](../../../../SPEC.md) remains authoritative. The confirmed 2026-10-07 exploration selects direct upstream exposure, conservative assembly and a common runtime payload for both channels. Lower-level packaging choices are recorded in [design](design.md); [coverage](coverage.md) accounts for the unit in both directions.

## Capabilities

### New Capabilities

- `browser-package`: Consumer-ready browser runtime assembly, channel envelopes, licensing, asset resolution and traceable final output.

### Modified Capabilities

None. `browser-build` and `upstream-inputs` are consumed without changing their requirements.

## Impact

Implementation will add `tools/package.sh`, plain JavaScript packaging/check helpers and offline tests, repository-authored package/usage/notice inputs, and focused contributor documentation. It will register the offline suite in `tools/test-repository.sh` and use the existing qualified SDK Node/npm and browser/server helpers. Generated runtime files, archives and reports remain ignored. No new third-party runtime dependency is planned.

A-release supplies the package name/version and owns revision/tag/publication identity; A-package validates and carries those assembly inputs without selecting a release policy or claiming registry availability. A-acceptance owns full clean-production CI and final-payload acceptance, including Hamming fixtures and restart persistence. This proposal adds no candidate workflow, publication, bootstrap, source-pin change, upstream patch or product API. All implementation tasks remain pending; Verification and Archive follow Apply.
