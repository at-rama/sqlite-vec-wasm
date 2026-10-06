#!/bin/sh
set -eu

cd "$(git rev-parse --show-toplevel)"

if [ "$(git ls-files -- ':(icase)SPEC.md')" != SPEC.md ]; then
    echo 'Expected exactly one tracked root specification: SPEC.md' >&2
    exit 1
fi
for path in SPEC.md AGENTS.md .42p/standards/software.md .42p/standards/openspec.md .42p/openspec/config.yaml .gitignore; do
    if [ ! -f "$path" ]; then
        echo "Missing repository authority or integrity configuration: $path" >&2
        exit 1
    fi
done

# OpenSpec is a derived realization canon, never a second root contract.
if [ -e openspec ] || [ -L openspec ]; then
    echo 'OpenSpec project root must be .42p; root-level openspec is forbidden.' >&2
    exit 1
fi
if ! grep -Fq '[SPEC.md](SPEC.md) is the authoritative product contract.' AGENTS.md; then
    echo 'AGENTS.md must retain SPEC.md as the authoritative product contract.' >&2
    exit 1
fi
if ! grep -Fq 'SPEC.md remains the authoritative product contract.' .42p/openspec/config.yaml; then
    echo 'OpenSpec context must preserve SPEC.md product authority.' >&2
    exit 1
fi

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
