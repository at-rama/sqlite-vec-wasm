# Tasks

## 1. Published release selection

- [x] 1.1 Extend exact sqlite-vec version parsing and separate published-release selection from latest-stable filtering; verify alpha/beta/RC, omitted-input defaults, drafts/unpublished/development records, contradictory metadata, ambiguity and no-fallback tests.
- [x] 1.2 Update source-acquisition documentation and CLI help for explicit prereleases, preserved suffixes, stable defaults and the remaining build limitation; verify wording against the Change and command behavior.

## 2. Integrity and handoff regression

- [x] 2.1 Add prerelease lock/acquisition regressions for exact suffix/digest preservation, staged-lock enforcement, metadata/digest drift, pre-extraction hash failure and complete frozen fresh-workspace handoff; run the acquisition suite and retain unchanged stable-lock compatibility.

## 3. Integration evidence

- [x] 3.1 Run the repository gateway, all registered tests and strict OpenSpec validation; reconstruct resolution/acquisition with official stable SQLite and published prerelease sqlite-vec in an isolated clean checkout with empty tool/npm/source state, verify official digests and retained exact identities, and keep raw evidence ignored.
