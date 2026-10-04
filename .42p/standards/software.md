# Technical repository canon

This is the repository-wide engineering authority, subordinate to [spec.md](../../spec.md). It translates repository concerns from the current [Capture and Allocation](../cases/specification/) without changing their product obligations. Executable configuration defines the current checks; this document explains their scope and prerequisites.

## Lightweight repository gateway

A Git checkout, Git 2.18 or newer, and a POSIX shell with standard utilities are sufficient. No dependency installation, network access, cache, or unpublished local file is needed for this lightweight check. From the repository root:

```sh
sh tools/check-repository.sh
```

Stage new files before checking so Git includes them in the candidate snapshot. The command checks the complete tracked working snapshot for Git whitespace errors, requires the unique root `spec.md` and the agent/canon entry points, and rejects tracked files matching repository `.gitignore` rules, even if force-added. Local/global ignore configuration does not affect that rejection. It returns nonzero on any failure. It does not check arbitrary untracked files or prove absence of renamed/copied upstream sources; review still enforces those source boundaries.

The same command is mandatory for every proposed change and runs as `Repository / check` in pull-request and `main` CI. A successful repository check is not product acceptance or permission to publish. Changes to this gateway or its configuration must retain meaningful failure behavior; new checks enter this command when their implementation subjects exist. Do not bypass failures or substitute always-successful commands.

## Controlled and generated material

Keep repository-authored inputs, validation configuration, and necessary dependency/version records in Git. Acquire upstream sources and place generated outputs, temporary dependencies, caches, and verification evidence in ignored `.work/` (or outside the checkout). Never depend on its pre-existing contents. `.gitignore` also protects recognizable SQLite outputs from accidental staging outside that workspace; the gate rejects tracked ignored material. This is an acquisition/output convention, not a product module layout.

Before introducing any build or verification dependency, record the exact versions/options that materially affect its results and use the ecosystem's lockfile/integrity mechanism where applicable. Product input identities remain with A-inputs; technical harness identities below do not select SQLite or sqlite-vec release versions. External CI actions use full commit identities. The current checkout action is pinned in CI; the hosted OS label selects a platform, not an immutable product build environment. Portable Git/shell operations need no additional runtime manager or package lockfile.

## Scope and later gateways

No internal modules, APIs, layers, or additional architectural rules are established. Keep upstream boundaries and allowable glue as defined by the Specification and allocated responsibilities; do not introduce a shared framework ahead of a concrete need. POSIX shell remains sufficient for the Git gate. The qualified harness uses Bash and plain JavaScript ES modules.

A-inputs/A-build/A-package will supply verified inputs, build configuration, and final assets. The shared harness below supplies tooling only; product acquisition, compilation, package metadata and asset selection remain absent. A-acceptance still requires the complete clean-checkout production path and real-browser acceptance of final assets, including Worker1 and OPFS under the specified hosting prerequisites. None of those gates exists or is claimed satisfied here. Add their actual commands and required pinned tools to the common validation surface when they can execute meaningfully; do not replace them with bootstrap checks.

A-updates/A-release/A-bootstrap retain the specified autonomous, gated lifecycle and initial publishing exception. This PR-validation CI establishes neither upstream detection nor integration/publication automation, registry configuration, or release readiness. A-docs and A-lifecycle need no separate repository tooling. Preserve rationale in the existing sources instead of creating additional design or maintenance documents. A passing check adds no human approval requirement to the specified future autonomous lifecycle.

## Qualified technical harness

The [merged qualification](../cases/specification/2026-10-04_sqlite-vec-wasm_specification_qualification_edit-0.1.md) is the evidence for this tooling path, not a second product contract. The instituted harness is Linux x86-64: upstream emsdk installer commit `96c657fc60920d2a6a82318aa50e0abf82749604`, prebuilt Emscripten 4.0.23, WABT 1.0.42, SDK Node 24.19.0/npm 11.17.0, official Chrome headless shell 153.0.8010.12, and locked `playwright-core` 1.63.0 with native `node:test`. Recorded archive digests in `tools/harness.sh` and the npm lock authorize acquisition; ordinary installs must not refresh that trust. No LLVM compilation, Playwright browser installer, bundler, TypeScript, additional test framework or server dependency is involved.

