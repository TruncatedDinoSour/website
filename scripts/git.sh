#!/usr/bin/env sh

set -e

main() {
    ./scripts/sass.sh

    find . -name '_*.css' -or \
        -name '*.sass.css' -type f -exec rm -rfv {} \;

    git add -A
    git commit -sam "${m:-update @ $(date)}"
    git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
}

main "$@"
