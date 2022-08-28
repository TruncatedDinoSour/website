#!/usr/bin/env sh

set -e

main() {
    minify-all -s . -d min --skipFileExtensions=.png --logLevel=fatal -p 10
    cp -r min/* .
    rm -r min
}

main "$@"
