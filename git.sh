#!/usr/bin/env sh

set -e

main() {
    rm -fv content/styles/config/_main.css

    git add .
    git commit -sam "update @ $(date)"
    git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
}

main "$@"
