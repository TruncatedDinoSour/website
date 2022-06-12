#!/usr/bin/env sh

set -e

main() {
    echo '>> Removing all .min.css files'
    find content/ -name '*.min.css' -type f -exec rm -rfv {} \;
}

main "$@"
