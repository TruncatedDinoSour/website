#!/usr/bin/env sh

set -e

main() {
    minify-all-cli -s . -d min --skipFileExtensions=.png --logLevel=warn
    cp -r min/* .
    rm -r min
}

main "$@"
