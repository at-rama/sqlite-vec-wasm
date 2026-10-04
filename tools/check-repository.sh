#!/bin/sh
set -eu

cd "$(git rev-parse --show-toplevel)"

if [ "$(git ls-files -- ':(icase)spec.md')" != spec.md ]; then
    echo 'Expected exactly one tracked root specification: spec.md' >&2
    exit 1
fi
for path in spec.md AGENTS.md .42p/standards/software.md .gitignore; do
    if [ ! -f "$path" ]; then
        echo "Missing repository authority or integrity configuration: $path" >&2
        exit 1
    fi
done

ignored=$(git ls-files -ci --exclude-per-directory=.gitignore)
if [ -n "$ignored" ]; then
    echo 'Tracked files violate repository ignore rules:' >&2
    printf '%s\n' "$ignored" >&2
    exit 1
fi

# Compare the whole tracked working snapshot, not only the latest commit's diff.
empty_tree=$(git hash-object -t tree /dev/null)
git -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab diff --check "$empty_tree" --
echo 'Repository checks passed (product acceptance not evaluated).'
