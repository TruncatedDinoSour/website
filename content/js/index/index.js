"use strict";

function resize_term() {
    document.getElementById("term-wrap").style.width = `${
        document.querySelector("article").offsetWidth
    }px`;
}

async function main() {
    window.addEventListener("resize", resize_term);
    resize_term();

    let blog = document.getElementById("blog-posts");
    let comment = document.getElementById("latest-comments");
    let more = document.getElementById("discover");

    let site = document.getElementById("site");
    site.innerText = SITE_NAME;

    site.onclick = () => {
        if (window.term === undefined) window.term = 0;

        if (window.getSelection) {
            if (window.getSelection().empty) window.getSelection().empty();
            else if (window.getSelection().removeAllRanges)
                window.getSelection().removeAllRanges();
        } else if (document.selection) document.selection.empty();

        site.innerText += ` ${++window.term} :O`;
        setTimeout(() => (site.innerText = SITE_NAME), 100);

        loadterm();
    };

    document.getElementById("blog-link").href = BLOG_SITE;
    document.getElementById("comments-link").href = COMMENT_SITE;

    if (!DO_FETCH) return;

    FETCH_BLOG_POSTS().then((j) => {
        blog.innerText = "";

        Object.entries(j)
            .reverse()
            .forEach((post) => {
                let id = post[0];
                post = post[1];

                mkelem(
                    "li",
                    [
                        mkelem(
                            "a",
                            [
                                post["title"],
                                " -- ",
                                new Date(post["time"] * 1000).toUTCString(),
                            ],
                            null,
                            { href: `${BLOG_SITE}/b/${id}` }
                        ),
                        mkelem("pre", `${post["content"]} ...`),
                    ],
                    blog
                );
            });
    });

    FETCH_COMMENTS().then((j) => {
        comment.innerText = "";

        Object.entries(j)
            .reverse()
            .forEach((post) => {
                let id = post[0];
                post = post[1];

                mkelem(
                    "li",
                    [
                        mkelem("a", `#${id} by ${post[0]}`, null, {
                            href: `${COMMENT_SITE}/#${id}`,
                        }),
                        mkelem("pre", linkify(post[1], COMMENT_SITE)),
                    ],
                    comment
                );
            });
    });

    FETCH_PAGES().then((j) => {
        more.innerText = "";

        for (let page of j.concat(EXTRA_PAGES))
            mkelem("li", mkelem("a", page, null, { href: page }), more);
    });
}

document.addEventListener("DOMContentLoaded", main);
