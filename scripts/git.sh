#!/usr/bin/env bash

set -e

S='./scripts'
SCRIPTS=(sass apis)

main() {
    for script in "${SCRIPTS[@]}"; do
        _s="$S/$script.sh"

        echo
        echo " ** Script: $_s **"
        echo

        chmod +x -- "$_s"
        "$_s"
    done

    git add -A
    git commit -sa
    git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
}

main "$@"
