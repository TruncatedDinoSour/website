"use strict";

const boot = document.getElementById("boot");
const max_username_len = 100;
const site_name = "ari-web";
const kernel_version = "1.0.0";
const boot_message = {
    0: {
        type: "ok",
        text: `Booting '${site_name}'...`,
        sleep_time: 0,
    },
};
const do_sleep = true;
const locations = [
    {
        url: "/git",
        desc: "The source code of this website",
        aliases: ["src", "source", "git", "github"],
    },

    {
        url: "/",
        desc: "The home page",
        aliases: ["home", "root", "index"],
    },

    {
        url: "/page/reset",
        desc: "Reset your account",
        aliases: ["reset", "erase", "del", "delete"],
    },

    {
        url: "/page/minimal.txt",
        desc: "The minimal page",
        aliases: ["mini", "minimal", "txt", "min"],
    },

    {
        url: "/page/blog",
        desc: "Blog page",
        aliases: ["blog", "news", "blogs", "articles"],
    },

    {
        url: "/dotfiles",
        desc: "My dotfiles-cleaned github repository",
        aliases: ["rice", "dotfiles", "dots", "dwm"],
    },

    {
        url: "/page/novpn",
        desc: "A page about how you shouldn't use VPNs",
        aliases: ["vpn", "novpn"],
    },

    {
        url: "/mp",
        desc: "My music playlist",
        aliases: ["music", "playlist"],
    },

    {
        url: "/tdotfiles",
        desc: "My dotfiles-termux github repository",
        aliases: ["trice", "tdotfiles", "tdots", "termux"],
    },

    {
        url: "/page/ttytheme",
        desc: "TTY theme generator",
        aliases: ["tty", "ttytheme", "ttheme", "tty-theme"],
    },

    {
        url: "/user",
        desc: "Ari-web comments",
        aliases: ["comment", "user", "usr", "chat"],
    },

    {
        url: "/api",
        desc: "Ari-web api(s)",
        aliases: ["api", "API"],
    },

    {
        url: "/page/amiunique",
        desc: "'Am I unique?' test",
        aliases: ["uniqueness", "unqtest", "unique", "unqquiz"],
    },

    {
        url: "/page/90s",
        desc: "90s page",
        aliases: ["90s", "90", "vintage", "old"],
    },

    {
        url: "/page/export",
        desc: "Export and/or import your ari-web data",
        aliases: ["export", "import", "data"],
    },

    {
        url: "/m",
        desc: "Favourite song",
        aliases: ["song", "favsong"],
    },

    {
        url: "/page/info",
        desc: "Important ari-web info",
        aliases: ["info", "important"],
    },

    {
        url: "/etc",
        desc: "Random ari-web pages, projects, etc.",
        aliases: ["etc", "projects", "urandom"],
    },
];
const escape_HTML = (str) =>
    str.replace(
        /[&<>'"]/g,
        (tag) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
            }[tag] || tag)
    );

const BIRTHDAY = new Date(2020, 9, 17, 0, 0, 0, 0); // Ari-web start: 2020/10/17

/*
let dt = new Date();
const BIRTHDAY = new Date(dt.getFullYear() - 2, dt.getMonth(), dt.getDate(), 0, 0, 0, 0);
*/

const NUMERICS = ["st", "nd", "rd", "th"];
