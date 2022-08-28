build:
	npm run build

netlifymin:
	npm run netlify-min

clean:
	[ -z "${CI}" ] || rm -rfv requirements.txt \
		README.md \
		git.sh \
		scripts \
		.vscode \
		.github \

netlify: build netlifymin clean

.PHONY: build clean netlify
