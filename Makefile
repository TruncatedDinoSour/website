build:
	npm run build

netlifyapis:
	sh ./scripts/netlifyapis.sh

clean:
	[ -z "${CI}" ] || rm -rfv requirements.txt \
		README.md \
		git.sh \
		scripts \
		.vscode \
		.github \

netlify: build netlifyapis clean

.PHONY: build clean netlify
