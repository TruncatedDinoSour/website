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

    : >"$apis"

    # shellcheck disable=SC2094
    {
        printf '%s' '['
        find api -type f -exec basename {} \; | mkdata | sed 's/,$//'
        echo ']'
    } >"$apis"

    echo 'done'
}

main "$@"
