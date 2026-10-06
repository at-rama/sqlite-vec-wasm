#!/bin/sh
set -eu
cd "$(git rev-parse --show-toplevel)"

test -f tools/gates/tests/test_change_gates.py
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tools/gates/tests

# Register the A-inputs suite when its implementation enters this checkout.
if [ -f tools/inputs.py ]; then
    test -f tools/tests/test_inputs.py
    PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tools/tests
else
    echo 'Acquisition tests: not applicable (A-inputs implementation absent).'
fi

# Offline orchestration tests use Node's built-in runner and the system C compiler.
if [ -f tools/build/build.mjs ]; then
    test -f tools/build/tests/build.test.mjs
    node --test tools/build/tests/*.test.mjs
fi
