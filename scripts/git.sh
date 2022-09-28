#!/usr/bin/env sh

set -e

main() {
    printf '%s' 'Make sure you added an entry to api/usage.json'
    read -r

    git diff >/tmp/ari-web.diff

    git add -A
    git commit -sa
    git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
}

main "$@"
