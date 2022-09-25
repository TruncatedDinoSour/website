#!/usr/bin/env sh

set -e

main() {
    if [ "$CI" ]; then
        echo 'Minifying all HTML'

        find . -type f -name "*.html" \
            -exec html-minifier --collapse-whitespace -o {}.min {} \; \
            -exec rm {} \; \
            -exec mv {}.min {} \; \
            -exec sh -c "echo '<!-- source code @ /git -->' >>\"\$1\"" -- {} \;
    else
        echo 'Not minifying HTML in non-CI mode'
    fi
}

main "$@"
