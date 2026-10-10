# Allocation ↔ Change coverage

## Identity and examination scope

Start: `A-release` in the [global Allocation](../../../engineering/2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md) at main `ccbe98fac94bed8ed50eb031b304129741a09612`, SHA-256 `abe5e03502050cffa805b0516324fc190da83c5625ebede5c5b38038c2bd6593`. End: active Change `publish-distribution`, consisting of proposal, the complete added `distribution-release` specification, design and uncompleted tasks on branch `docs/propose-distribution-release`.

The [proposal](proposal.md#allocation-and-capture-snapshot) records exact Capture snapshots. Examination follows the selected unit's complete qualified portions and its shared runtime, human-authority, failure and dependency boundaries. Relevant synchronized `browser-package` and `browser-acceptance` requirements remain unchanged and supply actual handoff/evidence constraints. Archives supply historical context only; their earlier passing verdicts are not carried forward.

Procedure: repository-owned `42p-verify-derivation`, local Allocation-to-Change profile, applied read-only after drafting the four artifacts. The target was examined independently in reverse before recording this correspondence. This record is an authorized planning/coverage artifact, not a post-Apply `verification.md`. Original sources → Capture and Capture → Allocation are outside the examined segment. Code behavior, live authentication/publication and implementation acceptance are not examined.

## Bidirectional correspondence

Each requirement below is grounded in the source portions in the same row. Scenario qualifiers identify the cases to preserve; the specification retains their full conditions/outcomes.

| Attributed obligation / boundary | Change requirement and material scenarios | Tasks |
| --- | --- | --- |
| W/C-determinism: one algorithm/no AI; forecasts are not reservations; unchanged inputs/state give unchanged results | Shared deterministic calculation: common consumers; changed state after forecast | 1.1–1.3, 2.1, 3.4 |
| D/C-purpose publication boundary; D/C-release and W/C-version-identity: one product distribution, exact code commit, dist tag/npm identity, no code SemVer or permanent dist branch | Single distribution identity: published product/version/commit; design decisions 1 and 5 retain browser-only/no-runtime-change scope | 1.2, 3.3, 4.1–4.2 |
| D/C-release and W/C-semver: numerical maximum signal, suffix separation, default PATCH, no compatibility waiver; D/C-autonomy rollback/comment portion consumed at release boundary | Numerical upstream increment: PATCH/MINOR into prereleases, mixed signals/rebuild, explicit rollback | 1.1–1.2, 2.2, 3.3 |
| D/C-release and W/C-semver: immature-engine ceiling and vector 1.x regime | Distribution maturity ceiling: SQLite MAJOR capped to 0.5.0; vector reaches one | 1.2 |
| D/C-release, W/C-semver: initial 0.1.0; D/C-bootstrap retained verification; user's operational first-stable selection, without a change to general prerelease admissibility | Selected stable bootstrap: initial stable; prerelease test/preparation cases establish no initial publication authority | 1.2, 4.5, 5.2 |
| D/C-release and W/C-channels: upstream-exclusive latest/next, stable versus alpha form, own alpha counter, exact suffix provenance | Upstream-derived publication channel: four input combinations; manual override rejected | 1.1–1.3, 3.3, 4.2 |
| D/C-release and W/C-semver/C-channels: channel monotonicity without global maximum, valid series continuation/higher base, stable closure | Independent channel progression and alpha series: stable-maintenance sequence; closed base; continue/replace | 1.2, 2.1, 3.4 |
| W/C-determinism publication inputs; D/C-release and W/C-publication: current tags/npm HEADs/provenance, uniqueness, collision failure; D/R-updates and W/R-frugality: no reservation/application lock | Complete publication state and uniqueness: existing/concurrent identity; inaccessible/inconsistent history | 1.3, 2.1, 3.4, 4.1–4.3 |
| D/C-autonomy and W/C-determinism/C-publication: human candidate initiation/integration followed by automatic publication; passing checks/dispatch are not adoption | Human-authorized integration trigger: integrated candidate; no authorization from preparation/unrelated merge | 2.2–2.3, 4.4 |
| D/C-release and W/C-publication: definitive post-integration calculation and package-affecting recalculation require applicable qualification | Definitive identity before final qualification: forecast/final metadata difference | 3.1–3.2, 3.4 |
| D/C-release/C-failure and W/C-publication: all mandatory gates, authoritative revision/exact payload, no PR-head shortcut/no human waiver; A-release consumes A-acceptance | Applicable complete acceptance evidence: exact complete pass; different revision/payload or incomplete evidence fails | 3.1–3.2, 5.1–5.3 |
| D/C-purpose/C-release: consumer-ready npm/GitHub envelope, same verified runtime, notices and no compilation; shared D/C-nonmodification boundary; A-release consumes A-package | Matching consumer payload and notices: two destinations same archive; altered identity/notices/bytes fail | 3.2, 4.1–4.2, 5.2 |
| D/C-release and W/C-provenance: commit/tag/Release/npm, upstream origins/versions/digests incl suffixes, build tools/options/environment, output digests, channel/comment; no manual registry | Complete publication provenance: traceable records; rollback/comment retention and concise generated notes | 3.3, 4.1–4.2 |
| D/C-bootstrap normal mechanisms: secretless trusted publishing and supported attestations, explicit unsupported mechanism/fallback | Trusted publishing and supported attestations: supported hosted environment; missing prerequisite fails | 4.4–4.5 |
| D/C-bootstrap and W/C-publication: minimum unavoidable first-npm exception changes automatic trigger only; no evidence waiver or recurring manual path; separate A-bootstrap dependency | Bounded initial npm exception: exact accepted initial payload; normal steady state after setup | 4.5, 5.2 |
| D/C-failure and W/C-publication: stop mandatory failure/no identity overwrite; D/R-updates and W/R-frugality retained frugality; shared generated-output boundary | Publication failures remain explicit: partial destination state; pre-publication failure; generated outputs remain temporary | 3.4, 4.1–4.3, 5.1–5.2 |

## Reverse examination and preservation

All 16 requirements and their 32 scenarios are represented above; no unrelated allocation requirement is introduced. The design's JavaScript module split, candidate descriptor reader, closed-PR event, fresh integrated-commit production, draft/upload/npm/finalize sequence and injected-service tests are proposed realization choices within the attributed responsibility. They do not create another code version, change upstream semantics or implement candidate preparation, discovery/email, account setup or the site.

The selected first-stable case uses the user's operational selection and the allocated initial-number rule; it does not delete later experimental publication requirements or institute a general stable-only source rule. The existing package/acceptance contracts retain all loading/API/storage/notices and clean-production obligations. A-release coordinates their handoffs, never substitutes its fixture checks for the mandatory real-browser matrix. A-updates/A-bootstrap readiness and any unsupported upstream acquisition case remain operational dependencies, not hidden waivers or duties silently reassigned to this Change.

Partial failure is explicitly observable; no atomic cross-service success is promised. The proposed non-destructive handling retains the existing no-overwrite/failure boundaries and is not represented as a user-approved automatic recovery mechanism. Existing identities cause failure; no repair/reservation registry or repeated manual publish path is added. Missing supported authentication/attestation fails explicitly; the initial exception cannot weaken evidence or identity.

## Pre-Apply disposition and limits

PASS for documentary coverage, grounding, preservation and consistency within the examined Allocation → Change segment: both directions cover 100% of A-release's attributed obligations. No established omission, unallocated requirement or contradiction was found in the reviewed artifacts. Source snapshot identities match the Allocation inputs; unchanged synchronized package/acceptance handoffs are compatible with the proposed consumer.

This verdict assesses the planned realization contract, not an executed release calculation or publisher. A previously unhandled numerical/state case requiring a substantive policy choice must be escalated during Apply rather than invented locally. Interface/path choices remain technical proposals for review, not proof of producer implementation or publication authorization. Live trusted publishing, npm/GitHub payload identity, build/browser qualification and all implementation tasks remain unexecuted here. Renew this examination if upstream sources or the Change's semantics change; post-Apply 42p Verification remains separate.
