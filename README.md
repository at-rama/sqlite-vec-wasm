# sqlite-vec-wasm

`sqlite-vec-wasm` exists to build and publish the canonical SQLite browser/WASM distribution with an official stable upstream `sqlite-vec` release statically integrated, reproducibly and automatically, without functionally modifying either upstream.

Its intended product is a ready-to-use browser distribution that spares consumers from assembling the WASM build and extension integration themselves. The responsibility is to preserve SQLite's familiar browser surface and upstream vector semantics while supplying the complete runtime assets.

## Scope and distribution

The target is browser/WASM, retaining SQLite's canonical APIs, JavaScript and ES module loading, FTS5, Worker1 and its promise interface, and OPFS under upstream browser and hosting prerequisites. The extension is statically integrated and available without consumer-side extension loading or compilation.

Node.js runtime support, native binaries and WASI are outside this repository's responsibility. Server consumers use `node:sqlite` with native `sqlite-vec`. The project adds no SQL abstractions, ORM, application APIs or custom vector-search semantics. Node.js is used only for repository tooling.

The distribution contract calls for npm publication and downloadable [GitHub Release assets](https://github.com/at-rama/sqlite-vec-wasm/releases). Both channels must represent the same verified payload and project version; release records identify the included upstream versions and their integrity information. Use those publication records for available versions and release-specific consumption details.

## Reproduction and maintenance

The contract requires official, version-pinned, integrity-verified upstream inputs and a reproducible clean-checkout build, verification and packaging path. Upstream source trees and generated SQLite/WASM assets stay outside source control.

After the one-time repository/registry bootstrap, compatible stable upstream releases must pass the full gates and proceed automatically through repository integration, tagging, GitHub Release and npm publication. Failed verification blocks integration and publication. The [product contract](spec.md) defines the lifecycle and its bootstrap exception.

## Development

Read [AGENTS.md](AGENTS.md) and the [technical canon](.42p/standards/software.md) for prerequisites, temporary-state rules and the engineering command interface. Work through a branch and pull request targeting `main`.

The lightweight repository gateway needs Git and a POSIX shell. Stage new files before running:

```sh
sh tools/check-repository.sh
```

For the qualified Linux browser/toolchain harness, follow the canon's system prerequisites and temporary-location guidance, then run from the repository root:

```sh
bash tools/harness.sh install
bash tools/harness.sh check
bash tools/harness.sh deps
bash tools/harness.sh smoke
```

These commands install and verify development tooling and exercise a neutral browser fixture. They are not product installation or acceptance gates. `bash tools/harness.sh exec COMMAND [ARG ...]` runs repository tooling in the verified SDK environment.

## Engineering sources

- [spec.md](spec.md) is the authoritative product contract.
- [.42p/engineering/](.42p/engineering/) contains the derived Capture, Allocation and technical qualification. The contract governs any difference in reading.
- [.42p/standards/](.42p/standards/) contains repository-wide engineering rules.

## License and upstream

Repository-authored material is licensed under [Apache-2.0](LICENSE). Included upstream material retains its applicable licenses and notices.

Upstream projects: [SQLite WASM](https://sqlite.org/wasm/doc/trunk/building.md) and [sqlite-vec](https://github.com/asg017/sqlite-vec).
