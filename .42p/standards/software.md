# Technical repository canon

This is the repository-wide engineering authority, subordinate to [spec.md](../../spec.md). It translates repository concerns from the current [Capture and Allocation](../cases/specification/) without changing their product obligations. Executable configuration defines the current checks; this document explains their scope and prerequisites.

## Bootstrap and current gateway

A Git checkout, Git 2.18 or newer, and a POSIX shell with standard utilities are sufficient. No dependency installation, network access, cache, or unpublished local file is needed to validate the repository. From the repository root:

```sh
sh tools/check-repository.sh
```

Stage new files before checking so Git includes them in the candidate snapshot. The command checks the complete tracked working snapshot for Git whitespace errors, requires the unique root `spec.md` and the agent/canon entry points, and rejects tracked files matching repository `.gitignore` rules, even if force-added. Local/global ignore configuration does not affect that rejection. It returns nonzero on any failure. It does not check arbitrary untracked files or prove absence of renamed/copied upstream sources; review still enforces those source boundaries.

The same command is mandatory for every proposed change and runs as `Repository / check` in pull-request and `main` CI. A successful repository check is not product acceptance or permission to publish. Changes to this gateway or its configuration must retain meaningful failure behavior; new checks enter this command when their implementation subjects exist. Do not bypass failures or substitute always-successful commands.

## Controlled and generated material

Keep repository-authored inputs, validation configuration, and necessary dependency/version records in Git. Acquire upstream sources and place generated outputs, temporary dependencies, caches, and verification evidence in ignored `.work/` (or outside the checkout). Never depend on its pre-existing contents. `.gitignore` also protects recognizable SQLite outputs from accidental staging outside that workspace; the gate rejects tracked ignored material. This is an acquisition/output convention, not a product module layout.

Before introducing any build or verification dependency, record the exact versions/options that materially affect its results and use the ecosystem's lockfile/integrity mechanism where applicable. Resolve official upstream versions/digests under A-inputs and build-defining tools under A-build when those responsibilities are implemented; do not fabricate pins for unused tools now. External CI actions use full commit identities. The current checkout action is pinned in CI; the hosted OS label selects a platform, not an immutable product build environment. Portable Git/shell operations need no additional runtime manager or package lockfile.

## Scope and later gateways

No internal modules, APIs, layers, or additional architectural rules are established. Keep upstream boundaries and allowable glue as defined by the Specification and allocated responsibilities; do not introduce a shared framework ahead of a concrete need. POSIX shell is sufficient for the current Git-based gate, not a mandated language for later product tooling.

A-inputs/A-build/A-package will supply verified inputs, build configuration, and final assets. Their absent subjects do not justify acquisition scripts, compiler installation, build commands, package metadata, or dependency scaffolding yet. A-acceptance still requires the complete clean-checkout production path and real-browser acceptance of final assets, including Worker1 and OPFS under the specified hosting prerequisites. None of those gates exists or is claimed satisfied here. Add their actual commands and required pinned tools to the common validation surface when they can execute meaningfully; do not replace them with bootstrap checks.

A-updates/A-release/A-bootstrap retain the specified autonomous, gated lifecycle and initial publishing exception. This PR-validation CI establishes neither upstream detection nor integration/publication automation, registry configuration, or release readiness. A-docs and A-lifecycle need no separate repository tooling. Preserve rationale in the existing sources instead of creating additional design or maintenance documents. A passing check adds no human approval requirement to the specified future autonomous lifecycle.
