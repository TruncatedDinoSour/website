#!/bin/sh

rm -fv content/styles/config/_main.css
git add .
git commit -S -m "update @ $(date)"
git push -u origin terminal
