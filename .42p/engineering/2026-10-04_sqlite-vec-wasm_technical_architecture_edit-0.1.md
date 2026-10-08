# Technical architecture — build and browser verification harness

## Scope, authority, and provenance

This document describes the existing harness only, not the complete product architecture. Instituted decisions and sources retain product authority; the current [Distribution Capture](2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) and [Allocation](2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md) retain their derived roles. These realization choices support A-build and A-acceptance without adding product requirements, allocation units, or an implementation plan.

The retained choices were already recorded in the [technical canon before this extraction](https://github.com/at-rama/sqlite-vec-wasm/blob/d6b911f01c00995939e8ee0ff8ad5504dc8d1d03/.42p/standards/software.md#qualified-technical-harness). The [qualification](2026-10-04_sqlite-vec-wasm_qualification_edit-0.1.md) supplies historical experimental justification and limits, not another contract. A successful tooling probe is not product acceptance, release readiness, or evidence that all allocated responsibilities are implemented.

Exact current tool versions, commits, archive/member digests, and executable options remain defined by [tools/harness.sh](../../tools/harness.sh), its [browser helper](../../tools/harness/browser.mjs), and the tracked [manifest](../../tools/harness/package.json)/[lockfile](../../tools/harness/package-lock.json). This document explains their roles and behavior without maintaining a second version or integrity registry. Qualification identities describe that experiment; they do not independently select current inputs. Product source selection remains with A-inputs.

## Platform and tool roles

The retained harness targets Linux x86-64, using Bash and plain JavaScript ES modules. It supplies tooling only: product source acquisition, compilation, sqlite-vec integration, package metadata, and final asset selection are outside its implementation.

| Component | Retained role and boundary |
| --- | --- |
| System native C environment and GNU Make | Host tools and upstream Configure/Make recipes; the WASM SDK is not treated as a complete native development environment. |
| Official emsdk installer and prebuilt Emscripten | WASM compilation/linking/optimization and SDK activation; no LLVM source compilation or additional build system. |
| Prebuilt WABT | Upstream optimized binary stripping; Binaryen is supplied by emsdk. |
| SDK Node/npm | JavaScript test orchestration, browser control and dependency installation; tooling use does not add a Node.js product runtime. |
| Official Chrome headless shell and locked playwright-core | One real browser, obtained as a direct official archive and launched at its verified explicit path, rather than through the Playwright browser installer. |
| Native node:test, node:http and node:fs | Assertions and minimal loopback asset serving without another test or server dependency. |

This path uses no bundler, TypeScript, additional test framework, or server framework. These are current realization choices, not repository-wide prohibitions on a later separately justified need.

System prerequisites are Bash, Git, Python 3, GNU Make, native `cc` with its linker, headers and runtime development environment, HTTPS/CA access with curl, sha256sum, unzip and tar/xz, and Chrome's runtime libraries. The browser libraries include glib/gobject, NSS/NSPR, ATK, DBus, X11, GBM/DRM, ALSA and their dependencies. They must already be available; missing libraries fail rather than skip smoke verification. No separate native C++ or system Tcl prerequisite is established for the demonstrated path.

The qualification's observed OS/compiler/library versions are historical evidence, not pinned product build inputs or a demonstrated bare-OS package-install recipe.

## Acquisition, integrity, and command behavior

Recorded script identities and the npm lock authorize acquisition; ordinary installation does not refresh that trust. Sources and generated outputs remain temporary under the [repository exclusion rules](../standards/software.md#controlled-and-generated-material). Existing cache presence is not evidence of integrity.

| Entry point | Behavior |
| --- | --- |
| `bash tools/harness.sh install` | Checks platform/system tools, acquires and verifies official archives before upstream installation/extraction, activates the SDK, then checks identities. It does not overlay SDK versions. Repeated installation checks existing state; corrupt state fails. Removing the selected temporary tool directory permits reconstruction. Do not run concurrent installs in one checkout. |
| `bash tools/harness.sh check` | Independently checks recorded archives and installed tool identities, including Clang's member digest and the browser executable's size/digest. These member checks detect the extraction anomaly observed during qualification. |
| `bash tools/harness.sh deps` | Copies the private tracked manifest/lock into `.work/js/` and runs SDK `npm ci --include=dev --ignore-scripts`. It never regenerates the lock. |
| `bash tools/harness.sh smoke` | Checks identities, then runs the neutral browser/HTTP fixture with node:test. Missing prerequisites fail; this is tooling verification, not SQLite/vector acceptance. |
| `bash tools/harness.sh exec COMMAND [ARG ...]` | Activates and checks the environment, explicitly prioritizes SDK Node/npm and WABT in PATH, then runs an ordinary command. It selects neither product sources, build targets, nor a package manifest. |

From a clean checkout with the system prerequisites available, run from the repository root:

```sh
bash tools/harness.sh install
bash tools/harness.sh deps
bash tools/harness.sh smoke
sh tools/check-repository.sh
```

The [canon](../standards/software.md#validation-obligations) defines which checks a proposed change requires. Network reconstruction is intentionally absent from the lightweight repository gateway.

## Temporary state and execution constraints

Installed tools, archives and SDK configuration/cache default to ignored `.work/harness/`; npm dependencies/cache and smoke fixtures remain in `.work/`. An explicit absolute `HARNESS_STATE` can place tool state outside the checkout. No pre-existing external state is required; only repository-authored helpers and exact manifest/lock state are tracked.

In the managed workspace used for qualification, materialization reproduced truncated Clang under `.work/`, while extraction outside the checkout remained intact across subsequent invocations. When reconstructing there, set this before the command sequence and retain the exported value for later commands:

```sh
export HARNESS_STATE="$(mktemp -d /tmp/sqlite-vec-wasm-harness.XXXXXX)/tools"
```

This is a temporary-location workaround, not a resolution of the persistence anomaly. Integrity checks still reject altered extracted members. SDK activation records absolute paths and does not by itself guarantee that SDK Node/npm precede other installations in PATH; the harness explicitly establishes and checks that priority.

## Browser helpers and upstream build boundary

[browser.mjs](../../tools/harness/browser.mjs) launches the verified explicit browser path using playwright-core. [server.mjs](../../tools/harness/server.mjs) serves a chosen test directory at loopback with JavaScript/ESM/WASM MIME types, URL pathname handling, COOP `same-origin` and COEP `require-corp`. Query strings are not disk filenames. These are test helpers, not product APIs or consumer hosting.

Upstream Configure/Make remains the demonstrated build mechanism. From a separately acquired and verified temporary SQLite source tree, the qualified configuration uses `tools/harness.sh exec` from the checkout to run `env CC=cc CC_FOR_BUILD=cc CXX=/bin/false ./configure --enable-all`, followed by `make sqlite3.c` and upstream `ext/wasm` targets with `emcc_opt=-Oz`. These options describe the qualified path, not an implemented product build configuration; the qualification's target list is evidence, not the final product asset manifest. The harness itself neither builds SQLite nor integrates sqlite-vec.

## Evidence and unresolved limits

The [qualification experiments](2026-10-04_sqlite-vec-wasm_qualification_edit-0.1.md#experiments-and-observations) support the retained native C, upstream Configure/Make, prebuilt SDK/WABT and minimal browser/test stack. They do not establish broader environment or acceptance coverage. The neutral smoke proves browser launch, module/fixture delivery and isolation, not product acceptance.

The [recorded reproducibility limits](2026-10-04_sqlite-vec-wasm_qualification_edit-0.1.md#installation-failures-and-reproducibility-limits) remain unresolved: full hosted-CI build/browser reproduction, bare-OS setup, stable artifact persistence in the managed workspace, an alternative SDK probe crash, sandboxed non-root browser launch, and SDK-Clang-only host builds. Root launches in the qualified path used Playwright's default no-sandbox behavior. Alternative SDK and host-compiler experiments are unqualified, not established replacements or technical impossibility proofs. The current Repository CI runs the lightweight repository check and registered offline tests; it does not qualify these build/browser paths.
