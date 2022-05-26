#!/usr/bin/env bash

set -e

main() {
    for file in $(find . -name node_modules -prune -o -name '*.scss' -type f); do
        [ -d "$file" ] && continue

        bnam="$(basename "$file")"
        out="$(dirname "$file")/${bnam%.*}.css"

        echo " >> Generating $out"
        node-sass "$file" --output-style compressed >"$out"
    done

    echo " >> Removing residuals"
    find . -name '_*.css' -or \
        -name '*.sass.css' -type f -exec rm -rfv {} \;

}

main "$@"
