# Technical qualification — minimal demonstrated path

## Scope and evidence boundary

Examined on 2026-10-04 from repository revision `11c315cfe22f1eaf5fe1432a3f44bb38a96a3e89`. [SPEC.md](../../SPEC.md) remains authoritative; the unchanged [Capture](2026-10-04_sqlite-vec-wasm_capture_edit-0.1.md) and [Allocation](2026-10-04_sqlite-vec-wasm_allocation_edit-0.1.md) supplied the questions. This record is empirical evidence and a qualified tooling path, not another contract, implementation, or completed acceptance model.

All experiments were disposable under ignored `.work/qualification/`. Environment: Ubuntu 24.04.3, Linux x86-64, preinstalled native development and browser libraries. No sqlite-vec integration, product package, publication, or OpenSpec change was made. The source versions below are qualification fixtures, not a release selection or compatibility certification.

## Experiments and observations

| Question / experiment | Observed result | Consequence and epistemic limit |
| --- | --- | --- |
| Official source acquisition | Downloaded and checked SQLite 3.53.4 full source ZIP against the official SHA3-256; its `ext/wasm` and build tools are present. Downloaded/checked stable sqlite-vec 0.1.9 amalgamation; it contains only `sqlite-vec.c` and `sqlite-vec.h`. | Acquisition provides the source distributions identified by the contract without a recursive clone, submodule, or vec repository. Vec compilation/compatibility was not tested. |
| Upstream build substrate | `./configure --enable-all`, `make sqlite3.c`, then selected `ext/wasm/GNUmakefile` targets with `emcc_opt=-Oz` succeeded. Native `cc` built JimTcl, Lemon, generators, `c-pp`, and version/comment tools. | Use upstream configure/Make, in-tree inside the temporary source directory. A native C environment is required as well as Emscripten. No alternative build system or wrapper was used. |
| Removing Tcl / C++ | No system `tclsh` was installed; the build generated and used its included `jimsh`. Configure, amalgamation generation and optimized WASM build also succeeded with `CXX=/bin/false`. | No separate Tcl or host C++ installation is required for this tested path. This does not qualify upstream Tcl test suites. |
| Removing native C | `CC=/bin/false` made configure fail. SDK Clang compiled a native hello program and the amalgamation, but replacing both host compiler roles with it failed to link `c-pp` (`ceil`/`floor`). Its native link also used system libc, binutils and GCC runtime files. | Retain upstream's working system `cc` path; do not assume the WASM SDK is a complete native development environment. The SDK-Clang-only alternative is unqualified, not impossible. No upstream patch or extra linker workaround was adopted. |
| SDK installation / activation | Official emsdk installer snapshot installed/activated precompiled 4.0.23; `emcc --version` and the real build succeeded. SDK Node 24.19.0/npm 11.17.0 also ran the browser probes. | Python and SDK activation are required; no LLVM source compilation or CI setup action is necessary. Explicitly prepend the SDK Node `bin` directory for repository JS/npm tooling: activation alone left another Node/npm earlier in this runner's PATH. |
| Removing WABT | `make -n dist bin.wasm-strip=` stopped with upstream's “Cannot make release-quality binary” error. The optimized asset build used WABT `wasm-strip` and SDK `wasm-opt`. | Retain prebuilt WABT for this optimized canonical path; Binaryen comes with emsdk. A lowest possible WABT/SDK version was not searched. |
| Generated browser assets | Produced JS, ESM, WASM, Worker1 loaders/promisers, OPFS proxy and bundler-friendly variant using only upstream targets. | No bundler is needed to produce these assets. Complete retained-baseline packaging/omission checks remain future acceptance work. |
| Real headless browser / direct CLI | Official Chrome for Testing headless shell 153.0.8010.12 launched; direct `--headless --dump-dom` handled a page. | One headless real browser suffices as an initial automation substrate. CLI dumping alone supplied neither assertions nor the context/Worker coordination used by the remaining probes; it is sufficient for simple smoke output. No cross-browser matrix was added. |
| Smaller automation / test stack | `playwright-core@1.63.0` alone plus `node:test` passed four probes: direct CLI, ESM initialization/`select 1` and vanilla Worker initialization, OPFS platform sync handles through fresh Workers, and the isolation-header distinction. A single-dependency lockfile reinstalled with `npm ci` using an empty cache. | Retain the automation library, not `playwright`, `@playwright/test`, or a second test runner. Browser-context lifecycle, evaluation and Worker messaging required no framework fixtures. Plain `.mjs` was sufficient; TypeScript had no demonstrated benefit. |
| Minimal HTTP serving | `node:http` with `node:fs` served generated assets at loopback, with `application/wasm`, JS/ESM MIME, COOP `same-origin`, COEP `require-corp`, and URL pathname handling. Both loading modes reported SQLite 3.53.4; the Worker installed the `opfs` VFS. Omitting isolation headers made `crossOriginIsolated`/SharedArrayBuffer false. | No dev-server dependency or althttpd installation is required. Query strings on OPFS proxy requests must not become part of disk filenames: the initial naive server caused proxy loading failure. Loopback supplied a secure context; remote HTTPS hosting was not qualified. |
| Packaging without bundling | A disposable private, differently named package ran `npm pack --ignore-scripts`; extracted JS/ESM/WASM bytes exactly matched generated inputs. | Ordinary npm packing can retain assets unchanged. This was not the project package or a proof of its full distribution contract; npm publishing/authentication was not exercised. |

