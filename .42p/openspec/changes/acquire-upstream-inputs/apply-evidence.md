# Apply evidence for A-inputs

Recorded on 2026-10-05 after separate implementation authorization, from clean
branch baseline `f4e6841a4b9fbf08125f1fbf9a423311b430a971`. This is the Apply
handoff for distinct 42P Verification; it is not that Verification's verdict.
The allocation and delta requirements remain unchanged. No build compatibility,
browser acceptance, archive, merge or publication is claimed.

## Official selection and integrity

The initial resolver ran with both versions omitted, against the official
SQLite download product rows and all returned sqlite-vec releases. SQLite's
release log confirmed its stable published identity. sqlite-vec metadata reported
`draft: false`, `prerelease: false` and a published `v0.1.9` release. Qualification
examples did not choose the pins. An additional real resolution with both exact
overrides and the existing baseline produced the same lock bytes.

| Project | Selected stable version | Official published digest, also observed in acquired bytes |
| --- | --- | --- |
| SQLite | 3.53.4 | sha3-256: `b834d474b9b393d85a9e3ee4cc11f1329e007e9376a424ee740796f5c4bda3a8` |
| sqlite-vec | 0.1.9 | sha256: `3acd67cb4aff080c7050926fd3cf8227905fe5b7ee3829d8ee5024ab1283cf61` |

The [recorded lock](../../../../inputs/sources.lock.json) supplies exact official
archive, release and digest-provenance URLs. It was staged before production
acquisition; its byte-level SHA-256 is
`4dfa30a7af5cee2e09d7021a48f904de8f3d295367ccc80db95f9c448ebec1c8`.
Every handoff reported that same consumed-lock digest. Two real repository
acquisitions used distinct workspaces and left the lock byte-for-byte unchanged.

Initial resolution observations, retained with raw metadata under ignored
`.work/inputs/resolve-icn8f2pt/`:

| Official endpoint | SHA-256 of observed metadata |
| --- | --- |
| https://sqlite.org/download.html | `9cd376c2fb3a04ec2d6ca65bb1f8428631103d4c510d827c23cc979700735326` |
| https://api.github.com/repos/asg017/sqlite-vec/releases?per_page=100&page=1 | `7689b68083846637d49c81839ffc4f0833d7b235883518e03cf783ac4b66d1bb` |
| https://sqlite.org/releaselog/3_53_4.html | `c8d12ef674ac295edba47c341cb18b5913795ba94a78474c68e4213970d128ac` |

## Executed checks

- `bash tools/inputs.sh resolve --output inputs/sources.lock.json`: passed,
  selected the independently latest stable pair and recorded official provenance.
- `bash tools/inputs.sh resolve --sqlite-version 3.53.4 --sqlite-vec-version v0.1.9 --output .work/inputs/explicit-pair.lock.json`:
  passed with automatically retained baseline pins; output matched the recorded lock.
- `bash tools/inputs.sh acquire --lock inputs/sources.lock.json`: passed twice
  in the working repository, with fresh archives, distinct source paths, verified
  digests, sufficient content, executable SQLite configure and complete handoffs.
- `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tools/tests -v`:
  24 tests passed. Fixtures are small repository-authored metadata/archives,
  not upstream source copies or real-network substitutes.
- `sh tools/check-repository.sh`: passed, including source-lock validation and
  the offline suite. An invalid SHA3-256 lock failed with exit 1. Replacing curl
  with an exit-99 stub still allowed the gateway to pass: no network was needed.
- `bash -n tools/inputs.sh`, Git whitespace checks and local documentation links:
  passed. Strict OpenSpec Change/all validation was run with telemetry disabled.

## Isolated reconstruction

An isolated Git checkout was constructed from the staged candidate snapshot,
committed locally and checked clean before acquisition. It contained no `.work/`,
SDK, browser, npm installation, source cache or generated output. The final
snapshot tree used for this run was `d8b825cca2c938e1deced734fa9a5d351e4c7386`; subsequent
changes only record this evidence, completion/status and contributor links.

With `PATH=/usr/bin:/bin` and existing HTTPS/proxy configuration retained,
`sh tools/check-repository.sh` passed all 24 tests and the documented acquire
command downloaded and verified both real official archives. The resulting
Git checkout remained clean. `git check-ignore` confirmed the workspace was
ignored; no acquired archive or source entered the tracked snapshot.

An earlier isolated attempt stripped the required proxy configuration and
failed DNS. It returned nonzero, removed its partial workspace and emitted no
handoff. Restoring the environment's HTTPS prerequisite resolved that test-setup
failure; source selection and integrity rules were unchanged.

The final isolated handoff used these temporary paths (caller-owned/disposable):

- sqlite: `/tmp/sqlite-vec-wasm-a-inputs-final-6chijtl4/checkout/.work/inputs/acquire-bwnmg2wu/sqlite/sqlite-src-3530400`
- sqliteVec: `/tmp/sqlite-vec-wasm-a-inputs-final-6chijtl4/checkout/.work/inputs/acquire-bwnmg2wu/sqliteVec`

Raw metadata, archives, handoffs and temporary checkouts remain ignored or outside
the repository. The following hashes identify the exact implementation tested:

