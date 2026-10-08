#!/usr/bin/env bash
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
# Ambient Node is bootstrap tooling; production/browser stages use the pinned SDK.
exec node "$root/tools/acceptance/run.mjs" "$@"