### Installation failures and reproducibility limits

The moving build documentation mentioned `release`, but that target does not exist in the downloaded 3.53.4 source. The source's targets and flags, not moving documentation, determined the successful experiment.

The first emsdk 6.0.11 native-Clang version probe crashed here; its extracted-binary integrity was not established, so neither a general incompatibility nor its cause is proven. Overlaying SDK versions subsequently left incompatible files; a fresh 4.0.23 installation worked. Root extraction initially failed to set archive ownership; `TAR_OPTIONS=--no-same-owner` fixed that runner-specific failure without changing upstream code.

Both Playwright 1.63.0 and 1.55.1 browser-install attempts failed: their CDN URLs returned a 195-byte HTML response rather than ZIP data; stale-lock errors also occurred. Direct official Chrome-for-Testing storage downloads worked, so the demonstrated browser installation uses its versioned ZIP and explicit `executablePath`. This establishes an alternative installation path, not that Playwright installation fails on ordinary CI.

A separate checkout of the recorded repository revision downloaded sources, SDK, WABT and browser again, with no reused SDK installation or npm cache. It rebuilt optimized assets, installed the single automation dependency, and passed a fresh native-Node test of ESM/Worker initialization and OPFS VFS installation. An incomplete extracted browser initially caused EACCES/segfault; re-extraction and member-digest verification preceded the successful replay. A later filesystem read again reported a truncated member. Thus the replay establishes successful fresh-workspace execution at the time of the probe, not reliable artifact persistence across invocations in this managed workspace; that anomaly remains unresolved.

This was **not a fresh OS**: `ldd` found all Chrome libraries already installed (glib/gobject, NSS/NSPR, ATK, DBus, X11, GBM/DRM, ALSA and their dependencies). Playwright's `install-deps chromium --dry-run` failed on unavailable font/Xvfb packages in the runner's package index. Headless probes used neither Xvfb nor a display server. A bare-OS package installation and the full build/browser path on GitHub's hosted runner were not tested. The existing CI only runs repository checks. Root browser launches used `--no-sandbox`; a sandboxed non-root launch was not qualified.

## Smallest supported stack

| Component | Responsibility / status |
| --- | --- |
| Linux x86-64 with Bash, GNU Make, Python 3, Git, host C development environment | Required roles observed in upstream configure, generation, native helpers, emsdk and Make recipes. Tested with Make 4.3, Bash 5.2.21, Python 3.12.14, GCC 13.3.0, binutils 2.42, libc-dev 2.39 and libgcc development files on Ubuntu 24.04.3. |
| HTTPS downloader/CA trust, ZIP and tar/xz extraction | Required acquisition capabilities. curl 8.5.0, unzip 6.0, tar 1.35 and xz 5.4.5 worked; those particular frontends are convenient standard choices, not product requirements. Preserve archive executable modes and check extraction completion. |
| Official emsdk 4.0.23 + WABT 1.0.42 | WASM compilation/linking/optimization and upstream stripping; prebuilt tools, not another build system. |
| SDK Node 24.19.0/npm 11.17.0 | JS test orchestration, browser control, temporary HTTP serving and npm packing; future npm publication is allocated separately. They do not turn the build or product into a Node application. |
| `playwright-core` 1.63.0 + Chrome headless shell 153.0.8010.12 | Control/launch one real browser. The library has no transitive dependencies in the tested lockfile. Browser OS libraries remain system prerequisites. |
| `node:test`, `node:http`, `node:fs` | Tests/assertions and minimal test serving using the same Node runtime; no additional test/server package. |