| Repository-authored file | SHA-256 |
| --- | --- |
| tools/inputs.py | `3bacbe7568463468386cc584c8b775fb08e9b6fbd9cf1993f0d0966dedc1b9fa` |
| tools/inputs.sh | `560d12c50a0271e8a65f1de83d7712776f9a70240e823ae607dd0f82861cefa3` |
| tools/tests/test_inputs.py | `495b82c1ff72db1bce83fe5cf4a77ac2d675575be5213d84ed529865dc1d4895` |
| inputs/sources.lock.json | `4dfa30a7af5cee2e09d7021a48f904de8f3d295367ccc80db95f9c448ebec1c8` |
| tools/check-repository.sh | `14b45a0465155ddbf099437849608a17bd9342f2eea098a93cab137ebadcb573` |

## Requirement, scenario and task evidence

The existing [coverage table](coverage.md#bidirectional-mapping-within-a-inputs)
remains the allocation → requirement/scenario/task map. This table completes its
implementation/check direction. Test names refer to [the offline suite](../../../../tools/tests/test_inputs.py).

| Delta requirement and scenarios | Implementation and check evidence | Tasks |
| --- | --- | --- |
| Official stable source selection: both omitted; independent/both overrides; invalid/unstable selections | `select_sqlite`, `select_vec`, `resolve_command`; `ResolutionTests` cover overrides, drafts/prereleases/development/absent releases and malformed metadata; real latest and exact resolutions above | 1.2, 1.4, 1.5 |
| Frozen source pair without automatic fallback: new release during acquisition; candidate cannot proceed | `acquire_lock` consumes only frozen lock URLs; `test_fresh_downloads_frozen_pair_and_handoff`, both no-fallback metadata tests and failure tests; acquisition performs no release lookup | 1.3, 2.1, 2.2 |
| Repository-recorded official source identities: new pin; missing digest; incomplete lock | `validate_lock`, `recorded_lock`, `write_lock`; `LockTests`, missing-digest and incomplete-lock tests, candidate-index test; official lock/provenance above | 1.1, 1.2, 1.3, 1.5, 2.1 |
| Existing pin integrity is retained: official drift; acquisition independent of moving checksums | `preserve_pin`, baseline default, frozen acquisition; `PinTests`, baseline command test, unchanged real lock across acquisitions | 1.3, 2.1 |
| Verification precedes source use: matching archive; changed/incomplete archive | `digest_file` before `archive_members`/extraction; altered/truncated test proves archive inspection not invoked; HTTP, second-source and extraction failures; real matching digests above | 2.2, 2.3, 3.2 |
| Official sufficient archives without vendoring: sufficient sources; unavailable content; repository boundary | `archive_members`, `extract_file`, `source_root`; missing-content, unusable, vendored-SQLite, unsafe-path/link and executable-mode tests; isolated official acquisition and clean/ignored Git result | 1.2, 2.3, 3.2, 3.3 |
| Fresh acquisition and complete handoff: clean checkout; earlier trees; second-source failure; successful pair | `acquire_lock`, unique workspace and own-workspace cleanup; fresh/handoff, HTTP/second-source/extraction failure tests preserve older trees; two real acquisitions and final isolated reconstruction | 2.1, 2.3, 2.4, 3.2 |

## Scope and remaining stage

The implementation adds source helpers, an initial source lock, authored offline
tests and contributor instructions. The gateway and its documentation now run
those existing-system-tool checks. It changes no upstream SPEC/Capture/Allocation,
delta requirement/scenario, harness file, dependency manifest/lock or CI workflow.
No upstream source, build-chain manifest, compilation, dispatch/PR automation,
release deduplication or publication is introduced.

Apply's 12 tasks are complete. Distinct 42P Verification against A-inputs and the
Change remains the next stage; archive follows only a satisfactory verdict using
normal OpenSpec behavior. Pair compatibility and full product acceptance belong
to subsequent allocated responsibilities and are not asserted by this evidence.


## Alignment with main on 2026-10-06

The PR incorporates `main` at
`65728fb5879b966809d294e08d4c9493d979198e`, including PRs #13, #14 and #15.
They add the repository-owned Verification composition, the version-1 report
contract and independent `check`, `tests`, `verification` and `archive` jobs.
The prior Apply evidence above records the 2026-10-05 snapshot; it is not a
Verification verdict for this aligned candidate.

Acquisition helpers, source pins, the 24 acquisition tests, all seven delta
requirements and their 20 scenarios are unchanged from
`a813dae04b5ef7affbb6e019e47b374daa98dcff`. The harness, dependency records,
SPEC, Capture and Allocation are unchanged. All 12 tasks remain complete.
Source-lock validation remains in `check-repository.sh`; the acquisition suite
runs once through main's existing registration in `test-repository.sh`, alongside
the gate suite. Documentation now distinguishes these commands.

After alignment, `sh tools/check-repository.sh` passed,
`sh tools/test-repository.sh` passed 19 gate tests and 24 acquisition tests, and
strict OpenSpec validation passed. The generated verify skill and the
repository-owned composition skill are taken unchanged from main. The existing
correction removing synchronized canon as an Apply prerequisite is preserved.

The next stage uses [42p-verify-change](../../../.agents/skills/42p-verify-change/SKILL.md)
under [the Verification standard](../../../standards/verification.md). Its three
controls produce and commit `verification.md`; normal archive follows a
satisfactory verdict. The aligned PR deliberately retains its active Change
without that report: the new `verification` and `archive` merge gates cannot yet
pass. This alignment neither performs those stages nor invents a passing report.
