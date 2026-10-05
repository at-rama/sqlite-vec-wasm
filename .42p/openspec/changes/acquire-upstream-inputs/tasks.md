# Tasks

These tasks remain unstarted. Complete planning artifacts do not satisfy the cumulative coverage gate recorded in [coverage](coverage.md). Sync and separately authorized Apply must satisfy the repository prerequisites before implementation; this list does not waive them.

## 1. Official resolution and source lock

- [ ] 1.1 Add the JSON source-lock schema and its standard-library validation in `tools/inputs.py`; verify malformed identities, missing fields, unsupported digest algorithms and inconsistent version/archive pairs are rejected by focused fixtures.
- [ ] 1.2 Implement official SQLite release/full-source metadata resolution and sqlite-vec stable-release/amalgamation resolution; verify both omitted, each independently supplied, both supplied, unstable/absent explicit versions and missing official digests against recorded metadata fixtures, without acquiring upstream repositories.
- [ ] 1.3 Implement atomic candidate-lock output and baseline-pin preservation; verify metadata drift fails without changing established pins, the pair stays exact, and resolver errors never select older versions or produce a partial lock.
- [ ] 1.4 Add the `resolve` entry point using existing Bash/Python/curl and document explicit-versus-latest selection and official-metadata failures in contributor acquisition instructions; verify help and documented resolution commands use no new dependency or installed SDK.
- [ ] 1.5 Resolve the initial pair under the approved selection rules, record official release/digest provenance, and add the reviewed `inputs/sources.lock.json` to the candidate Git snapshot; verify exact versions, official archive origins and published digests, without treating qualification versions as an implicit selection.

## 2. Verified fresh acquisition

- [ ] 2.1 Add the `acquire` entry point that consumes the frozen lock without checksum refresh and downloads into a unique `.work/inputs/` workspace; verify repeated invocations download fresh archives and leave the lock byte-for-byte unchanged.
- [ ] 2.2 Verify SHA3-256/SHA-256 before extraction; land negative archive fixtures and verify altered/truncated bytes or HTTP failure prevent extraction and return nonzero without a replacement version or previous-tree fallback.
- [ ] 2.3 Extract the full SQLite tree and sqlite-vec C/header into separate invocation directories with required modes and content checks; verify unusable archives, absent required content and second-source failure produce no pair handoff and clean only that invocation's partial workspace.
- [ ] 2.4 Emit the successful two-source handoff with temporary paths and consumed-lock identity only after all checks pass; verify paths/content and lock identity, and document source-tree lifetime, error behavior and the distinction from build compatibility/product acceptance.

## 3. Acquisition integration and evidence

- [ ] 3.1 Integrate inexpensive offline source-tooling validation into `tools/check-repository.sh` when its implementation exists; verify the gateway stays network-free, passes valid fixtures and meaningfully fails an isolated invalid-lock probe without adding runtime/dependency installation.
- [ ] 3.2 Reconstruct acquisition in an isolated clean checkout with empty source state and no installed SDK/tool/npm state, using the documented existing system prerequisites; record official origins, release classifications, expected/observed digests, resulting paths and command outcomes, then verify acquired archives/trees remain untracked and ignored.
- [ ] 3.3 Review the final implementation diff against `A-inputs`, update its requirement/scenario/task evidence mapping and run the canonical repository check; deliver evidence for distinct 42P Verification, with no harness refactor, compilation, browser-acceptance claim, dispatch/PR automation, release deduplication, synchronization bypass or publication.
