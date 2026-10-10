# Source acquisition

Run these commands from the repository root on Linux with Bash, Python 3.9 or newer, curl,
Git, tar and unzip. Source acquisition uses existing system tools; it does not
install or require the WASM SDK, Node.js, npm or browser tooling.

Resolve a candidate with each project's latest official stable release:

```sh
mkdir -p .work/inputs
bash tools/inputs.sh resolve --output .work/inputs/candidate.lock.json
```

Use `--sqlite-version 3.53.4` or `--sqlite-vec-version v0.1.9` to override either
project independently; both options can be supplied together. These are command
examples, not default pins. Explicit sqlite-vec overrides also accept published
`alpha`, `beta` and `rc` releases, such as `v0.1.10-alpha.4`; the complete suffix
is preserved in the pin, archive URL and handoff. The optional official `v`
prefix is normalized for sqlite-vec. Omitted versions still select each project's
latest stable release independently. Ranges, `latest`, development snapshots,
drafts and unpublished releases are rejected. SQLite selection uses its published
numbered releases and full source archives; the unofficial prerelease snapshots
on its download page are not eligible. No numbered SQLite prerelease archive
convention is implemented by this helper; a newly published format needs review
before support, rather than guessing URLs or substituting a stable version.
Missing official releases, sufficient
archives or published digests cause failure. There is no older-version fallback
or compatibility search.

The resolver uses `inputs/sources.lock.json` as its baseline when it exists.
Use `--baseline-lock PATH` to supply another retained baseline. Matching pins retain their recorded digest; changed official digest/archive
metadata for an established pin fails. An older explicit SQLite release whose
archive digest is no longer listed can use a retained baseline pin only after
its official release identity is confirmed. New pins always need an
official published digest. Resolution stores the metadata endpoints, observations
and selected pins under a fresh ignored `.work/inputs/resolve-*` directory.
It writes the complete candidate atomically and does not acquire sources or
commit/adopt the candidate. Inspect the candidate and its provenance before
recording reviewed pins in `inputs/sources.lock.json`.

Validate a lock without network access:

```sh
bash tools/inputs.sh validate inputs/sources.lock.json
```

After reviewing the lock, record it in the candidate Git snapshot before use:

```sh
git add inputs/sources.lock.json
bash tools/inputs.sh acquire --lock inputs/sources.lock.json
```

The production command requires the lock bytes to match the Git index, so an
unreviewed candidate under `.work/` cannot authorize source use. Acquisition
never refreshes checksums or changes the lock. Each invocation downloads both
archives into a new ignored `.work/inputs/acquire-*` workspace. Transport retries
are bounded and repeat the same URL, with HTTP failures treated as failures.
There is no source cache or reuse of earlier trees.

The command verifies each archive before extraction, rejects unsafe archive
paths and links, retains executable modes needed by SQLite, and checks for the
full SQLite build/WASM tree and sqlite-vec amalgamation C/header pair. On any
failure it removes only its own partial workspace and returns nonzero without a
pair handoff. Older workspaces remain untouched.

Only complete success emits JSON on stdout and writes `handoff.json` in the new
workspace. `sqlite.sourcePath` and `sqliteVec.sourcePath` locate the verified
sources; each entry also identifies its version, archive and verified digest.
`lockDigest` is the SHA-256 of the exact consumed lock bytes. The caller owns the
successful workspace lifetime and may remove it after use. Temporary paths are
specific to that invocation. A successful handoff establishes source acquisition,
not compatibility of the selected pair, a completed build or product acceptance.
Source admissibility does not select a publication channel: that policy belongs
to `A-release`. A future dispatch supplies exact versions; helper defaults do not
relax that obligation. Construction consumes the exact verified pair, including
published sqlite-vec prereleases, under the [canonical build checks](build.md).
Acquisition and raw-runtime construction do not establish final-package acceptance
or complete product support for prereleases.

Run the inexpensive offline checks with the existing system Python, Bash and archive
tools. The registered build-orchestration suite additionally requires Node 18 or newer
and a native C compiler; packaging tests also use npm for local packing/installation.
No SDK installation, network or dependency installation is needed:

```sh
sh tools/check-repository.sh
sh tools/test-repository.sh
```

The [technical repository canon](../.42p/standards/software.md) describes the
repository integrity gateway and separate registered test command. Real
clean-checkout acquisition remains a separate check;
the authored offline fixtures do not replace official-archive evidence.
