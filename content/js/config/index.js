"use strict";

const BLOG_SITE = "https://blog.ari-web.xyz/";
const COMMENT_SITE = "https://user.ari-web.xyz/";

const FETCH_BLOG_POSTS = () =>
    fetch("https://blog.ari-web.xyz/recents.json").then((r) => r.json());

const FETCH_COMMENTS = () => {
    return fetch("https://server.ari-web.xyz/total")
        .then((r) => r.text())
        .then((t) => {
            let total = parseInt(t);

            let fetch_from = total - 12;
            if (fetch_from < 0) fetch_from = total;

            return fetch(
                `https://server.ari-web.xyz/${fetch_from}/${total}`
            ).then((r) => r.json());
        });
};

const FETCH_PAGES = () => fetch("/api/pages.json").then((r) => r.json());

// let dt = new Date();
// const BIRTHDAY = new Date(dt.getFullYear() - 2, dt.getMonth(), dt.getDate(), 0, 0, 0, 0);
const BIRTHDAY = new Date(2020, 9, 17, 0, 0, 0, 0); // ari-web start : 2020/10/17
const NUMERICS = ["st", "nd", "rd", "th"];
const SITE_NAME = "ari-web";
