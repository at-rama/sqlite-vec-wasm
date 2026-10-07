#!/usr/bin/env bash
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
# Production packaging uses the repository's integrity-checked SDK, not ambient npm.
# Keep harness identity/progress output on stderr and reserve stdout for success JSON.
exec bash "$root/tools/harness.sh" exec bash -c 'exec node "$1" "${@:2}" >&3' \
    package "$root/tools/package/package.mjs" "$@" 3>&1 1>&2