No bundler, TypeScript, full Playwright Test, additional runner, development server, system Tcl, host C++ package, CMake/Meson/Ninja, Docker/Nix, custom build wrapper, or OpenSpec installation was needed by the successful probes. Their absence does not preclude a later separately justified need. No toolchain configuration or helper was adopted into the repository merely because an experiment used it.

## Identities and reconstruction

These are the measured qualification identities to record/verify if this path is adopted. Build options and compiler/browser/tool identities materially affect reproduction or acceptance; dependency state needs exact versions and npm lock integrity. No product release version was assigned.

| Input | Versioned official location / integrity |
| --- | --- |
| SQLite full source | [2026/sqlite-src-3530400.zip](https://sqlite.org/2026/sqlite-src-3530400.zip); SHA3-256 `b834d474b9b393d85a9e3ee4cc11f1329e007e9376a424ee740796f5c4bda3a8` (official download-page checksum). |
| vec amalgamation, acquisition only | [v0.1.9 archive](https://github.com/asg017/sqlite-vec/releases/download/v0.1.9/sqlite-vec-0.1.9-amalgamation.tar.gz); SHA256 `3acd67cb4aff080c7050926fd3cf8227905fe5b7ee3829d8ee5024ab1283cf61` (release asset digest). |
| emsdk installer | [snapshot 96c657f](https://github.com/emscripten-core/emsdk/tree/96c657fc60920d2a6a82318aa50e0abf82749604), no recursive checkout; install/activate `4.0.23`, SDK build `aaa43392544d695232b70eda706d751f18980c2a`. |
| SDK binary archive | [versioned prebuilt archive](https://storage.googleapis.com/webassembly/emscripten-releases-builds/linux/aaa43392544d695232b70eda706d751f18980c2a/wasm-binaries.tar.xz); observed SHA256 `5f1565fe45a1223cedf3b0300f5089c2c64954d2895b2aaedc85043c719be965`. |
| SDK Node archive | [node-v24.19.0-linux-x64.tar.xz](https://storage.googleapis.com/webassembly/emscripten-releases-builds/deps/node-v24.19.0-linux-x64.tar.xz); observed SHA256 `14b342e71204f811bde6153be8e04b62aef63c236fef92b55f9c83154b409647`. |
| WABT | [1.0.42 linux-x64 archive](https://github.com/WebAssembly/wabt/releases/download/1.0.42/wabt-1.0.42-linux-x64.tar.gz); SHA256 `84895407a6bbb80e918f33b16b2fb2206021c150b6bc9ff6f761263a745ab131` (release asset digest). |
| Chrome headless shell | [153.0.8010.12 linux64 ZIP](https://storage.googleapis.com/chrome-for-testing-public/153.0.8010.12/linux64/chrome-headless-shell-linux64.zip); observed SHA256 `a9da028861a0cf789ff25c2fed45f5f1aaf969ed9247835b6a7821a4f7af9d1d`. Extracted executable SHA256 `ded93a9c9a53a1ae040f08124badcca95c938e9d5015ff340c3b5538c41bf39e`; 197422408 bytes. |
| Automation library | [playwright-core 1.63.0](https://registry.npmjs.org/playwright-core/-/playwright-core-1.63.0.tgz); npm integrity `sha512-rYCsBF/M5HjUch52bbtVONEFjv6Xu8sm8h72dNlR5bzIE1fvC/bxgspzkjSfU+MweEMmPM8KJebG6nnyxo5mCg==`; upstream browser revision 1243 corresponds to the tested Chrome version. |

Reconstruction, using empty temporary directories and the system prerequisites above: download the named archives, check against the recorded digests before use, extract SQLite with executable modes intact, and extract WABT/Chrome. Check `emcc --version`, `wasm-strip --version`, browser `--version` and the executable member digest before relying on them. For the SDK, fetch the installer commit explicitly into a fresh directory, then use its own commands (the tar option was needed only for this root runner):

```sh
# In a fresh temporary emsdk checkout at the recorded commit:
TAR_OPTIONS=--no-same-owner python3 emsdk.py install 4.0.23
python3 emsdk.py activate 4.0.23
. ./emsdk_env.sh
export PATH="$PWD/node/24.19.0_64bit/bin:$PATH"
# Add the extracted WABT bin directory to PATH before SQLite configure.
```

The exercised build commands, from a fresh extracted SQLite root with that environment:

```sh
CC=cc CC_FOR_BUILD=cc CXX=/bin/false ./configure --enable-all
make sqlite3.c
make -C ext/wasm emcc_opt=-Oz -j2 \
  jswasm/sqlite3.js jswasm/sqlite3.mjs \
  jswasm/sqlite3-worker1.js jswasm/sqlite3-worker1-promiser.js \
  jswasm/sqlite3-worker1-promiser.mjs jswasm/sqlite3-opfs-async-proxy.js \
  jswasm/sqlite3-bundler-friendly.mjs
```

This target list qualifies the substrate; it is not a final package manifest. The optimized upstream `dist` target additionally uses its own Bash `mkdist.sh` and `zip`; it was inspected and tested for the missing-WABT stop, not executed to completion. npm tarball packing does not require that upstream ZIP target.

For a disposable browser-tool directory, `npm install --save-exact --package-lock-only playwright-core@1.63.0`, check the resulting lock integrity against the table, then `npm ci --cache <empty-directory>` was exercised. Future repository tooling should retain its own manifest/lock rather than regenerate trust during updates. Launch with `chromium.launch({executablePath: <verified headless-shell>, headless: true})` inside `node --test <disposable-probe>.test.mjs`. Serve the unbundled `jswasm` directory with the MIME/URL/isolation behavior above; evaluate an ESM import and `sqlite3InitModule`, await a vanilla Worker's initialization message and terminate it. These use ordinary Node modules and browser APIs; the successful four-probe harness and separate replay harness were discarded rather than committed as future product tests.

## Inference, remaining questions, and canon comparison

**Supported inference:** upstream configure/Make + system native C + prebuilt emsdk/WABT, with SDK Node/npm + one browser-control library + one official headless browser, is sufficient for the measured build/initialization/control/packing path. Node's native facilities and direct artifacts leave no demonstrated need for another test runner, server framework, bundler, or language layer. Browser control is a practical reduction in custom protocol/lifecycle code, not a logically unique solution.

**Forced by evidence:** do not omit native C support or WABT from this qualified optimized path, assume an SDK installation/activation makes the desired Node first in PATH, treat CDN HTML as a browser archive, or treat an upstream initialization promise as proof that OPFS proxy assets loaded. None of this changes product behavior or its contract.

**Unresolved before claiming complete reproduction/acceptance:** bare-OS browser/native prerequisites and package setup; full hosted-CI build/browser reproduction; reliable extraction/artifact persistence in this managed workspace; the 6.0.11 crash; sandboxed non-root browser launch; and an SDK-native-Clang-only host build. sqlite-vec integration and complete API/Worker1/all-OPFS/FTS5/vector acceptance remain implementation-local obligations, deliberately not tested here. No uncertainty in the Capture or Allocation has been resolved by a new product decision.

The ordinary Ubuntu 24.04 runner already selected for repository CI is a plausible first environment for the tested Linux path; its complete suitability is an inference, not a CI result. It needs explicit tool/source/browser setup and runtime-library checks when product CI exists. No experiment established a need for a container or another CI topology.

| Canon finding classification | Result |
| --- | --- |
| Already correctly covered | Authoritative contract, temporary acquisition, ignored outputs, exact dependency identities, no reliance on caches, and repository-gate versus product-acceptance distinction. |
| Missing and repository-wide | No new current invariant requires a configuration/canon edit. The native/browser prerequisites above become executable prerequisites when product subjects exist. |
| Implementation-local | Build target/asset selection, extension integration, test serving/probes, npm packing and future lifecycle automation remain with their allocated surfaces. |
| Unnecessary existing machinery | None in the current Git/shell gate. Experimental full Playwright, older browser fallback and repeated SDK candidates were not retained. |
| Unresolved | Environment/install/extraction limitations listed above; no dummy gateway or silent success substitutes for them. |

The [technical canon](../standards/software.md) and executable configuration remain unchanged. The final reduction reran the optimized build with host C++ disabled, the browser probes using SDK Node and only `playwright-core`, and clean-cache dependency installation. Only this record is retained; no helper, package manifest/lock, toolchain tree, built artifact, or acceptance claim enters the repository delta.
