# sqlite-vec-wasm

sqlite-vec-wasm exists to build and publish the canonical SQLite browser/WASM distribution with an official stable sqlite-vec release statically integrated, reproducibly, without functionally modifying either upstream.

The goal is a ready-to-use browser distribution that saves you from building WASM and integrating the extension yourself, while preserving SQLite's browser APIs and upstream vector-search behavior.

## Browser support

The distribution targets browsers, with JavaScript and ES module loading, FTS5, Worker1 and its promise interface, and OPFS where supported by the browser and hosting environment. Static integration makes sqlite-vec available without loading an extension or compiling anything yourself.

Node.js runtime support, native binaries and WASI are outside the project's scope. For server use, use `node:sqlite` with native sqlite-vec. The project adds no SQL abstractions, ORM, application APIs or custom vector-search behavior.

## Releases

Releases provide the same version and browser files through npm and [GitHub Releases](https://github.com/at-rama/sqlite-vec-wasm/releases). Each release identifies the included SQLite and sqlite-vec versions and file checksums. Check GitHub Releases for available versions, downloads and release details.

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

- [SPEC.md](SPEC.md) defines the product requirements.
- [Engineering notes](.42p/engineering/) record the technical analysis and build investigation.
- [Development rules](.42p/standards/) describe how to work in this repository.

## License and upstream

Repository-authored material is licensed under [Apache-2.0](LICENSE). Included upstream material retains its applicable licenses and notices.

Upstream projects: [SQLite WASM](https://sqlite.org/wasm/doc/trunk/building.md) and [sqlite-vec](https://github.com/asg017/sqlite-vec).
