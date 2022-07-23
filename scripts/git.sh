#!/usr/bin/env bash

set -e

main() {
    git diff >/tmp/ari-web.diff

    git add -A
    git commit -sa
    git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
}

main "$@"
