# Technical repository canon

This is the repository-wide engineering authority, subordinate to [SPEC.md](../../SPEC.md). It translates repository concerns from the current [Capture and Allocation](../engineering/) without changing their product obligations. Executable configuration defines the current checks; this document explains their scope and prerequisites.

## Lightweight repository gateway

The lightweight check uses a Git checkout, Git 2.18 or newer, a POSIX shell with standard utilities, and Python 3.9 or newer for offline source-lock validation. No dependency installation, network access, cache, or unpublished local file is needed. From the repository root:

```sh
sh tools/check-repository.sh
```

Stage new files before checking so Git includes them in the candidate snapshot. The command checks the complete tracked working snapshot for Git whitespace errors, requires the unique root `SPEC.md` and the agent/canon entry points, and rejects tracked files matching repository `.gitignore` rules, even if force-added. Local/global ignore configuration does not affect that rejection. It returns nonzero on any failure. It also validates the source lock offline; automated suites run in the separate test command below. It does not check arbitrary untracked files or prove absence of renamed/copied upstream sources; review still enforces those source boundaries.

The same command is mandatory for every proposed change and runs as `Repository / check` in pull-request and `main` CI. A successful repository check is not product acceptance or permission to publish. Changes to this gateway or its configuration must retain meaningful failure behavior; new integrity checks enter this command when their implementation subjects exist; automated test suites enter the separate test command below. Do not bypass failures or substitute always-successful commands.

Run `sh tools/test-repository.sh` for the registered automated suites, using Python 3.9 or newer and the existing system Bash, tar and unzip for acquisition fixtures. It runs independently as the `tests` CI job; mandatory tests must not be replaced by report declarations. The [pull-request gate canon](gates.md) defines the separate Verification and Archive jobs and required-check configuration. These merge gates do not enter the lightweight local command or become prerequisites for producing a Verification report.

## Controlled and generated material

Keep repository-authored inputs, validation configuration, and necessary dependency/version records in Git. Acquire upstream sources and place generated outputs, temporary dependencies, caches, and verification evidence in ignored `.work/` (or outside the checkout). Never depend on its pre-existing contents. `.gitignore` also protects recognizable SQLite outputs from accidental staging outside that workspace; the gate rejects tracked ignored material. This is an acquisition/output convention, not a product module layout.

Before introducing any build or verification dependency, record the exact versions/options that materially affect its results and use the ecosystem's lockfile/integrity mechanism where applicable. External CI actions use full commit identities. A hosted OS label selects a platform, not an immutable product build environment. Portable Git/shell operations need no additional runtime manager or package lockfile.

## Shared engineering boundaries

Keep upstream boundaries and allowable glue as defined by the Specification and allocated responsibilities; do not introduce a shared framework ahead of a concrete need. Component-specific realization choices belong in the [technical architecture](../engineering/2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md), subordinate to the product contract; they are not repository-wide engineering rules.

## Validation obligations

For harness changes, installation, locked dependencies and smoke verification are mandatory in addition to the lightweight check; changes to acquisition/bootstrap must also be reconstructed in an isolated checkout with empty tool/npm state. Follow the [harness architecture](../engineering/2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) for system prerequisites and execution constraints, then run from the repository root:

```sh
bash tools/harness.sh install
bash tools/harness.sh deps
bash tools/harness.sh smoke
sh tools/check-repository.sh
```

Use `bash tools/harness.sh check` for an independent identity check and `bash tools/harness.sh exec COMMAND [ARG ...]` to run a command in the verified tooling environment.

These tooling checks do not replace product acceptance or human merge authority defined in SPEC.md. Missing prerequisites or failed checks must fail rather than silently skip required verification. Do not infer broader qualification or release readiness from a passing tooling check.
