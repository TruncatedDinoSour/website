#!/usr/bin/env sh

set -e

mkdata() {
    while read -r line; do
        printf '"%s",' "$line"
    done
}

main() {
    printf ' * %s... ' 'Generating api list'

    {
        printf '%s' '{"desc":"Ari-web API list","data":['
        find api -type f -exec basename {} \; | mkdata
        echo '"."]}'
    } >api/apis.json

    echo 'done'
}

main "$@"
