# Tasks

These tasks track initial Apply separately authorized on 2026-10-05 and the corrective work planned below. The mandatory 100% bidirectional allocation-unit/Change coverage gate preceded implementation; its mapping is recorded in [coverage](coverage.md). Other allocation units are not prerequisites. [Apply evidence](apply-evidence.md) records initial implementation and checks; [Verification](verification.md) records the previously checked candidate. The three subsequently identified CodeQL alerts require corrective Apply, then renewed 42P Verification before archive using normal OpenSpec behavior.

## 1. Official resolution and source lock

- [x] 1.1 Add the JSON source-lock schema and its standard-library validation in `tools/inputs.py`; verify malformed identities, missing fields, unsupported digest algorithms and inconsistent version/archive pairs are rejected by focused fixtures.
- [x] 1.2 Implement official SQLite release/full-source metadata resolution and sqlite-vec stable-release/amalgamation resolution; verify both omitted, each independently supplied, both supplied, unstable/absent explicit versions and missing official digests against recorded metadata fixtures, without acquiring upstream repositories.
- [x] 1.3 Implement atomic candidate-lock output and baseline-pin preservation; verify metadata drift fails without changing established pins, the pair stays exact, and resolver errors never select older versions or produce a partial lock.
- [x] 1.4 Add the `resolve` entry point using existing Bash/Python/curl and document explicit-versus-latest selection and official-metadata failures in contributor acquisition instructions; verify help and documented resolution commands use no new dependency or installed SDK.
- [x] 1.5 Resolve the initial pair under the approved selection rules, record official release/digest provenance, and add the reviewed `inputs/sources.lock.json` to the candidate Git snapshot; verify exact versions, official archive origins and published digests, without treating qualification versions as an implicit selection.

## 2. Verified fresh acquisition

- [x] 2.1 Add the `acquire` entry point that consumes the frozen lock without checksum refresh and downloads into a unique `.work/inputs/` workspace; verify repeated invocations download fresh archives and leave the lock byte-for-byte unchanged.
- [x] 2.2 Verify SHA3-256/SHA-256 before extraction; land negative archive fixtures and verify altered/truncated bytes or HTTP failure prevent extraction and return nonzero without a replacement version or previous-tree fallback.
- [x] 2.3 Extract the full SQLite tree and sqlite-vec C/header into separate invocation directories with required modes and content checks; verify unusable archives, absent required content and second-source failure produce no pair handoff and clean only that invocation's partial workspace.
- [x] 2.4 Emit the successful two-source handoff with temporary paths and consumed-lock identity only after all checks pass; verify paths/content and lock identity, and document source-tree lifetime, error behavior and the distinction from build compatibility/product acceptance.

## 3. Acquisition integration and evidence

- [x] 3.1 Integrate inexpensive offline source-tooling validation into `tools/check-repository.sh` when its implementation exists; verify the gateway stays network-free, passes valid fixtures and meaningfully fails an isolated invalid-lock probe without adding runtime/dependency installation.
- [x] 3.2 Reconstruct acquisition in an isolated clean checkout with empty source state and no installed SDK/tool/npm state, using the documented existing system prerequisites; record official origins, release classifications, expected/observed digests, resulting paths and command outcomes, then verify acquired archives/trees remain untracked and ignored.
- [x] 3.3 Review the final implementation diff against `A-inputs`, update its requirement/scenario/task evidence mapping and run the canonical repository check; deliver evidence for distinct 42P Verification, with no harness refactor, compilation, browser-acceptance claim, dispatch/PR automation, release deduplication or publication.

## 4. CodeQL fixture correction

CodeQL check `112184556619` on PR #10 reported three high-severity `Incomplete URL substring sanitization` alerts in `tools/tests/test_inputs.py`, at lines 194, 229 and 234 of commit `f3b99ffeff1c6958cb80fd0eb512817e0cc11f37`. These locations belong to the simulated fixture transport. The correction refines existing test evidence for tasks 2.1–2.3 without changing requirements, scenarios, design, allocation coverage, production helpers, source pins or dependencies.

- [x] 4.1 Replace the fixture transport's domain-substring selection with an exact URL-to-authored-archive mapping using the fixture lock; reject unexpected URLs instead of selecting a default archive. Replace the HTTP-failure and second-source-corruption conditions with comparisons to the exact SQLite and sqlite-vec fixture URLs, preserving their existing scenarios.
- [x] 4.2 Run `sh tools/check-repository.sh`, `sh tools/test-repository.sh` and strict OpenSpec validation from `.42p`; commit the correction, then confirm the new candidate's CodeQL analysis clears all three alerts without suppressions or exclusions. Record the correction and applicable check outcomes in Apply evidence for renewed 42P Verification.

After corrective Apply, invoke `42p-verify-change` on the clean committed candidate and update `verification.md` with its identity, findings and verdict, including the actual CodeQL result. The existing report does not establish conformity of the revised candidate or dispose of these alerts. Archive requires the renewed satisfactory verdict; updating this plan neither performs the correction nor authorizes archive.
