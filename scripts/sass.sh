#!/usr/bin/env bash

set -e

main() {
    for file in $(find . -name '*.scss' -type f); do
        bnam="$(basename "$file")"
        out="$(dirname "$file")/${bnam%.*}.css"

        echo " >> Generating $out"
        node-sass "$file" --output-style compressed >"$out"
    done

    echo " >> Removing residuals"
    find . -name '_*.css' -type f -exec rm -f {} \;
}

main "$@"
