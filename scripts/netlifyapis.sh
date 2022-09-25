#!/usr/bin/env sh

set -e

main() {
    if [ "$CI" ]; then
        echo 'Minifying APIs'

        for api in api/*; do
            api_cont="$(sed 's/^\s*//g; s/: /:/g' "$api" | tr -d '\n')"
            printf '%s' "$api_cont" >"$api"
        done
    else
        echo 'Not minifying APIs as not in CI mode'
    fi
}

main "$@"