Prerequisites are Bash, Git, Python 3, GNU Make, native `cc` plus its linker/headers/runtime development environment, HTTPS/CA access with curl, sha256sum, unzip and tar/xz, and Chrome's system runtime libraries. The qualification observed Ubuntu 24.04.3 with GCC 13.3.0/binutils 2.42/libc development 2.39; it did not establish a bare-OS package-install recipe or pin those system packages as product build inputs. Browser libraries (glib/gobject, NSS/NSPR, ATK, DBus, X11, GBM/DRM, ALSA and dependencies) must already be available. Missing libraries fail rather than skip smoke verification. No separate native C++ or system Tcl prerequisite is established.

From the repository root, in order on a clean checkout:

```sh
bash tools/harness.sh install
bash tools/harness.sh deps
bash tools/harness.sh smoke
sh tools/check-repository.sh
```

`install` downloads and checks official tool archives before upstream installation/extraction, then checks identities. It never overlays SDK versions. Repeated installation checks existing state instead of trusting cache presence; corrupt state fails, and deleting the selected temporary tool directory permits reconstruction. Do not run concurrent installs in the same checkout. `deps` copies the tracked private tooling manifest/lock to `.work/js/` and runs SDK `npm ci --include=dev --ignore-scripts`; it never regenerates the lock. `check` independently checks installed tool identities and recorded archives, including Clang's member digest and the browser executable's size/digest to detect the observed extraction anomaly. `exec COMMAND [ARG ...]` runs an ordinary command after activation/identity checks, explicitly prioritizing SDK Node/npm and WABT in PATH. Use it for subsequent tooling and direct upstream Configure/Make commands; it does not choose sources, targets or a package manifest. From a separately acquired/verified temporary SQLite source tree, the qualified configuration is `bash <checkout>/tools/harness.sh exec env CC=cc CC_FOR_BUILD=cc CXX=/bin/false ./configure --enable-all`, followed by `exec make sqlite3.c` and the upstream `ext/wasm` targets with `emcc_opt=-Oz`. The target list in the qualification is evidence, not the final product asset selection.

Installed tools, archives and SDK configuration/cache default to ignored `.work/harness/`; npm dependencies/cache and smoke fixtures remain in `.work/`. An explicit absolute `HARNESS_STATE` may place the tool state outside the checkout. In this managed workspace, materialization reproduced truncated Clang in `.work/`, while extraction outside the checkout remained intact across subsequent invocations; use `export HARNESS_STATE="$(mktemp -d /tmp/sqlite-vec-wasm-harness.XXXXXX)/tools"` before the command sequence here when reconstructing in that environment. Retain the exported value for later commands. This is a temporary-location workaround, not a resolution of the underlying persistence anomaly; checks still reject altered extracted members. No pre-existing external state is required. Only repository-authored helpers and exact manifest/lock state are tracked. `tools/harness/browser.mjs` launches the verified explicit browser path using `playwright-core`; `server.mjs` serves a chosen test directory at loopback with JS/ESM/WASM MIME, URL pathname handling, COOP `same-origin` and COEP `require-corp`. These are test helpers, not product APIs or consumer hosting. Upstream Configure/Make remains the build mechanism; this harness does not build SQLite or integrate vec.

For harness changes, installation, locked dependencies and smoke verification are mandatory in addition to the lightweight check; changes to acquisition/bootstrap must also be reconstructed in an isolated checkout with empty tool/npm state. The neutral smoke proves browser launch, module/fixture delivery and isolation, not product acceptance. Network reconstruction is intentionally absent from the lightweight CI gateway. Full hosted-CI build/browser reproduction, bare-OS setup, stable artifact persistence in this managed workspace, sandboxed non-root browser launch, the unqualified SDK 6.0.11 crash and SDK-Clang-only host builds remain unresolved. The qualified root launch uses Playwright's default no-sandbox behavior. Do not infer broader environment or acceptance coverage from a green smoke test.
