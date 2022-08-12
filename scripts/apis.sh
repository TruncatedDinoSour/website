#!/usr/bin/env sh

set -e

mkdata() {
    while read -r line; do
        printf '"%s",' "$line"
    done
}

main() {
    printf ' * %s... ' 'Generating api list'
    apid='api'
    apis="$apid/apis.json"
    eapis="$apid/external_apis.json"

    # shellcheck disable=SC2094
    {
        printf '%s' '{"desc":"Ari-web API list","data":['
        find api -type f -exec basename {} \; | mkdata
        echo "\"$(basename "$apis")\"],\"external\":$(cat -- "$eapis" | tr -d ' \n')}"
    } >"$apis"

    echo 'done'
}

main "$@"
