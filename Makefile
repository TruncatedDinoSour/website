build:
	npm run build

netlify: build clean

clean:
	[ -z "${CI}" ] || rm -rfv requirements.txt \
		README.md \
		LICENSE \
		git.sh \
		scripts \
		.vscode \
		.github \
