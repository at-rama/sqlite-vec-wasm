# Proposal

## Why

The browser package and final-package acceptance path exist, but no common distribution calculation or npm/GitHub publisher exists. A-release must turn an authorized integrated candidate into a uniquely identified publication of the exact qualified payload, and supply the same calculation to later watch and candidate workflows.

## What Changes

- Add deterministic distribution version/channel calculation and publication-state reading, shared by forecasts, preparation and final publication.
- Implement independent `latest`/`next` progression, numerical upstream increments, the maturity ceiling, alpha-series continuation/closure and collision failure.
- Add a post-integration publisher that establishes the authoritative revision, calculates the definitive version, runs existing clean production/acceptance with that identity and publishes the same archive to npm and GitHub Releases.
- Carry complete composition, source/build/output identities, channel and dispatch comment into publication provenance; use normal trusted publishing and supported attestations.
- Define the input boundary for an integrated A-updates candidate and the bounded A-bootstrap handoff without implementing either allocation unit.

## Capabilities

### New Capabilities

- `distribution-release`: shared distribution calculation, publication state, authorized post-integration qualification and matching npm/GitHub publication.

### Modified Capabilities

None. Existing `browser-package` and `browser-acceptance` already accept an explicit identity and expose exact payload/evidence handoffs; they are consumed without changing their requirements.

## Impact

Planned realization: `tools/release/`, a thin `tools/release.sh`, `.github/workflows/release.yml`, release tests registered in `tools/test-repository.sh`, and contributor publication documentation. Reuse `tools/acceptance/run.mjs`, `tools/acceptance/contracts.mjs` and the existing package/build handoffs. Release fixtures and generated evidence remain ignored or external.

This Change realizes exactly `A-release`. No watch/email, candidate-dispatch/PR preparation, registry/account bootstrap, site deployment, runtime/API change, source-pin migration or general 42p evolution. Implementing the publisher does not authorize a release. A-updates and A-bootstrap are operational dependencies; their absence is not permission to publish arbitrary main pushes or introduce a recurring manual path.

The first effective publication selected by the user is stable `0.1.0` on `latest`, with two stable upstreams. Experimental calculation/publication remains in scope for subsequent releases; prerelease cases are retained for future watch/candidate use. This is not authorization to publish an initial `0.1.0-alpha.1`, nor a general prohibition of officially released prereleases.

## Allocation and Capture snapshot

Start: `A-release` in [the current Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), read at main commit `ccbe98fac94bed8ed50eb031b304129741a09612`, SHA-256 `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`.

Qualified portions: Distribution `C-purpose`, `C-release`, `C-autonomy`, `C-failure`, `C-bootstrap`, `R-updates`; Release/Watch `C-determinism`, `C-version-identity`, `C-semver`, `C-channels`, `C-publication`, `C-provenance`, `R-frugality`. Read their complete selected obligations, exceptions and material relationships through the Allocation's qualified links. The neighboring units supply selection/integration context, package bytes and acceptance evidence; they do not own alternative numbering policies.

Exact current Capture snapshots:

| Capture | SHA-256 |
| --- | --- |
| [Distribution](../../../engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) | `6a1cf2ef1e475cc615ea760c8b823fc791d06cc968c807a09e78e412a2aa635a` |
| [Release/Watch](../../../engineering/2026-10-09_sqlite-vec-wasm_release-watch_capture_edit-0.1.md) | `790317a6b6a151648f559b0e3df0e9430a422d67af48b039ce520d71b9ff4eda` |
| [Site](../../../engineering/2026-10-08_sqlite-vec-wasm_site_capture_edit-0.1.md), Allocation input only | `4312d2c6f83bbfaae09cc9d23322d07f3d60f1e9203bc9588c4be5b24ba7b085` |

Additional operational clarification: in this project conversation on 2026-10-10, the user confirmed the first effective stable publication and explicitly retained prereleases for later watch and subsequent stages. No public permalink is available. This choice selects the initial publication case; it does not revise the attributed general release policy. Original-source-to-Capture fidelity is not audited here. The Allocation-to-Change examination is recorded in [coverage](coverage.md).
