---
schema_version: 1
change: package-browser-runtime
allocation_unit: A-package
checked_commit: 416afe1e99f832ed3a822537a79b5706889c3505
verdict: passed
coverage:
  allocation_to_change: 100
  change_to_allocation: 100
openspec_verify: passed
repository_checks: passed
applicable_tests: passed
---

# A-package Verification

## Institutional view

**PASS for `package-browser-runtime` / `A-package` at [candidate 416afe1](https://github.com/at-rama/sqlite-vec-wasm/commit/416afe1e99f832ed3a822537a79b5706889c3505).** This Verification completed satisfactorily: offline checks, fresh packaging and real-browser execution were renewed. Initial acquisition failed on proxy connection timeouts; a fresh retry succeeded with the recorded digests. Previous Apply tarballs/raw browser reports are unavailable and do not supply this pass. The new payload and primary results are accessible in this Work session through the links below; GitHub retains this durable account, not the temporary artifacts. The verdict establishes the scoped packaging obligations, not complete product acceptance or publication readiness. See the [renewed execution account](#renewed-execution-record).

### Command provenance

The examined command is [Allocation A-package](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md#L37-L45), grounded in `C-purpose`, `C-nonmodification`, `C-inputs`, `C-browser`, `C-storage` and `C-release`. Their relevant [Capture passages](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md#L14-L68) were compared semantically with SPEC's responsibility, inputs and distribution passages. That scoped examination found the runtime, preservation, asset, notice and identity boundaries consistent; it is not a complete upstream-authority audit. A-watch changes neither this unit's text nor its packaging obligations. Current source snapshots and the renewed coverage reasoning are recorded below.

### Consume and preserve the complete A-build runtime — PASS

Renewed archive inspection found all eleven newly built runtime files unchanged in name, flat layout, size and SHA-256. Current-lock/inventory validation and rejection of changed or nonregular files also passed the offline fixtures. The [execution account](#renewed-execution-record) and [runtime handoff validator](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/package/package.mjs#L35-L64) support preservation of the consumed A-build output; they do not independently establish every A-build baseline obligation.

### Working loaders, Workers, proxies and WASM — PASS

The newly extracted archive passed twelve main-thread, Worker, Worker1 and promiser surfaces under the recorded Chrome/hosting conditions. All eleven runtime assets were requested from the packaged `/runtime/` mount. Missing WASM, Worker1 or OPFS proxy, and corrupt WASM, produced the expected unavailability. The [renewed browser result account](#renewed-execution-record) distinguishes those observations from the [browser check definitions](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/package/check.mjs#L20-L140). Other browsers and hosting conditions were not exercised.

### Supplied bundler variants remain accessible — PASS

All three bundler-friendly filenames remain exported and shipped. Their main, Worker, Worker1 and promiser usage succeeded in the selected browser. This combines the [renewed result account](#renewed-execution-record) with [explicit filename exports](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/package/package.mjs#L99-L103); it establishes asset access and upstream module loading, not compatibility with every consumer bundler.

### Exclude demos, tests and experimental distributions — PASS

Direct tarball inspection found exactly 27 allowed runtime/envelope/notice files, with no probe, source, demo or intermediate engine. Extra/missing/unsafe/duplicate/linked/changed archive cases failed as intended in renewed tests. The [inspection account](#renewed-execution-record) and [archive failure fixture definitions](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/package/tests/package.test.mjs#L133-L141) support this result for the inspected payload and defined allowlist.

### Consumer acquisition needs no compilation — PASS

Offline local npm installation of the real tarball, with lifecycle scripts disabled, resolved all eleven exported assets at matching hashes. Inspection found no runtime dependency or build/install script; static-host extraction used those same bytes. The [renewed consumption account](#renewed-execution-record) supports the compiled-file envelope. SDK tools were present for production/testing; consumers' browser hosting remains their responsibility, and no Node.js product execution was claimed.

### Generated runtime stays outside Git — PASS

The renewed repository gateway passed; tracked-path review found controlled code, tests, notices and documentation, with runtime/archive/report outputs confined to ignored workspaces. The [renewed check account](#renewed-execution-record) supports the checked snapshot; [repository exclusion gateway](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/check-repository.sh) alone cannot detect every deliberately renamed upstream copy, so the source inventory was also examined.

### Preserve behavior and the glue boundary; no transient fallback — PASS

Byte equality with A-build and examination of the package envelope found no rewritten runtime or new product wrapper. Renewed SQL probes used upstream APIs directly; main-thread persistent-VFS requests and a Worker request with a missing proxy failed rather than opening transient storage. Applicable OPFS VFSes were initialized and read/written. The [execution account](#renewed-execution-record) supports these cases. Restart persistence and a separate full upstream baseline comparison remain A-acceptance responsibilities.

### Preserve applicable upstream licensing notices — PASS

The final archive contains the project license, distinct upstream notices and their version/origin/digest associations. Ten notice inputs were compared with pinned source material; missing/altered/wrong-association fixtures failed. Runtime embedded notices remain unchanged through byte equality. The [renewed notice audit account](#notice-audit) supports the pinned recipe/components examined, not a legal certification for future upstream/toolchain configurations.

### Supply final assets and digest identities downstream — PASS

The real archive, every shipped file, source pair/lock and original build provenance are identified in the success handoff; parsed stdout equals its atomic file. Failure fixtures retain diagnostics without selecting prior success. The portable manifest needs no build-directory location. The [renewed handoff account](#renewed-execution-record) and [success-only handoff implementation](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/package/package.mjs#L138-L177) support consumption by A-acceptance/A-release; release identity policy and publication stay with their owners.

### Common dependencies and remaining limits

The observations share repository-authored inventory, build/server helpers and browser probes. Direct Python tarfile/hashlib inspection reads the actual envelope without invoking its implementation inspector, but still shares expected handoff identities and SHA-256. Implementation and Verification have common agentic authorship; renewed execution does not create independent authorship. The preservation argument is byte equality to A-build, conditional on that producer and upstream browser prerequisites. There is no universal-browser/bundler, Hamming, runtime-restart persistence, hosted CI or published-release verdict here. No unresolved A-package obligation or unusable required check remains in the examined candidate.

### Conclusion for institution

The evidence supports the A-package command for this candidate and newly identified payload, and all three Verification controls passed. A separate Archive invocation can follow; this report neither performs it nor asserts human integration/publication authorization. The temporary payload must not be replaced by a different release artifact without applicable evidence.

## Coverage record

Current clean committed candidate: `416afe1e99f832ed3a822537a79b5706889c3505`; tree `b4073ba8393607ff7f549abeb31d17264ae99760`. Review inputs were clean before report authoring. OpenSpec `list --json` confirmed this checkout's `.42p` root and the report destination; `status` and `instructions apply` resolved the `spec-driven` Change's proposal, spec, design and task paths. The official generated verify skill was present before controls; only the environment CLI was installed, with no skill installation/update.

Examined source snapshots:

- [SPEC at the checked candidate](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/SPEC.md): SHA-256 `23c94ad50be9559a5846b083996d46bc12607a73473d5272726d0faae4c6acb1`, sections “Responsibility and boundaries”, “Inputs and reproduction” and “Distribution contract”.
- [Capture at the checked candidate](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md): SHA-256 `20ea53df5d3cb59a9c0c2e327d7c01e9cb3ef8173f7d9f7ecdc147abc8c32df5`, the six handles named by A-package.
- [Allocation at the checked candidate](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md): SHA-256 `d20671c4e658e4704a15a95d3c5d1ea96fc4c578b084bc12f4f0616e08e35edd`, `A-package`, its composition and evidence target.

The [reviewed coverage mapping](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/.42p/openspec/changes/package-browser-runtime/coverage.md) retains its original planning snapshots. Their identities differ from the current full documents because A-watch was added; byte comparison found the A-package unit body unchanged from planning baseline `14c4c8fc545cd69ee083632505cbaf581905e6b0`. That equality establishes text identity, while the semantic examination of all obligations/scenarios justifies renewed **100% allocation-to-Change and 100% Change-to-allocation coverage**. Planning artifacts were not revised during Verification.

Allocation-to-Change: the nine obligation blocks in the institutional view exhaust the unit's demands and composition. The existing mapping associates them with validated input/conservative assembly, packaged resolution, consumer envelope, behavior/glue, licensing, output handoff and exclusions, with relevant scenarios/tasks. Change-to-allocation: all eight ADDED requirements specialize those demands; explicit metadata, one tarball, controlled notices, atomic handoff and scoped checks do not add a product API, identity policy or another allocation unit. Other units are not included in these percentages. Relevant SPEC/Capture correspondences were examined; full source-chain fidelity is not inferred from this mapping.

## Official OpenSpec verify findings

Executed the intact generated `openspec-verify-change` workflow, using its current schema/context and all four resolved artifact types. The artifact status and 16 checked tasks were inputs, not the conformity verdict. Implementation was identified in `tools/package.sh`, `tools/package/`, contributor docs and test registration, and read against every requirement/scenario and all six design decisions.

| Dimension | Result |
| --- | --- |
| Completeness | 16/16 described tasks complete; 8/8 ADDED requirements have implementation evidence; no unavailable tracking file |
| Correctness | All eight requirements mapped; all 17 scenarios examined, through applicable renewed execution or scoped semantic review |
| Coherence | All six design decisions followed; thin wrapper/modules, existing harness helpers and registered offline tests follow repository patterns |

### Requirement and scenario dispositions

| Requirement and scenarios | Examined implementation / suitable evidence | Disposition |
| --- | --- | --- |
| Validated build input: matching runtime; invalid/changed bytes | `package.mjs:35–64`, actual new A-build/package pair; renewed malformed/source-lock/configuration/inventory/nonregular fixtures | Conformant for the pinned schema/pair and examined failure classes |
| Conservative assembly: all loading surfaces; unrelated build files | `package.mjs:138–165`, exact final archive; fixture demo exclusion and explicit metadata exports | Complete eleven-file flat payload; unrelated fixture HTML omitted, undeclared runtime assets rejected |
| Packaged resolution: relocated extraction; missing companion | `check.mjs:10–140,157–182`; renewed twelve surfaces/four negatives and mount response record | Conformant under recorded real-browser conditions |
| Consumer envelope: npm/static consumption; supplied identity | `package.mjs:25–32,99–103,159–166`; metadata fixtures, actual offline install and independent extraction | Explicit caller identity, same single archive usable by either channel, no compilation/dependency/lifecycle step |
| Behavior/glue: direct use; unavailable persistence; required semantic change | Exact runtime equality; `browser-probe.mjs`; upstream API/storage probes; source/design examination | No local runtime patch/wrapper found in reviewed packaging paths. The conditional escalation trigger was not encountered; repository/Change guardrails require escalation rather than a corrective patch |
| Licensing: archive lacks texts; extracted inventory | `noticeInputs`, ten controlled associations, primary-source comparisons and actual extracted notice equality | Missing/wrong material fails; embedded runtime notices unchanged |
| Final handoff: success; copy/pack/archive failure | `package.mjs:138–177`; actual stdout/atomic equivalence, hash inspection and injected failure fixtures | Complete success identities; failures do not report earlier output as current success |
| Output exclusion: clean checkout; repository exclusion | New initially empty checkout and qualified tools; current tracked inventory, ignore gateway, fresh unique runs | Current scoped reconstruction and source boundary supported; broader hosted production CI belongs to A-acceptance |

Task groups 1–3 are supported by renewed validator/packing/metadata/notice/archive/failure/consumer tests and real assembly; group 4 by renewed final-tarball browser execution; group 5 by isolated reconstruction, source review, repository tests and strict validation. The procedural “semantic change required” scenario has no runtime test: no such incompatibility occurred, and its guardrail was examined against the unchanged-byte implementation and repository canon. This does not authorize future patches.

**CRITICAL:** none identified in the examined candidate. **WARNING:** none unresolved. **SUGGESTION:** none. No applicable official check was marked Not verified; no mandatory test was skipped. Official advisory assessment: all checks passed, ready for archive. That advisory statement is limited by the other two controls, this report's unit scope and a separately invoked Archive.

## Renewed execution record

Executed on 2026-10-07 against the checked candidate. Registered tests ran from the primary checkout. Real reconstruction ran in `/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/checkout`, detached at the same commit and initially without generated state; qualification used a newly installed external `HARNESS_STATE=/tmp/sqlite-vec-wasm-verification-tools`.

| Command/control | Observed result |
| --- | --- |
| `sh tools/check-repository.sh` | Exit 0; source-lock validation, tracked snapshot whitespace and ignore checks passed |
| `sh tools/test-repository.sh` | Exit 0; 72 tests: 19 gates, 25 acquisition, 19 build, 9 packaging; zero skipped |
| `openspec validate --all --strict`, cwd `.42p`, CLI 1.14.0 | Exit 0; current Change and two existing realization specs passed, 3/3 |
| `bash tools/harness.sh install`, `check`, `deps`, `smoke` | Qualified tool identities/locked dependencies and actual isolated-browser smoke passed |
| First `bash tools/build.sh` | Exit 1 at sqlite-vec archive transport, curl exit 28 after configured retries; no success JSON/package/browser result |
| Fresh `bash tools/build.sh` retry | Exit 0; new acquisition checked both current archive digests, then new unique compilation/runtime and complete handoff |
| `bash tools/package.sh --build-handoff BUILD_JSON --name sqlite-vec-wasm-verification-fixture --version 0.0.0-test` | Exit 0; inspected real archive, extracted independent copy, complete atomic handoff matching stdout |
| `bash tools/harness.sh exec node tools/package/check.mjs PACKAGE_JSON` | Exit 0; actual offline npm consumption, twelve browser surfaces, four targeted negatives, unchanged post-check file/archive hashes |
| Separate mandatory-suite removal fixture | Runner failed after the 19/25/19 existing suites passed; packaging test file restored; absent mandatory suite was not silently skipped |
| Direct Python tarfile/hashlib inspection | Exact 27 regular files, all handoff/archive identities, all eleven A-build runtime identities, controlled notices/README/LICENSE, exports and portable manifest matched |

The first transport failure is retained and superseded only by the successful fresh attempt. No retry changed source pins, fetch URLs, expected digests, code or required checks. Acquisition removed its failed temporary source workspace; the build retained diagnostics. The retry used no prior successful runtime or package. Documented smoke/dependency preparation and compiler caches produced during this invocation are shared tool prerequisites, not an earlier product output.

Qualified observations: Linux 6.18.44 x86_64, GCC 13.3.0, GNU Make 4.3, Emscripten 4.0.23, WABT 1.0.42, Binaryen 125, Node 24.19.0, npm 11.17.0, locked playwright-core 1.63.0 and Chrome `153.0.8010.12`. Hosting: loopback HTTP secure context, COOP `same-origin`, COEP `require-corp`, JavaScript/WASM MIME types, separate probes, runtime `/runtime/`. Direct main/Worker probes exercised C-style/OO1 SQL, independent connections, BigInt, FTS5 and deterministic vec0; Worker1/promisers opened, queried pinned SQLite/vec versions and closed. Workers initialized/read/wrote `opfs`, `opfs-wl` and `opfs-sahpool`; main-thread `kvvfs` worked, unavailable persistent-VFS requests failed.

Four negative copies: missing WASM requested 404 and remained unavailable at five seconds; missing Worker1 requested 404 and raised a Worker load error; missing proxy requested 404 and requested `opfs` failed with `no such vfs`; corrupt WASM responded 200 but remained unavailable at five seconds. The bounded waits represent missing initialization, not a successful or skipped capability check.

New archive: `sqlite-vec-wasm-verification-fixture-0.0.0-test.tgz`, **1147759 bytes**, SHA-256 **`248b1271c8765b020b269da8d4aba97d24987a0d3786a16e13d49c266046cba6`**. It has 27 shipped files; the real tarball was independently inspected and extracted by the checker, then all file identities were rechecked after browser execution. The package/build stdout each equals its own stored atomic handoff. All eleven runtime files are byte-identical to this invocation's A-build output. This new fixture archive is not the unavailable earlier Apply archive or a published release.

| Runtime file | Bytes | SHA-256 |
| --- | --- | --- |
| `sqlite3.js` | 814746 | `8f0b0b7ef084c0b9af79479388be14392be37c6cf83663803138e90286f2f40d` |
| `sqlite3.mjs` | 813270 | `94c311c377bf09a7a34b13bc2fb8ab7e2cd33fe864ce8e4eb04bcd51386c643e` |
| `sqlite3-bundler-friendly.mjs` | 809831 | `121202cbe0f09a9f1aef5ef65cad1cf10d432e06be7f573224eb7fd71c9d72b0` |
| `sqlite3.wasm` | 945481 | `f18255d4b53c0dd272eee05126d57fc6bc07735f4914e003603d25d5724cc276` |
| `sqlite3-worker1.js` | 1791 | `131a835d991f750ab5090a9617bf06f586c42301d9648f7d2f887b275365713c` |
| `sqlite3-worker1.mjs` | 1499 | `aeeb5f492b283a00fe275bd667711031c72b5acc45b06483b527d62f6f9cc28b` |
| `sqlite3-worker1-bundler-friendly.mjs` | 1516 | `c043fcfadc1ded8e248ef032a27b6fcda4d66f9eee4b2a27acba02b85d17764f` |
| `sqlite3-worker1-promiser.js` | 12908 | `a8ad8b0b053515fb8bb4846edd2f36dfda6ec7ac80b726c081c339906f2f99e5` |
| `sqlite3-worker1-promiser.mjs` | 12675 | `3e72060ed48c77495472ca8f331c289240ed694761377ed80142b97c94791aec` |
| `sqlite3-worker1-promiser-bundler-friendly.mjs` | 12692 | `f0b85e6e08abc012f071bd40e44d9b07f30cc00799fde113270569991d548c99` |
| `sqlite3-opfs-async-proxy.js` | 41758 | `0afe66f23424456c0eb1de5f599075fd676d869044a017a1058888007e2dbf92` |

All required raw records and the new archive were confirmed readable before drafting. The following **primary records are session-local**, not downloadable from GitHub itself. Their digests identify the observed contents; this report durably summarizes their results. Additional build/package handoffs/logs and the full file inventory are named by `package.json`, the browser report and the ignored `evidence-index.json` in the same workspace.

| Session-local primary record | SHA-256 |
| --- | --- |
| [repository-check.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/repository-check.log) | `ba592b878aab40750c441095d7c33d618eb20a01be97b94174cdd62e1e334970` |
| [repository-tests.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/repository-tests.log) | `9e41fbbdb8fc2d9baab30999dc972c01b74d0d6c8bedc2098fcee956283d2db7` |
| [openspec-validation.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/openspec-validation.log) | `206f70ad911ab765701909b3e79e8ad7a902144a2717a797f306a6066e697ef3` |
| [smoke.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/smoke.log) | `ede1fb3d61acd23e07a0e527140efd051919e393e4c82033c6c285ded294c080` |
| [build-command.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/build-command.log) | `c30ecbe4a556d5f237429a439674dbf15f700a63294d6275397f13fa3c1c97ad` |
| [build-retry.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/build-retry.log) | `e2d2d61b8cd79db46710dfedb1527185953e2fec77622268b3c6297691dd64ee` |
| [package.json](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/package.json) | `65ad67e7c48873fbb22ecda8eb31f0674eef62f5f36cd2985be0915b32202b99` |
| [browser.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/browser.log) | `f2b698f9c2b432b6cda8774075648a36b5649b582c4a7f62aaeb771853ae409c` |
| [missing-suite.log](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/missing-suite.log) | `ad43d1605d01042885d01d173fe8889bb994a6a801403d52eb0b9dc4d4f94195` |
| [independent-archive-inspection.json](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/independent-archive-inspection.json) | `6ba437d41a081f18d5b60c5ebfa040683b856a6ff2fef19c25ef801cafd69b66` |
| [sqlite-notice-audit.json](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/sqlite-notice-audit.json) | `2b4c5eb305532be54358887b751da0ff1868beced2f6a92b33e5483c5ff265da` |
| [sdk-notice-audit.json](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/sdk-notice-audit.json) | `9d1c632c28970ec15974716040ce9afe57b38869d653a2a12d22c64345e11ae2` |
| [vec-notice-audit.json](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/vec-notice-audit.json) | `0ef83382e1a106d6af945ea375e3b2bf02f1f0e7723471dd657657bdb2d08b58` |
| [browser-checks.json](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/checkout/.work/package-check/run-BQq4M0/checks.json) | `20d73344f6a2c7155f0d01d75f155064179f034acee4eee06a338c99a3b1d850` |

The [session-local new archive](sandbox:/workspace/scratch/1b635187a85a/sqlite-vec-wasm/.work/verification/checkout/.work/package/run-IOh5EP/sqlite-vec-wasm-verification-fixture-0.0.0-test.tgz) has the archive digest stated above. The [historical Apply account](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/.42p/openspec/changes/package-browser-runtime/apply-evidence.md) is a durable account of its earlier executions; its temporary tarball/hand-offs/browser report are now unavailable. Byte comparison found packaging/build inputs unchanged from published implementation `b1fb239c8fe950c9e19a844f00c66bb828287fa5`, but that equality alone cannot revalidate earlier runtime bytes. Historical success was not substituted for current execution.

## Notice audit

Ten notice inputs, origins and shipped digests were examined under the pinned recipe. SQLite's two texts matched its retained official archive after renewed SHA3-256 verification and the recorded whitespace normalization. This reuses retained source bytes for the notice comparison, not an earlier runtime result. Both sqlite-vec texts matched freshly retrieved official `v0.1.9` files (MIT Git blob `9c106bc48c760f7ed9f5b8255dea7adeef029cbe`, Apache Git blob `abbef71fa08fc8040d469ea4e6e99f0ff8edd6cb`). The six SDK texts matched newly qualified 4.0.23 source material. Primary comparisons and normalized digests are in the linked notice-audit JSON records above; [controlled notice associations](https://github.com/at-rama/sqlite-vec-wasm/blob/416afe1e99f832ed3a822537a79b5706889c3505/tools/package/notices.json) are definitions, not those execution results.

Inspection of the pinned SQLite WASM header, Emscripten license/system-library recipe and generated library log supports the included SQLite public-domain text, sqlite-vec MIT/Apache texts and Emscripten/musl/compiler-rt/LLVM libc/libc++/libc++abi notices; default dlmalloc is public domain. Upstream license wording was preserved; only recorded trailing whitespace/EOF normalization applies. No additional notice requirement was found in those examined selected components. This engineering scope does not establish notice adequacy for a changed SDK, source pair, optional recipe or redistributed build-only tools. Embedded runtime notices are preserved by complete runtime byte equality, rather than reconstructed from text inputs.

## Finding dispositions and institutional boundary

**F1 — transient source transport failure: resolved within this invocation.** The initial build's curl exit 28 was real and recorded. A fresh ordinary build, with unchanged controls, obtained and verified the sources and completed; no cached successful product or weakened condition was substituted.

**F2 — unavailable Apply primary runtime evidence: resolved for current verification by renewal.** The prior account remains historical. Fresh current-candidate acquisition/build/package/browser observations and payload identities supply this verdict; no claim revalidates its inaccessible earlier tarball.

No implementation or requirement correction was performed. The only workflow write is this report; its later commit does not change the checked implementation. Verification did not synchronize specs, archive, merge, tag or publish. Passing this unit does not establish A-acceptance's Hamming/restart-persistence/full baseline/hosted production CI requirements, A-release's authoritative revision/payload applicability or human approval. Those remain separate allocated responsibilities, not unresolved requirements silently removed from A-package.
