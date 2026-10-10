# Proposal

## Why

The reconciled `A-inputs` admits official published prereleases, but source selection and lock validation still reject them. Correct that acquisition boundary while retaining exact release identities, frozen pins and integrity before use.

## What Changes

- Accept explicitly selected published sqlite-vec alpha, beta and release-candidate versions with sufficient official release assets/digests; retain exact suffixes in locks and handoffs.
- Retain independent latest-stable resolution when either helper argument is omitted. Drafts, unpublished records, development snapshots and malformed/ambiguous metadata remain failures, without fallback.
- Preserve official SQLite release/full-source identity checks. SQLite download snapshots are not published numbered releases; do not invent an archive/publication convention for them.
- Extend acquisition regressions and documentation; keep existing stable pins, source-lock schema and acquisition guarantees.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `upstream-inputs`: published stable/prerelease admissibility, exact identity preservation and unchanged acquisition guarantees.

## Impact

Only `A-inputs` is realized: `tools/inputs.py`, its authored tests, source-acquisition documentation and this capability's contract. No runtime/build, channel calculation, watch, dispatch, packaging or publication implementation changes. `browser-build` retains its stable-only restriction for a separate Change; acquisition success does not establish full prerelease support or compatibility. Historical Changes/evidence and the engineering projections remain unchanged.

## Allocation and source snapshot

Allocation unit: `A-inputs`, from `.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md` at `2553a7faaccd9183a984c4c068befd186b7e1e13`, SHA-256 `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`.

Qualified obligations: Distribution `C-purpose` (official selected inputs), `C-inputs` (released-input admissibility, origins, pins/digests, integrity, acquisition preference/exceptions and no vendoring), `R-inputs` (full SQLite tree and sqlite-vec amalgamation); Release/Watch `C-provenance` (exact input versions/origins/digests). Read the current Capture bytes identified in the Allocation; channel ownership remains with `A-release`, build reproduction with `A-build`, complete production/browser proof with `A-acceptance`.
