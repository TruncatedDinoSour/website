#!/usr/bin/env sh

set -e

main() {
    if [ "$CI" ]; then
        echo 'Minifying all JavaScript'

        find content/js/ -not -ipath "./node_modules/*" -type f \
            -name "*.js" ! -name "*.min.*" ! -name "vfs_fonts*" \
            -exec uglifyjs --compress sequences=true,conditionals=true,booleans=true -o {}.min {} \; \
            -exec rm {} \; \
            -exec mv {}.min {} \;
    else
        echo 'Not in CI mode, skipping JS minification'
    fi
}

main "$@"
