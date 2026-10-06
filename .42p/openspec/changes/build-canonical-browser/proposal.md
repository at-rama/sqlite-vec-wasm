# Proposal

## Why

Verified upstream sources now exist, but the repository cannot yet construct the canonical browser engine with sqlite-vec statically integrated. Realize `A-build` so those inputs produce the browser runtime and a traceable handoff to packaging.

## What Changes

- Add a thin build orchestrator that checks the existing harness, acquires fresh sources through A-inputs, and drives the pinned SQLite Configure/Make recipes.
- Add one repository-authored C integration template, materialized temporarily with the verified sqlite-vec source path; use SQLite's supported extra-initialization mechanism to register sqlite-vec automatically on every connection.
- Build the conventional JavaScript, ESM and bundler-friendly browser variants while retaining the pinned default APIs, SQL capabilities and persistence VFSes.
- Emit a success-only build handoff with source identities, actual tools/options, runtime locations and output hashes; retain diagnostics on failure without reusing earlier outputs.
- Document clean-checkout reproduction and upstream browser/storage prerequisites, and add applicable build and browser checks scoped to A-build.

This Change realizes exactly `A-build` from [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, at baseline `3a0dc12b598f93b122a38e90f03452e3626d84e9`. [SPEC.md](../../../../SPEC.md) remains authoritative. The confirmed 2026-10-06 exploration selects the thin orchestrator, single static C bridge, explicit upstream targets, absolute source inclusion and fresh acquisition. The build-handoff proposal is retained as a realization detail in this requested planning capture. [Coverage](coverage.md) maps the unit in both directions.

## Capabilities

### New Capabilities

- `browser-build`: Reproducible canonical SQLite browser/WASM construction with static sqlite-vec registration, retained default capabilities and a traceable runtime handoff.

### Modified Capabilities

None. The existing `upstream-inputs` capability is consumed without changing its selection, integrity or acquisition requirements.

## Impact

Planned implementation adds `tools/build.sh`, build helpers/template and tests, using the existing acquisition and harness entry points. It records build options in repository-authored configuration and adds focused contributor documentation linked from the existing documentation entry point. It introduces no new third-party dependency or product API.

A-package owns consumer packaging, licenses and published payload assembly; A-acceptance owns complete CI and browser acceptance of final packaged assets; A-updates and A-release own candidate/publication workflows. No source pins, upstream source patches, packaging/publication workflows, generated skills or repository canon are changed by this planning PR. All implementation tasks remain pending; no compilation, product verification or archive is claimed.
