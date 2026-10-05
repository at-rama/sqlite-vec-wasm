# Proposal

## Why

The harness verifies its tools but does not select or acquire the product sources. Realizing `A-inputs` provides exact official source identities and verified temporary source trees for the subsequent browser build, without requiring an installed WASM SDK for acquisition.

## What Changes

- Add source-resolution tooling that selects each project's latest stable release unless an exact version is supplied, rejects invalid or unstable selections, and freezes the resulting pair without automatic fallback.
- Add a tracked JSON source lock recording exact versions, official archive origins and cryptographic digests. New pins use official published digests; an existing pin cannot be silently replaced by newly fetched integrity data.
- Add fresh acquisition from that lock: download official SQLite full-source and sqlite-vec amalgamation archives, verify before extraction, and expose both source trees only after complete success.
- Add focused acquisition checks and contributor instructions using existing Bash, Python, curl and archive tools, without new dependencies, upstream vendoring or changes to the harness.

This is the first allocation only. Candidate triggering, release deduplication, build-chain fingerprints, harness separation, compilation, packaging, browser acceptance and publication remain outside this Change. An incompatible frozen pair must not be silently reselected by these helpers; compatibility itself is evaluated by later build/acceptance responsibilities.

## Capabilities

### New Capabilities

- `upstream-inputs`: official stable source selection, repository-recorded pins and digests, and verified fresh acquisition for `A-inputs`.

### Modified Capabilities

None. No synchronized OpenSpec capability currently exists.

## Impact

Implementation surfaces are `inputs/sources.lock.json`, `tools/inputs.sh`, `tools/inputs.py`, focused standard-library tests and acquisition contributor documentation. Names are realization choices; these surfaces were added during separately authorized Apply. The existing harness, dependency manifests, workflows and upstream engineering documents remain unchanged.

Direct derivation: [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md#a-inputs--upstream-selection-and-acquisition), handle `A-inputs`, SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, at repository baseline `36963803407ede039605f9c7dc8ce92cddd79cf9`. Its Capture handles are `C-inputs`, `R-inputs` and `C-purpose`; the Capture SHA-256 is `1fa058a1d65708d69495b59d8e04b42a38a2cccc3093f114db538edb52621b67`. [SPEC.md](../../../../SPEC.md) remains authoritative, SHA-256 `40d0cf9e9de1a70c95f6648cdbfa57ecd7c067c2c334344347ad6fc20f404eb4`.

The user approved the selection, integrity, fresh-acquisition and existing-dependency choices in the 2026-10-05 exploration preceding this request. They specialize `A-inputs`; they do not authorize implementation of other allocations. See [coverage](coverage.md) for the complete bidirectional `A-inputs`/Change mapping and the passed unit-scoped coverage gate under the revised canon. Other allocation units are not prerequisites for this Change. Apply was separately authorized on 2026-10-05. See [Apply evidence](apply-evidence.md) for implementation and checks. The next stage is distinct 42P Verification, then archive using normal OpenSpec behavior after a satisfactory verdict.
