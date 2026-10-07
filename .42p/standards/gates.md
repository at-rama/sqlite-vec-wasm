# Pull-request gates

This repository canon defines the merge checks implemented by [the Repository workflow](../../.github/workflows/repository.yml), subordinate to [SPEC.md](../../SPEC.md). Follow the [Verification standard](verification.md) for evidence and the [OpenSpec usage canon](openspec.md) for the Change lifecycle.

## Activation and outcomes

The workflow runs on every pull-request opening, reopening and update, without path filters. Its independent jobs are `check`, `tests`, `verification` and `archive`. The first two also execute on pushes to `main`; the last two report explicit non-applicability on those post-merge pushes. A failed job does not skip the others.

`check` runs the existing lightweight repository gateway. `tests` runs `sh tools/test-repository.sh`: the offline gate, acquisition, build-orchestration and packaging suites. A present acquisition, build or packaging implementation without its mandatory test file fails. Add future mandatory suites to this entry point as their implementations enter the repository; do not infer acceptance of unimplemented allocations from these tests. The current harness validation obligations in the technical canon still apply to harness changes.

`verification` and `archive` inspect Git-tracked Change files changed between the PR head and its merge base with the target branch. Detect moves as deletion/addition and retain the original Change identity across `changes/<name>/` and `changes/archive/YYYY-MM-DD-<name>/`. Changes may be introduced already archived. Unchanged active Changes and archives are outside this PR's gates.

For every affected Change, require exactly one current location and a regular `.openspec.yaml` file. Missing Changes, removal without a corresponding archive, invalid names/dates, duplicate archives and simultaneous active/archived copies fail. Multiple affected Changes must all pass. A modified existing archive is checked under the same rules; review must justify edits to historical records.

| Job | Passing condition | Failure |
| --- | --- | --- |
| `check` | Existing repository integrity rules pass | Any integrity failure |
| `tests` | Registered applicable suites execute successfully | Failed tests, missing mandatory suite or prerequisites |
| `verification` | Each affected Change has a valid report, both coverage directions are 100%, and all control results and the verdict are `passed` | Missing/invalid report, incoherent identity or non-passing declaration |
| `archive` | Each affected Change is archived, retains its report and has no active copy | Active Change, missing report or invalid archive structure |

When no Change is affected, `verification` and `archive` return success with `not applicable`. They do not classify implementation files or detect an omitted Change. Only allocation-unit realization requires a Change here; design and canon evolution, including governance tooling, is exempt. Review remains responsible for that distinction, the report's semantic correspondence to its allocation unit, and evidence freshness. `checked_commit` is recorded for review, not compared with final HEAD or used to reconstruct freshness automatically. No build or publication gate is introduced by these jobs.

## Local execution and evidence

The merge gates require Git history, Python 3.9 or newer and standard-library modules only. Supply full commit SHAs; an unavailable commit or missing merge base fails. They read artifacts from the committed PR head, rather than untracked or working-tree files. From the repository root:

```sh
sh tools/check-repository.sh
sh tools/test-repository.sh
python3 tools/change-gates.py verification --base <target-commit-sha> --head <pr-head-sha>
python3 tools/change-gates.py archive --base <target-commit-sha> --head <pr-head-sha>
```

The local check/test commands stay independent of the merge gates. Apply and Verification can run them before the report exists or the Change is archived. The gates validate declared evidence; they do not rerun the agentic verification or establish semantic coverage independently. A nonempty Markdown evidence body is required, and the declared allocation handle must occur among the units defined in the repository's Allocation documents. Review resolves its exact source snapshot and Change correspondence.

## Required-check configuration

In the active ruleset protecting `main`, retain the required `check` context and add `tests`, `verification` and `archive`, using the GitHub Actions job contexts rather than guessed workflow-qualified names. Retain the up-to-date-branch requirement and existing protections. Do not filter these required jobs by paths, labels or PR type. A failing CI job blocks merge only when the ruleset requires its check; workflow files do not configure that protection themselves.

Register the new contexts after they have run successfully, and verify all four in the ruleset before treating the gates as enforced. While this tooling PR is unmerged, other PRs may need the new workflow from this branch or from updated `main` to produce the new required checks. Integration remains a human decision after the applicable gates pass.
