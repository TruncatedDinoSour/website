#!/usr/bin/env sh

set -e

main() {
    for api in api/*; do
        api_cont="$(sed 's/^\s*//g; s/: /:/g' "$api" | tr -d '\n')"
        printf '%s' "$api_cont" >"$api"
    done
}

main "$@"
