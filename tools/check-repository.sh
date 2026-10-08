#!/bin/sh
set -eu

cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git ls-files -- ':(icase)SPEC.md')" ]; then
    echo 'Root SPEC.md is retired; retain immutable historical provenance instead.' >&2
    exit 1
fi
for path in README.md AGENTS.md .42p/standards/software.md .42p/standards/openspec.md .42p/openspec/config.yaml .gitignore; do
    if [ ! -f "$path" ] || [ -L "$path" ] || ! git ls-files --error-unmatch -- "$path" >/dev/null 2>&1; then
        echo "Missing repository authority or integrity configuration: $path" >&2
        exit 1
    fi
done

# OpenSpec is a derived realization canon, never a second root contract.
if [ -e openspec ] || [ -L openspec ]; then
    echo 'OpenSpec project root must be .42p; root-level openspec is forbidden.' >&2
    exit 1
fi
if ! grep -Fq 'Instituted decisions and sources ground the design.' AGENTS.md; then
    echo 'AGENTS.md must preserve instituted decision/source authority.' >&2
    exit 1
fi
if ! grep -Fq 'Instituted decisions and sources ground the design.' .42p/openspec/config.yaml; then
    echo 'OpenSpec context must preserve instituted decision/source authority.' >&2
    exit 1
fi

# Check the repository's concrete Capture/Allocation input convention, not
# semantic coverage or implementation. New Captures need no fixed count here.
PYTHONDONTWRITEBYTECODE=1 python3 - <<'PY'
import hashlib
from pathlib import Path
import re
import subprocess

if any(p.name.casefold() == 'spec.md' for p in Path('.').iterdir()):
    raise SystemExit('Root SPEC.md is retired, including untracked/case variants.')

entries = {}
for entry in subprocess.check_output(['git', 'ls-files', '--stage', '-z']).split(b'\0'):
    if entry:
        info, path = entry.split(b'\t', 1)
        mode, oid, stage = info.decode().split()
        if stage != '0':
            raise SystemExit('Unresolved Git index entries are not a candidate snapshot.')
        entries[path.decode()] = mode

captures = {p for p in entries if re.fullmatch(
    r'\.42p/engineering/[^/]+_capture_edit-[^/]+\.md', p)}
allocations = [p for p in entries if re.fullmatch(
    r'\.42p/engineering/[^/]+_allocation_edit-[^/]+\.md', p)]
if not captures or len(allocations) != 1:
    raise SystemExit('Expected tracked Captures and one global Allocation.')
for name in captures | set(allocations):
    path = Path(name)
    if entries[name] not in {'100644', '100755'} or path.is_symlink() or not path.is_file():
        raise SystemExit(f'Design input must be a tracked regular file: {name}')
    if not path.read_text(encoding='utf-8').strip():
        raise SystemExit(f'Empty design input: {name}')

allocation = Path(allocations[0])
inputs = allocation.read_text(encoding='utf-8').split('## Allocation units', 1)[0]
references = re.findall(
    r'^- \[[^\n]+\]\(([^/()]+_capture_edit-[^/()]+\.md)\), '
    r'snapshot SHA-256 `([0-9a-f]{64})`\.$', inputs, re.M)
resolved = [(str(allocation.parent / name), digest) for name, digest in references]
if len(resolved) != len(captures) or {p for p, _ in resolved} != captures:
    raise SystemExit('Global Allocation inputs must name every tracked Capture exactly once.')
for name, digest in resolved:
    if hashlib.sha256(Path(name).read_bytes()).hexdigest() != digest:
        raise SystemExit(f'Stale Allocation Capture snapshot: {name}')
print('Capture/Allocation input identities passed (semantic coverage not evaluated).')
PY

ignored=$(git ls-files -ci --exclude-per-directory=.gitignore)
if [ -n "$ignored" ]; then
    echo 'Tracked files violate repository ignore rules:' >&2
    printf '%s\n' "$ignored" >&2
    exit 1
fi

# Compare the whole tracked working snapshot, not only the latest commit's diff.
empty_tree=$(git hash-object -t tree /dev/null)
git -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab diff --check "$empty_tree" --
# Source-lock integrity is offline; automated suites run in test-repository.sh.
PYTHONDONTWRITEBYTECODE=1 python3 tools/inputs.py validate inputs/sources.lock.json
echo 'Repository checks passed (product acceptance not evaluated).'
