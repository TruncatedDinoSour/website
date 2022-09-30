#!/usr/bin/env sh

set -e

main() {
    if [ "$CI" ]; then
        echo 'Minifying all HTML'

        find . -not -ipath "./node_modules/*" -type f -name "*.html" \
            -exec html-minifier --collapse-whitespace --collapse-inline-tag-whitespace --remove-tag-whitespace -o {}.min {} \; \
            -exec rm {} \; \
            -exec mv {}.min {} \; \
            -exec sh -c "printf '\n\n%s\n' '<!-- source code @ /git -->' >>\"\$1\"" -- {} \;
    else
        echo 'Not minifying HTML in non-CI mode'
    fi
}

main "$@"
