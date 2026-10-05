# Allocation and Change coverage

## Source snapshot and boundaries

Direct source: [Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), SHA-256 `4025fb3e203677d97bb952add6683f2ee8e4f83bad66fa065aa989084857a33b`, at baseline `36963803407ede039605f9c7dc8ce92cddd79cf9`. The [Capture](../../../engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) snapshot is `1fa058a1d65708d69495b59d8e04b42a38a2cccc3093f114db538edb52621b67`; [SPEC.md](../../../../SPEC.md) remains authoritative, snapshot `40d0cf9e9de1a70c95f6648cdbfa57ecd7c067c2c334344347ad6fc20f404eb4`.

This Change realizes only `A-inputs`, through `C-inputs`, `R-inputs` and the official-input aspect of `C-purpose`. The confirmed 2026-10-05 exploration supplies realization choices: independently latest stable or explicit exact versions, no automatic fallback, official digests with pin preservation, fresh acquisition, and existing dependencies only. It does not extend product scope or implement the invoking `A-updates` workflow.

## Bidirectional mapping within A-inputs

Requirement names identify the blocks in [the delta spec](specs/upstream-inputs/spec.md). Tasks identify [the implementation checklist](tasks.md); they remain unchecked. Each requirement's scenarios provide expected behavior, not acquired implementation evidence.

| Allocated content | OpenSpec requirement | Scenario coverage | Tasks |
| --- | --- | --- | --- |
| Official inputs; exact stable released versions; exclusion of draft/prerelease/alpha/beta/RC/development examples | Official stable source selection | Both omitted; each explicit independently; both explicit; invalid or unstable selection | 1.2, 1.4, 1.5 |
| Exact pins feed the build; selected identities remain the inputs, rather than an automatic compatibility search | Frozen source pair without automatic fallback | New release during acquisition; frozen candidate cannot proceed | 1.3, 2.1, 2.2 |
| Repository-recorded pins/digests before source use; no checksum downloaded alongside altered bytes can authorize them | Repository-recorded official source identities; Existing pin integrity is retained | New official pin; missing digest; incomplete lock; official digest drift; acquisition independent of moving checksums | 1.1, 1.2, 1.3, 1.5, 2.1 |
| Every downloaded input checked before use; mismatches fail | Verification precedes source use | Matching archive; changed or incomplete archive | 2.2, 2.3, 3.2 |
| Official release archives preferred when sufficient; no vendoring; submodules/recursive mirroring require demonstrated constraint | Official sufficient archives without vendoring | Sufficient official archives; required content unavailable; repository content boundary | 1.2, 2.3, 3.2, 3.3 |
| R-inputs context: full SQLite source tree and sqlite-vec amalgamation C/generated header without its repository/vendored SQLite | Official sufficient archives without vendoring | Sufficient official archives; required content unavailable | 1.2, 2.3, 3.2 |
| Verified inputs feed A-build; acquisition reconstructible without necessary cache, unpublished files or prior outputs | Fresh acquisition and complete handoff | Clean checkout; earlier trees; second source fails; successful pair handoff | 2.1, 2.3, 2.4, 3.2 |

All seven delta requirements map back to `A-inputs`; none is an independent new product obligation. The seven rows account for its material content, including contextual archive sufficiency. The independent-latest/default policy is a confirmed specialization of selection; official digests and fresh acquisition are confirmed implementations of recorded trust and clean acquisition. Bash/Python, JSON structure, command spelling and contributor documentation are design/task choices, not additional product requirements.

This is complete planning coverage of `A-inputs`, not full Capture coverage or full product acceptance. R-inputs' same-SQLite-release invariant remains owned by `A-build`; source acquisition supplies one SQLite release tree without claiming correct subsequent core/WASM/JS integration. Candidate pin changes remain a responsibility of the future `A-updates` caller, using this resolver; source helpers do not commit or adopt changes.

## Unit-scoped gate decision

The governing [OpenSpec usage canon](../../../standards/openspec.md#authority-and-lifecycle), revised on `main` at `79b773ff04fc432dd447e0415438cd9b6ddf3576` and integrated into this branch at `2460e0e4c6ce1310d329e17537d105fc84244c72`, requires each Change to realize exactly one allocation unit and both directions of coverage to be complete for that unit. It explicitly does not require other units to be proposed or synchronized first. The source Allocation, Capture and SPEC snapshots above are unchanged by that process revision.

**Coverage gate: PASS for `A-inputs` ↔ `acquire-upstream-inputs`.**

- **Allocation unit → Change: 100%.** The table accounts for every material obligation and acquisition context of `A-inputs` through the seven OpenSpec requirements, their 20 scenarios and the corresponding implementation tasks; no unit obligation is missing.
- **Change → allocation unit: 100%.** All seven requirements are grounded in `A-inputs` with the confirmed realization choices. There are no orphan requirements or additional allocation units in this Change.

The same-SQLite-release integration responsibility and the caller's candidate/publication responsibilities remain explicit composition boundaries, not missing `A-inputs` obligations. Other units have not been formalized by this Change; their absence is not a coverage failure or a prerequisite for its sync/Apply. The unit-scoped verdict claims neither complete product coverage nor implementation acceptance.

## Next stage

The next stage is `openspec-sync-specs` for this delta, followed by strict validation of the synchronized realization canon. Apply remains conditional on that synchronization and separate implementation authorization; distinct 42P Verification must follow implementation before archive. This planning update performs no sync, Apply or archive, leaves all 12 tasks unchecked and changes no product requirements, implementation files or repository canon.
