# Upstream-watch design verification

## Institutional view

**Verdict: FAIL for documentary coherence of PR #20 at `1f8a4ed48fae749ab87cc100508758fee08c0a57`.** The examined decision is captured and materialized faithfully, and the substantive monitoring obligations have allocation owners. One new inconsistency prevents a strict pass: `A-watch` cites and applies `C-inputs`, but the reciprocal coverage row omits `A-watch`. This is an accounting defect, not an observed missing monitoring implementation. No implementation is demanded by this design PR.

This review adapts the obligation-oriented evidence discipline of [42p-verify-change](../.agents/skills/42p-verify-change/SKILL.md) and [the Verification standard](../standards/verification.md). It is not post-Apply Verification of an OpenSpec Change: design evolution is exempt from Changes, and no Change identity, allocation-unit implementation verdict or machine-gate report is fabricated.

### Capture completeness — PASS within the designated source scope

Semantic examination against the explicitly adopted 2026-10-07 exploration and the user-designated consolidation found no omitted material decision or unsupported promotion. [The reviewed Capture](https://github.com/at-rama/sqlite-vec-wasm/blob/1f8a4ed48fae749ab87cc100508758fee08c0a57/.42p/engineering/2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md), sections `C-watch`, `C-autonomy`, `R-updates` and `S-watch-model`, preserves both upstreams, official stable sources, daily detection, newer-than-pins filtering, the initial backlog boundary, assigned issue identity, closure-resistant deduplication, declined adoption, notification-only stopping, human initiation and merge, and the push-delivery limitation. The rationale retains the previous assumption, the reason for revision, unselected alternatives and their trade-offs. The source distinguishes primary user adoption from the designated assistant-authored consolidation; the Capture does not corroborate itself.

The operational order Capture reconciliation → materialization in SPEC → Allocation is recorded without changing SPEC's product authority. No passage-condition checklist or implementation-completion claim was introduced. This is consistency with the supplied sources, not independently proven truth or exact coverage of an unseen conversation corpus.

### Faithful materialization in SPEC — PASS

Semantic comparison of [the reviewed SPEC](https://github.com/at-rama/sqlite-vec-wasm/blob/1f8a4ed48fae749ab87cc100508758fee08c0a57/SPEC.md), section “Updates and publication”, with the Capture and designated decisions found the new obligations and exclusions represented with their scope and modalities. The old general polling prohibition is replaced by bounded monitoring; autonomous adoption remains excluded. Notification issues neither initiate candidate preparation nor become prerequisites. Human merge, mandatory gates and automatic publication after approved merge retain their roles.

The new monitoring paragraphs are also byte-identical between SPEC and `C-watch`. That identity supports comparison, but the semantic conclusion depends on examination against the user decisions rather than agreement between two documents authored by the same agent.

### Allocation coverage — substantively supported; accounting FAIL

[The reviewed Allocation](https://github.com/at-rama/sqlite-vec-wasm/blob/1f8a4ed48fae749ab87cc100508758fee08c0a57/.42p/engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md), sections `A-watch` and `A-updates`, accounts for every examined new obligation without adding an unrelated responsibility. `A-watch` ends at notification; `A-updates` retains manual candidate initiation and integration boundaries. The new unit is grounded in the reconciled Capture.

**F1 — Required documentary correction.** Lines 70–72 explicitly ground `A-watch` in `C-inputs` and retain its stable-release classification. The `C-inputs` accounting row at line 128 lists other consuming units but omits `A-watch`. The discrepancy is absent in the baseline and introduced by this PR. Handle totals and existing semantic allocation are not invalidated by it, but they are insufficient to establish complete reciprocal accounting. Add `A-watch` to that row and describe its reuse of stable classification, without reallocating source acquisition or integrity duties. Refresh and verify affected identities and accounting afterward. No correction was performed during this review.

### Corpus non-regression and drift — PASS for the examined delta

The review included the entire tracked prose/configuration inventory, not only the three changed documents: **38 Markdown files and four YAML/YML files**. Of these, 39 are byte-identical to the base. All 66 tracked files match the immutable remote candidate tree; the other 63 files, including source pins, code, workflows, generated skills, dependency records, LICENSE and historical evidence, are unchanged by the PR.

Delta examination and dependency review found no additional contradiction introduced into README, contributor instructions, harness architecture/qualification, repository standards, OpenSpec context, synchronized realization specs or archived source/build records. Unchanged operational and historical claims were distinguished from current product obligations. Archive snapshots remain historical identities and were not rewritten to pretend that past Verification covered A-watch.

The unchanged identity alone does not prove compatibility with the revised contract: compatibility was additionally examined at the affected boundaries—source classification and pin ownership, acquisition/build isolation, issue versus candidate initiation, authority, failure gates, evidence scope and publication. The detailed record below gives the scope and limits. This pass does not recertify every pre-existing runtime or historical claim.

### Executable evidence and conclusion

Renewed local execution passed the canonical repository check and all **63 registered tests**: 19 gate, 25 acquisition and 19 build-orchestration tests. The [Repository CI run associated with the reviewed candidate](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37623256974) also reports successful check/tests/Verification/Archive jobs. Verification and Archive are non-applicable to this design-only delta, not semantic proof of the design revision. CodeQL checks associated with the candidate also report success.

These results do not waive F1. The design revision is substantively supported, but a strict whole-documentary pass requires correcting and rechecking its incomplete coverage accounting. Monitoring operation, issue delivery and full-product acceptance are outside this design review and remain unestablished.

## Detailed verification record

### Identity, sources and examination method

- PR: [#20 — docs: allocate upstream release awareness](https://github.com/at-rama/sqlite-vec-wasm/pull/20).
- Base: `14c4c8fc545cd69ee083632505cbaf581905e6b0`.
- Reviewed candidate: `1f8a4ed48fae749ab87cc100508758fee08c0a57`.
- Review date: 2026-10-07. The candidate had clean committed input before this report was written. The report's later commit is not the candidate identity.
- Primary decision source: the visible 2026-10-07 project exchange, including the user's validation of the common two-upstream mechanism, exploration and newer-than-pins choice, correction of operational order, and explicit execution instruction. The last instruction designates the immediately preceding consolidation, beginning “Objet : évolution du design de sqlite-vec-wasm — surveillance des versions upstream”, as task input. `S-watch-model` records the retrievable conversational locators. No invented external message URL is supplied.
- Existing Capture was used as working-state input, not independent evidence. The user-supplied Capture skill governed assessment of reconciliation, adoption, provenance, boundaries, impact closure and currentness.
- Repository controls read: AGENTS, editorial/software/gates/OpenSpec/Verification standards, the repository-owned composition skill and the generated verify skill's completeness/correctness/coherence rubric. No OpenSpec Change or official Change-verification invocation is claimed.

SPEC SHA-256: `23c94ad50be9559a5846b083996d46bc12607a73473d5272726d0faae4c6acb1`.

Capture SHA-256: `20ea53df5d3cb59a9c0c2e327d7c01e9cb3ef8173f7d9f7ecdc147abc8c32df5`.

Allocation SHA-256: `08a454b601c1ff7a0d798e4649ca7d2b63320ae66f5df5fbd7aa601e6e11fd91`.

The Capture's SPEC digest and Allocation's Capture digest were recomputed and matched. Full-tree Git blob identities were checked against the remote candidate tree. Local execution used a materialized checkout with matching tree bytes and reconstructed local commit metadata, not a claim of possessing the remote commit's full history. Remote CI observations supply separate hosted results associated with the real candidate.

### Decision-to-document mapping

The rows below enumerate the designated revision's material obligations and rationale groups. They provide examined traceability, not independent evidence of monitoring implementation. SPEC locators refer to “Updates and publication”; Capture and Allocation locators refer to their named sections in the immutable documents linked above.

| Material input | Capture disposition | SPEC disposition | Allocation disposition |
| --- | --- | --- | --- |
| Both SQLite and sqlite-vec monitored within this repository | `C-watch`; repository-location trade-off in `R-updates` | Both upstreams explicitly required | `A-watch` |
| Daily scheduled GitHub Actions detection | `C-watch` | Daily workflow required | `A-watch` |
| Official sources and established stable-release exclusions | `C-watch` with `C-inputs` | Official SQLite publications and sqlite-vec Releases; stable definition retained | `A-watch` applies `C-inputs`; reciprocal accounting defective under F1 |
| Versions newer than currently integrated pins | `C-watch`, `R-updates` | Explicit relative-pin filter | `A-watch`; pin identity remains with `A-inputs` |
| No full historical notification backlog at first execution | `C-watch` | Explicit initial boundary | `A-watch` and evidence target |
| One issue per upstream/version, assigned to maintenance owner | `C-watch` | Issue identity and assignment required | `A-watch` |
| Issue identifies upstream, version and official source | `C-watch` | All three fields retained | `A-watch` |
| No repeated-detection duplicates, including closed issues | `C-watch` | Explicit deduplication boundary | `A-watch` |
| Closure can express declined adoption; no recreation/reopening | `C-watch` | Permission and monitoring exclusion retained | `A-watch` |
| Issue creation/assignment controlled; push depends on settings | `C-watch` | Delivery limitation and settings documentation | `A-watch` includes documentation and does not guarantee delivery |
| Notification cannot alter pins, trigger candidates, merge, tag or publish | `C-watch`, `C-autonomy` | Explicit stop and exclusions, including no automatic merge | `A-watch`; `A-updates` owns subsequent human-triggered work |
| Autonomous adoption and machinery solely sustaining it excluded | `C-watch`, `R-updates` | Narrow exclusion retained alongside permitted monitoring | `A-watch`, `A-updates` |
| Human evaluation and manual `workflow_dispatch` initiation | `C-autonomy` | Human initiation retained | `A-updates` |
| No required issue/history or processing of intervening releases | `C-autonomy`, `R-updates` | Issue neither prerequisite nor trigger; history independence explicit | `A-updates`; `A-watch` composition |
| Human merge, mandatory gates and automatic post-merge publication retained | `C-autonomy`, `C-failure`, `C-release`, `C-bootstrap` | Candidate and post-merge responsibilities preserved | `A-updates`, `A-release`, `A-bootstrap`, `A-acceptance` |
| Former rationale, newly invalidated external-awareness assumption | `R-updates`, `S-release-model`, `S-watch-model` | Operational revision materialized, rationale not promoted to a second contract | Rationale informs `A-watch`/`A-updates` |
| Separate watch repository, cumulative issue and exhaustive history unselected, not refuted | `R-updates` | No unrelated alternative prescribed | No alternative falsely represented as a requirement |
| Consultation/comparison/dedup mechanisms deferred to realization | `R-updates` | Contract leaves implementation mechanisms open | `A-watch` retains realization freedom within its obligations |
| Reconciled Capture → SPEC → Allocation; design-only PR | Purpose/provenance and operational order preserved | SPEC remains product authority | Derived unit added; no realization Change created |

All nine units have material Capture grounding. All 19 material handles have one accounting classification: 14 covered and five non-allocatable. No handle was deleted or renamed. These counts are structural observations only. Semantic inspection supports representation of the designated decisions in the units; F1 independently prevents a complete accounting-coherence result.

### Whole-corpus non-regression examination

The inventory includes all tracked `.md`, `.yaml` and `.yml` paths at the candidate, obtained through Git rather than a non-hidden filesystem glob. The review combined exact base/head comparison, local-link/anchor validation, searches for changed authority/lifecycle concepts across the full corpus, and reading of the affected documents and dependency surfaces.

| Corpus class | Examination and result |
| --- | --- |
| SPEC, Capture, Allocation | Full changed-content comparison against source decisions and the base; only bounded awareness responsibilities revised. Twelve of 14 prior Capture constraint/rationale sections and seven of eight prior allocation units are byte-identical. F1 is the sole newly identified documentary inconsistency. |
| README, AGENTS, contributor acquisition/build instructions | Authority, manual maintenance, source locks and downstream boundaries examined. No new automatic candidate trigger or publication authority found. Documentation describes existing helpers without requiring monitoring history. |
| Harness architecture and qualification | Scope and evidence limits examined. These documents address tooling and historical experiments, not a prohibition on future monitoring. Qualification references its recorded past revision; no stale historical digest was promoted to the new current source identity. |
| Five repository standards and OpenSpec context | Authority, design-change exemption, failure behavior, checks/tests and Change lifecycle examined. They remain compatible with the design-only PR and future one-unit A-watch realization. Their existing verification rules were not expanded by this report. |
| Two synchronized realization specs | Existing source-selection/acquisition and canonical-build requirements and scenarios examined for conflict. A-watch reads pins but does not change source resolution, integrity or compilation. No realization capability is silently claimed for monitoring. |
| Two archived Change bundles | Immutable bytes and historical snapshot/role boundaries checked; proposals, coverage, design and tasks examined at the affected source/build/candidate/publication interfaces, with corpus searches over evidence and reports. Existing archives were not edited or reverified for runtime correctness. Historical statements remain attributable to the recorded stage and revision. |
| Eight repository-owned/generated skill documents and target metadata | Unchanged identities established; applicable authority/verification instructions read, and cross-corpus dependency/link checks applied. Generic workflow guidance does not supersede the repository's current contract or require a fabricated Change for this design revision. |
| Workflow, pins, code, dependency records and LICENSE | All unchanged; workflow gate applicability examined, existing tests renewed. No implementation, pin, dependency or licensing delta accompanies the design revision. |

Local Markdown link validation examined 151 links at the base and 152 at the candidate, including target existence and heading anchors; no unresolved local destination or anchor was found in either snapshot. External URLs and prior runtime evidence were not comprehensively revalidated. Unchanged text is not treated as independently proven truth; the whole-corpus conclusion is limited to regressions and drift introduced by this PR at the examined dependencies.

### Executable checks, observations and limits

Executed anew on the byte-matched local candidate before this report:

```sh
sh tools/check-repository.sh
sh tools/test-repository.sh
```

Both commands exited zero. Test runners reported 19 gate tests, 25 acquisition tests and 19 build-orchestration tests, with no failed or skipped tests. The custom read-only audit recomputed source digests, compared tree blobs, checked unaffected sections and local links, and compared unit-to-handle relations with coverage rows at base and head. Base discrepancies: none. Candidate discrepancy: `A-watch` → `C-inputs`, omitted from the reciprocal row. It does not establish an executable universal semantic oracle.

Remote check-run records associated with `1f8a4ed48fae749ab87cc100508758fee08c0a57` were retrieved during this review. [Check job](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37623256974/job/112798527012), [tests job](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37623256974/job/112798526875), [Verification gate job](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37623256974/job/112798527053) and [Archive gate job](https://github.com/at-rama/sqlite-vec-wasm/actions/runs/37623256974/job/112798527234) report success. These links identify hosted execution records; local temporary raw outputs and audit scripts are not committed evidence artifacts. The report records their observations without implying that the linked CI jobs executed the custom semantic audit.

No browser rebuild, upstream-source redownload, monitoring run or push-delivery test was performed: the reviewed delta changes design prose, not those implementations. No formal OpenSpec Change-verification or archive operation was executed. The design-only gates' non-applicability is not a passing semantic verdict. The same agent authored and reviewed this revision; hashes, tests and hosted CI provide concrete identity/execution checks but do not make the semantic judgments independent of that common authorship.

## Required disposition

Correct F1 in Allocation's `C-inputs` coverage row, preserving A-inputs' acquisition/integrity ownership. Recheck the relation, source identities, changed-document fidelity and repository gateway against the resulting committed candidate. Do not change the contract or archived records merely to repair this accounting omission. Until that correction is examined, retain this report's FAIL verdict for its reviewed candidate. No correction, merge, archive or publication is authorized or performed by the verdict itself.
