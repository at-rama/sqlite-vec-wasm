# Design reconciliation review

## Scope and inputs

Review on 2026-10-08 of the two-Capture/global-Allocation migration authorized by the user mission, not post-Apply Verification of an OpenSpec Change. The baseline is `87f7d0c0fc7e721c018461d77405d176ec84104a`, confirmed unchanged on remote `main` before work. Baseline repository checks passed, all 72 registered tests passed, and all three synchronized OpenSpec specs passed strict validation. No active Change existed.

The [historical Distribution contract](https://github.com/at-rama/sqlite-vec-wasm/blob/d463c4034604d6593cf45bbf5a523598dd3f53cc/SPEC.md) last changed at `d463c4034604d6593cf45bbf5a523598dd3f53cc` and is byte-identical at the baseline; SHA-256 `23c94ad50be9559a5846b083996d46bc12607a73473d5272726d0faae4c6acb1`. The [baseline Capture](https://github.com/at-rama/sqlite-vec-wasm/blob/87f7d0c0fc7e721c018461d77405d176ec84104a/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) has SHA-256 `20ea53df5d3cb59a9c0c2e327d7c01e9cb3ef8173f7d9f7ecdc147abc8c32df5`; the [baseline Allocation](https://github.com/at-rama/sqlite-vec-wasm/blob/87f7d0c0fc7e721c018461d77405d176ec84104a/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md) has SHA-256 `4923f66daa6465b0d40977ef4ce67a07f664eece5725069b9e373e1724bfc011`.

Site acquisition used the visible preceding user exploration and the full edited consolidation explicitly supplied by the user after the access diagnostic. Its source identity, relevant passages and supersession are retained as S-site-design, S-site-exploration and S-site-mission in the [Site Capture](2026-10-08_sqlite-vec-wasm_site_capture_edit-0.1.md). The unavailable intermediate assistant replies were not reconstructed. This review claims examination of the supplied material, not exact coverage of an inaccessible complete transcript. Reported experimental sizes remain accounts without available primary execution output.

## Distribution semantic comparison

All 22 substantive paragraphs/list groups of the historic contract were compared against the [Distribution Capture](2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md). The groups contain 57 occurrences of MUST, one SHOULD and four MAY; these lexical counts identify the examined source, not a substitute for semantic review. All modalities, exclusions, conditions, exceptions and verification duties are retained. The 15 constraint/rationale sections and material relationships are byte-identical to the baseline after replacing only source locators with the immutable URL.

| Source group in document order | Capture treatment | Responsibility / boundary retained |
| --- | --- | --- |
| 1. Build and publish canonical browser integration | C-purpose | A-build, A-release; official stable vec and no functional upstream changes |
| 2. Browser-only runtime | C-purpose | A-build; Node tooling permitted, Node/native/WASI runtime excluded |
| 3. Behavior/glue/patch boundary | C-nonmodification | A-build, A-package, A-updates; no new APIs/semantics; unavoidable patch requires instituted revision |
| 4. Four source/integrity/reproduction bullets | C-inputs | Official exact stable versions, exclusions, digest before use, fail on mismatch, SHOULD archives, no vendoring, bounded mirroring exception, clean reconstruction, pinned tools/options, no byte-identity requirement |
| 5. Source-stated build context | R-inputs | A-inputs retains context; A-build owns the same-SQLite-release MUST |
| 6. Canonical baseline and exclusions | C-browser | A-build/A-package; demos, benchmarks, tests and experimental variants excluded |
| 7. APIs/assets/default capabilities | C-browser | A-build/A-package/A-acceptance; all APIs, BigInt, FTS5, Worker1, default VFSes, asset resolution and supplied bundler variants; no every-bundler promise |
| 8. Static registration | C-static | A-build/A-acceptance; every connection, supported mechanism, no consumer registration, upstream semantics |
| 9. Conditional storage and documentation | C-storage | A-build/A-package/A-acceptance; Worker/security/VFS conditions, no main-thread OPFS promise or silent transient substitution |
| 10. Version/revision/payload/publication identity | C-release | A-package/A-release; shared npm/GitHub version/payload, source/tag identity, versions/digests/environment/notices; no required narrative notes |
| 11. Actual published-revision evidence | C-release | A-acceptance/A-release; merging a checked PR does not prove applicability to resulting revision/bytes |
| 12. Complete CI and final assets | C-verification | A-acceptance; clean production path and packaged assets, not development build |
| 13. Six browser test bullets | C-verification | Main/Worker independent connections and versions, FTS5, deterministic vec0, independently known bit/Hamming with no ties, Worker1, every retained OPFS restart/reopen ordinary/vector path |
| 14. Browser/evidence/omission conditions | C-verification | Mandatory real-browser execution, no unavailable-OPFS pass/skip, recorded versions/hosting, omitted-surface detection |
| 15. Stable-release awareness | C-watch | A-watch; daily official sources, newer than pins, no first-run historical backlog |
| 16. Issue identity, closure and mobile limitation | C-watch | A-watch; assigned one-per-pair issue, no duplicate/reopen after closure; decline permitted; settings documented, push delivery not promised |
| 17. Notification-only stop | C-watch | A-watch; no pins/candidate/merge/tag/publication or autonomous-adoption machinery |
| 18. Human candidate preparation | C-autonomy | A-updates; dispatch/selection, full mandatory checks, qualified PR stop, independent of issue/history/intervening releases; human merge |
| 19. Post-merge publication | C-autonomy | A-release/A-bootstrap; approved authoritative revision and exact verified payload; bounded initial npm exception only |
| 20. Fail-closed automation | C-failure | A-updates/A-release; every mandatory failure blocks eligibility/integration/tag/channels; approval waives no gate, automatic repair not required |
| 21. Bootstrap and steady-state mechanisms | C-bootstrap | A-bootstrap/A-release; minimum unavoidable manual setup/first npm publication MAY override only its automatic trigger; verification/identity/human authority retained, no recurring manual path; trusted publishing and supported provenance, explicit fallbacks |
| 22. Obsolescence | C-obsolescence | Published AND maintained equivalent upstream browser/API/vector/persistence distribution; demo alone insufficient; no invented current retirement responsibility |

Twenty-one source groups occur verbatim in the baseline and reconciled Capture. Group 18 has a pre-existing paraphrase: the explicit issue-context MAY and MUST NOT are represented by “An issue may supply evaluation context but is neither an automatic trigger nor a prerequisite”, while “prior issue” becomes “prior notification issue”. Comparison found identical permission/prohibition and scope; this migration does not revise those passages. R-updates and S-release-model/S-doc-model/S-watch-model retain the recorded human provenance, rationale, unselected alternatives and related-source boundary. The upstream-reference section remains available in the immutable contract; moving reference documentation does not change requirements. No new Distribution obligation is introduced by the migration.

## Site source reconciliation

The supplied design was acquired directly into Capture. This table records the semantic review in both directions; it is not a second specification or an independent source.

| Design matter from supplied text | Capture treatment |
| --- | --- |
| Static GitHub Pages site; two mobile-adapted pages and three navigation destinations; no necessary CMS/framework | C-site; no selected framework or invented prohibition |
| Sole README source, deployment HTML and usable links/images | C-readme |
| Presentation MAY follow main independently; no new engine release for docs | C-readme; permission retained |
| Actually published JS/WASM archive, no source rebuild | C-demo-release; package/runtime/API boundary explicit |
| Latest stable resolved on demo deployment, then fixed | C-demo-release; docs-only updates preserve identity |
| Visible project/sqlite_version/vec_version and release link | C-demo-release |
| Full 1,661/300 corpus, enriched English descriptions, system Unicode | C-emoji |
| Identified data revision, MIT notice/credit, old corpus, no initial French labels | C-emoji; revision choice deferred |
| Default sign-bit/304/Hamming/startup mode | C-vector-modes |
| Four constant padding dimensions with no distance effect | C-vector-modes |
| Original 300/Float32/cosine, first-selection load and memory reuse | C-vector-modes |
| Same identifiers, retained selection and requery after mode change | C-vector-modes |
| Changed neighborhoods acceptable; quality not acceptance | C-vector-modes, R-demo; checks remain required |
| Text field/grid, six neighbors excluding self, clicks/copy/selector/collapsible controls | C-interaction |
| Text starting point, existing embedding, no free-sentence vectorization or necessary model/service/key | C-search; allocation wording retains “required”, not a stronger prohibition |
| SQLite import, actual sqlite-vec execution, memory-only destruction on explicit close | C-search, C-memory |
| No needed authentication/persistence/OPFS cleanup | C-memory; no invented logout UI |
| Few independently expected queries in both modes and exercised WASM/registration/insertion/search | C-demo-checks |
| Strange neighbors alone prove nothing; complement, not OPFS/persistence/full-API acceptance | C-demo-checks |
| Site navigation/README/GitHub Pages links checked | C-demo-checks |
| Reported sizes exclude runtime/UI; vec0 size unknown; no browser-page verification yet | R-demo, Q-volume; no invented size gate or renewed measurement |
| Dedicated A-site, current README vs A-release dependency and preserved version distinction | S-site-mission, C-readme, C-demo-release; living SPEC integration superseded, unit status instituted by mission |

O-corpus preserves the earlier miniature alternative and commercial-promotion rejection without allocating another dataset. Q-realization retains technical choices for the future Change; no model proposal is adopted by silence. No current passage condition is manufactured from the open questions. The supplied blank vector-table row carries no design meaning.

## Global coverage and integrity

The [global Allocation](2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), “Coverage accounting”, explicitly classifies every handle. Semantic examination checked their complete contents and boundary prose, not only identifier matches. Distribution: **19/19**, with 13 covered and six non-allocatable. Site: **16/16**, with nine covered and seven non-allocatable. Union: **35/35**, with 22 covered and 13 non-allocatable. Grounding: **9/9 units**. Both directions are 100%; there is no unassigned obligation or orphan unit. The two Site questions remain open, explicitly classified, without implying a solved design. Documentary coverage establishes no implementation completion.

All eight existing unit responsibilities are unchanged from baseline. Only A-release's reciprocal archive-consumer relationship is added; A-site owns the site, its demo data and deployment. A-build/A-package's canonical distribution and A-acceptance's mandatory final-payload gates remain intact. Source hashes in the Allocation match both current Captures. Structural enumeration corroborates accounting and reciprocal references, not semantic fidelity.

The executable gateway still checks the whole tracked working snapshot for whitespace, rejects tracked ignored outputs regardless of force-add or external ignore configuration, validates source-lock integrity offline and forbids root OpenSpec. It now rejects retired root SPEC variants, requires tracked regular entry points and Capture inputs, and checks complete, unique, fresh Capture input identities in one global Allocation. A third Capture fixture passes when correctly declared: no definitive Capture count is hard-coded. Missing/stale/duplicate/untracked inputs and symlinks fail. The [17 added gateway tests](../../tools/gates/tests/test_repository.py) include positive and negative cases, authority drift, old protections and an invalid source lock; their definitions alone are not execution evidence. The mandatory test entry point requires that suite file.

Runtime/acquisition/build/package/harness code and inputs, dependency locks, licensing inputs, GitHub workflows, synchronized OpenSpec specs and archived Changes, generated skills, the base Capture skill and historical reports remain byte-identical to baseline. No publication pipeline or general 42p protocol/model is evolved. Only local authority references and the repository's concrete input checks change.

## Historical records and links

Historical qualification and Verification reports and archived Changes retain their original wording, hashes and evidence limits. Their old authority statements are historical context, not current instructions. A relative SPEC link in such a record must be interpreted at its recorded source revision, not against the new working tree. For inspection, the [qualification at the migration baseline](https://github.com/at-rama/sqlite-vec-wasm/blob/87f7d0c0fc7e721c018461d77405d176ec84104a/.42p/engineering/2026-10-04_sqlite-vec-wasm_qualification_edit-0.1.md) and the [archived acquisition coverage at baseline](https://github.com/at-rama/sqlite-vec-wasm/blob/87f7d0c0fc7e721c018461d77405d176ec84104a/.42p/openspec/changes/archive/2026-10-06-acquire-upstream-inputs/coverage.md) keep that browsing context available; each record's own source snapshots govern interpretation. None is rewritten to appear produced under this migration.

Active Markdown local targets/anchors and immutable repository targets/anchors were resolved against the actual working tree or Git objects. The pre-existing harness-provenance commit `d6b911f01c00995939e8ee0ff8ad5504dc8d1d03` required fetching its Git object; its file and anchor then resolved without changing the document. Historical records were checked for byte preservation rather than interpreted as live instructions. Existing external upstream documentation was not requalified; this migration establishes no new claim about its current technical behavior.

## Executed checks and limits

Each of the first three commits followed successful repository checks, 72 offline tests and three strict OpenSpec spec validations: Distribution `a50a71b3251fb1c34318de5ffa43fd48d5dfed1e`, Site `dbf470cbfba74556e6b2adb0fac2596930358bcb`, Allocation `8a25e982c3db41b29d88714bfc64878bbbb4cfeb`. Each committed Git tree was compared to the validated index and the checkout was clean before the next step.

The canon-migration candidate was checked with `sh tools/check-repository.sh` and `sh tools/test-repository.sh`: **89 tests passed** (36 gate/gateway, 25 acquisition, 19 build, nine package); no mandatory test was skipped. From `.42p`, `OPENSPEC_TELEMETRY=0 openspec validate --all --strict` passed all three specs using official CLI 1.14.0; `openspec list --json` resolved this checkout's `.42p` and no active Changes. Environment: Git 2.51.1, Python 3.12.14, Node 24.19.0, npm 11.9.0, system GCC 13.3.0, existing Bash/tar/unzip. Raw local outputs and the one-off assertion script are outside the checkout; this review is their account, not a link to durable primary execution output. The PR description must link the separately accessible hosted check/test output for its exact final commit once that run has completed.

The adversarial review re-examines source fidelity, adoption, authority/provenance, complete allocation, public meaning, active links, gate strength and unchanged historical/runtime surfaces. Git whitespace/index/tree checks and both merge gates must also be renewed on the final committed candidate; no changed OpenSpec Change makes Verification and Archive explicitly not applicable. No artificial Change, post-Apply report or oracle result is created. Final identities and hosted outcomes belong in the PR description after execution.

No site is implemented or published; no new OpenSpec Change is applied; no runtime capability is changed. SDK reconstruction, real product/browser acceptance, OPFS persistence, upstream dataset experiments and publication are not rerun or claimed by this documentary/gateway change. The next realization is the OpenSpec Change for A-site, bounded by its Allocation unit and the normal coverage/Apply/Verification/Archive rules.
