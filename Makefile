build:
	npm run build

clean:
	[ -z "${CI}" ] || rm -rfv requirements.txt \
		README.md \
		git.sh \
		scripts \
		.vscode \
		.github \

netlify: build clean
	sh ./scripts/netlifyapis.sh

.PHONY: build clean netlify
