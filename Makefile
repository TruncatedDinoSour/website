build:
	npm run build

clean:
	[ -z "${CI}" ] || rm -rfv requirements.txt \
		README.md \
		LICENSE \
		git.sh \
		scripts \
		.vscode \
		.github \

netlify: build clean

.PHONY: build clean netlify
