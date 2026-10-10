# Repository instructions

## Authority and navigation

Read the applicable repository standards before acting. Instituted decisions and sources retain design authority; Captures and Allocations are derived projections, not independent decision authorities.

- [Editorial standard](.42p/standards/editorial.md) — human-facing content.
- [Technical canon](.42p/standards/software.md) — repository engineering and validation.
- [Pull-request gates](.42p/standards/gates.md) — integration controls.
- [OpenSpec canon](.42p/standards/openspec.md) — Change lifecycle.
- [Verification standard](.42p/standards/verification.md) — post-Apply verification.

Resolve current Captures, Allocations and other engineering documents from `.42p/engineering/`. Do not assume fixed filenames, versions or implementation status.

## Workflows

Read and follow the applicable repository-owned skill under `.42p/.agents/skills/` before invoking its workflow.

OpenSpec lives under `.42p/openspec/`; run normal OpenSpec CLI commands from `.42p`.

## Repository changes

Work on a branch through a pull request targeting protected `main`. Do not write directly to `main`.

Run the canonical repository check for every proposed change and applicable tests under the technical canon. Do not interpret passing checks as implementation acceptance or publication authorization.

Preserve human integration and publication authority. Escalate unresolved authority or required semantic revisions rather than deciding them locally.
