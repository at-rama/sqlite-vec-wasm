# Repository instructions

Read [the editorial standard](.42p/standards/editorial.md) before writing human-facing content.

Read [the technical canon](.42p/standards/software.md) before changing repository files. It defines the shared engineering rules and current validation command.

[spec.md](spec.md) is the authoritative product contract. The Capture and Allocation under [.42p/engineering/](.42p/engineering/) are derived sources, not additional authority. Do not infer implementation progress from them or from a passing repository check.

Use a working branch and pull request targeting protected `main`; do not write to `main` directly. Run the canonical repository check on every proposed change. Integration and publication remain governed by `spec.md`.
