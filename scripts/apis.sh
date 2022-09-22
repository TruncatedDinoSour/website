#!/usr/bin/env bash

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

    printf ' * %s... ' 'Generating api hashes'

    mkdir -p -- api_hash
    rm -rf -- api_hash/*

    for api in api/*; do
        api_base="${api##*/}"
        sha256sum "$api" | awk '{ print $1 }' >"api_hash/${api_base//./_}.txt"
    done

    echo 'done'
}

main "$@"
