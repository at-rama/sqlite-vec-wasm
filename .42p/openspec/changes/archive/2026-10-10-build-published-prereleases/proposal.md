# Proposal

## Why

A-build must consume A-inputs' exact official released pair, including published prereleases. After #29, the acquisition validator permits these identities and the build orchestrator already retains their complete strings. The synchronized browser-build static-registration requirement still incorrectly says stable-only, and the build suite demonstrates stable pins only.

## What Changes

- Reconcile static registration with the selected official published sqlite-vec release, including alpha/beta/RC, without weakening any browser/build obligation.
- Make exact prerelease identity, verified frozen handoff, metadata/digest drift and failure behavior explicit in the relevant build scenarios and regression tests.
- Document admissible inputs and exact handoff identity; retain existing production commands, pins, tools, options, upstream source boundary and latest/fallback exclusions.
- Reconstruct a real official stable-SQLite/prerelease-sqlite-vec build and compare its raw browser runtime against the same canonical SQLite baseline in an isolated clean checkout.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `browser-build`: published prerelease input applicability and exact input/handoff identity.

## Impact

Only A-build: its realization contract, build tests and contributor documentation, with execution changes only if established necessary within these obligations. Inspection found no separate stable-only parser in the build orchestrator; do not duplicate A-inputs' version/admissibility validation. No changes to A-inputs, harness pins, repository source pins, packaging, final-package acceptance, channel/release policy, engineering projections or historical archives. Successful raw-runtime construction/checks do not establish complete product prerelease support or general pair compatibility.

## Allocation and Capture snapshot

`A-build` in `.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md` at main `8da7f089912033f8667c3e9028bd9e6e33a7f00c` (integrated #26 and #29), SHA-256 `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`.

Qualified Capture portions: D/C-purpose and D/C-nonmodification (browser runtime and integration limits); D/C-inputs (admissible released inputs, pinned tools/options, clean construction); D/R-inputs (same-release core/WASM/JS from full sources); D/C-browser (retained canonical baseline); D/C-static (registration on every connection); D/C-storage (upstream storage conditions/prerequisite documentation); W/C-provenance (exact build tools/options/environment and input identities including suffixes).

Distribution Capture `2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md` SHA-256 `6a1cf2ef1e475cc615ea760c8b823fc791d06cc968c807a09e78e412a2aa635a`; Release/Watch `2026-10-09_sqlite-vec-wasm_release-watch_capture_edit-0.1.md` SHA-256 `790317a6b6a151648f559b0e3df0e9430a422d67af48b039ce520d71b9ff4eda`. All three exact Capture inputs, including Site, remain listed in the Allocation. Original-source audit is excluded.
