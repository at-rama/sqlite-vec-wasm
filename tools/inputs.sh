#!/usr/bin/env bash
set -euo pipefail

root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)

# Internal transport and extraction operations called after Python validation.
case "${1:-}" in
    _fetch)
        [[ $# == 3 ]] || exit 2
        exec curl --fail --silent --show-error --location --proto '=https' \
            --proto-redir '=https' --connect-timeout 20 --max-time 180 \
            --retry 2 --retry-delay 1 --retry-max-time 400 \
            --header 'Accept: application/vnd.github+json' \
            --output "$3" "$2"
        ;;
    _extract)
        [[ $# == 4 ]] || exit 2
        case "$2" in
            zip) exec unzip -q "$3" -d "$4" ;;
            tar) exec tar --no-same-owner --no-same-permissions -xzf "$3" -C "$4" ;;
            *) exit 2 ;;
        esac
        ;;
esac

export PYTHONDONTWRITEBYTECODE=1
exec python3 "$root/tools/inputs.py" "$@"
