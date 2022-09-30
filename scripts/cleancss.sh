#!/usr/bin/env sh

set -e

main() {
    echo '>> Removing all .min.css files'
    find content/ -not -ipath "./node_modules/*" -name '*.min.css' -type f -exec rm -rfv {} \;
}

main "$@"
