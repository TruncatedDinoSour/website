#!/usr/bin/env bash

set -e

mkdata() {
    while read -r line; do
        printf '"%s",' "$line"
    done
}

main() {
    printf ' * %s... ' 'Generating pages api'

    {
        printf '%s' '['
        for page in page/*; do
            echo "/$page"
        done | mkdata | sed 's/,$//'
        echo ']'
    } >api/pages.json

    printf ' * %s... ' 'Generating api list'

    # shellcheck disable=SC2094
    {
        printf '%s' '['
        find api -type f -exec basename {} \; | mkdata | sed 's/,$//'
        echo ']'
    } >api/apis.json

    echo 'done'

    printf ' * %s... ' 'Generating api hashes'

    mkdir -p -- api_hash
    rm -rf -- api_hash/*

    for api in api/*; do
        api_base="${api##*/}"
        sha256sum "$api" | awk '{ print $1 }' | tr -d '\n' >"api_hash/${api_base//./_}_hash.txt"
    done

    echo 'done'
}

main "$@"
