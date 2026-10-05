# Repository instructions

Read [the editorial standard](.42p/standards/editorial.md) before writing human-facing content.

Read [the technical canon](.42p/standards/software.md) before changing repository files. It defines the shared engineering rules and current validation command.

[SPEC.md](SPEC.md) is the authoritative product contract. The Capture and Allocation under [.42p/engineering/](.42p/engineering/) are derived sources, not additional authority. Do not infer implementation progress from them or from a passing repository check.

Use a working branch and pull request targeting protected `main`; do not write to `main` directly. Run the canonical repository check on every proposed change. Integration and publication remain governed by `SPEC.md`.

OpenSpec lives under `.42p/openspec/`; normal CLI commands MUST run from `.42p`. Read [the OpenSpec usage canon](.42p/standards/openspec.md) and use the generated skills under `.42p/.agents/skills/`. Each Change realizes exactly one allocation unit; sync requires 100% bidirectional coverage between that unit and the Change, not the complete Allocation. Apply may not reinterpret upstream authority. Verification remains a distinct 42P stage before archive.
