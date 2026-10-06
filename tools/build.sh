#!/usr/bin/env bash
set -euo pipefail

[[ $# == 0 ]] || { echo 'Usage: bash tools/build.sh' >&2; exit 2; }
root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
# Harness progress goes to stderr; only the orchestrator writes result JSON.
# Preserve the original stdout across SDK activation and its integrity checks.
exec bash "$root/tools/harness.sh" exec bash -c 'exec node "$1" >&3' \
    build "$root/tools/build/build.mjs" 3>&1 1>&2
