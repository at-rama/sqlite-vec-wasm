# sqlite-vector-wasm

sqlite-vector-wasm aims to provide the canonical SQLite browser/WASM distribution with statically integrated vector search, reproducibly, without functionally modifying its upstreams.

The goal is a ready-to-use browser distribution that saves you from building WASM and integrating the extension yourself, while preserving SQLite's browser APIs and upstream vector-search behavior.

## Vector search

The selected engine is sqlite-vec. It provides native Float32 vectors and binary bit vectors with Hamming-distance search, with a small static integration that preserves SQLite's browser APIs and capabilities. Exactly one engine is integrated; there is no backend-selection or plugin API.

The selection can be reconsidered when observable maintenance, security, compatibility or technical suitability changes materially. Any replacement must preserve the applicable browser and distribution behavior, including binary vectors and Hamming search.

## Browser support

The distribution targets browsers, with JavaScript and ES module loading, C-style and OO1 APIs, BigInt, FTS5, Worker1 and its promise interface, and OPFS where supported by the browser and hosting environment. Static integration makes sqlite-vec available without loading an extension or compiling anything yourself.

OPFS requires the appropriate Worker context and supported browser/hosting conditions. See the [storage prerequisites](docs/build.md#browser-storage-conditions) for VFS-specific secure-hosting and isolation requirements. Requested persistence must not be silently replaced with transient storage.

Node.js runtime support, native binaries and WASI are outside the project's scope. For server use, use `node:sqlite` with native sqlite-vec. The project adds no SQL abstractions, ORM, application APIs or custom vector-search behavior.

## Releases

The product uses its own Semantic Versioning (`MAJOR.MINOR.PATCH`), independently of the included SQLite and vector-engine versions. Before `1.0.0`, compatible corrections and verified compatible upstream updates normally increment PATCH; additive or breaking product changes increment MINOR with an explicit compatibility explanation. From `1.0.0`, breaking changes increment MAJOR, compatible additions MINOR and compatible corrections PATCH. Upstream update size or passing tests alone does not determine compatibility.

Releases are intended to provide the same product version and verified browser payload through npm (`sqlite-vector-wasm`) and [GitHub Releases](https://github.com/at-rama/sqlite-vec-wasm/releases). Each release will identify the exact SQLite version, selected vector engine and version (currently sqlite-vec), file checksums and build provenance. The product version is never composed from the upstream versions. Check GitHub Releases for publication records before choosing a version.

## Builds and updates

Builds use official upstream sources with fixed versions and verified checksums. They can be reproduced from a clean checkout; downloaded sources and generated browser files stay outside source control.

Stable upstream releases are evaluated by maintainers. Updates are published only after verification and maintainer approval.

## Development

This repository is developed agentically. Changes are driven by versioned engineering artifacts and repository rules, executed against automated checks, and reviewed through pull requests.

Read [AGENTS.md](AGENTS.md) and the [development rules](.42p/standards/software.md) for repository requirements. Work on a branch and open a pull request targeting `main`.

The lightweight repository check uses Git, a POSIX shell and Python 3.9 or newer for offline source-lock validation. Stage new files before running:

```sh
sh tools/check-repository.sh
```

Run the registered automated suites separately, with the existing system Bash, Python, tar and unzip:

```sh
sh tools/test-repository.sh
```

The build orchestrator's offline tests also require Node 18 or newer and a native C compiler; the packaging suite uses npm for local archive packing/installation and Python for archive inspection. Follow the [canonical browser build instructions](docs/build.md) to construct the engine and inspect its handoff. Follow the [browser packaging instructions](docs/packaging.md) to assemble its distributable files and check the final archive.

To select exact upstream versions and acquire verified sources without the SDK, follow the [source acquisition instructions](docs/source-acquisition.md).

To set up and check the Linux browser/build tools, follow the [harness architecture](.42p/engineering/2026-10-04_sqlite-vec-wasm_technical_architecture_edit-0.1.md) for prerequisites and temporary-directory guidance, then run from the repository root:

```sh
bash tools/harness.sh install
bash tools/harness.sh check
bash tools/harness.sh deps
bash tools/harness.sh smoke
```

These commands set up development tools and test a small browser fixture. They do not install the product or test its SQLite/vector features. Use `bash tools/harness.sh exec COMMAND [ARG ...]` to run tools in the verified SDK environment.

## Project documentation

- [Engineering notes](.42p/engineering/) record the technical analysis and build investigation.
- [Development rules](.42p/standards/) describe how to work in this repository.

## License and upstream

Repository-authored material is licensed under [Apache-2.0](LICENSE). Included upstream material retains its applicable licenses and notices.

Upstream projects: [SQLite WASM](https://sqlite.org/wasm/doc/trunk/building.md) and [sqlite-vec](https://github.com/asg017/sqlite-vec).
