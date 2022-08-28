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
	npm run netlify-min

.PHONY: build clean netlify
