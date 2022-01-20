#!/usr/bin/env sh

rm -fv content/styles/config/_main.css

git add .
git commit -sam "update @ $(date)"
git push -u origin terminal
