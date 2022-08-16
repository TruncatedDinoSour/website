#!/usr/bin/env sh

set -e

mkdata() {
    while read -r line; do
        printf '"%s",' "$line"
    done
}

main() {
    printf ' * %s... ' 'Generating api list'
    apis='api/apis.json'

    # shellcheck disable=SC2094
    {
        printf '%s' '['
        find api -type f -exec basename {} \; | mkdata
        echo ']'
    } >"$apis"

    echo 'done'
}

main "$@"
