#!/usr/bin/env bash

set -e

main() {
    for file in $(find content/ -not -ipath "./node_modules/*" -name '*.scss' -type f); do
        bnam="${file##*/}"
        out="${file%/*}/${bnam%.*}.min.css"

        {
            node-sass "$file" --output-style compressed >"$out"
            autoprefixer-cli "$out" -o "$out.tmp"
            mv "$out.tmp" "$out"

            echo " >> Generated $out"
        } &
    done

    wait

    echo " >> Removing residuals"
    find content/ -not -ipath "./node_modules/*" -name '_*.min.css' -or \
        -name '*.sass.css' -type f -exec rm -rfv {} \;
}

main "$@"
