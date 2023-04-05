"use strict";

function cmd_help() {
    let ul = document.createElement("ul");

    Object.keys(window)
        .filter((name) => name.startsWith("cmd_"))
        .map((name) => name.slice(4))
        .forEach((cmd) => mkelem("li", cmd, ul));

    return [
        "congratulations, you are now in the ari-web terminal\nheres some commands : ",
        ul,
    ];
}

function cmd_exit(_, hist, term_wrap) {
    term_wrap.style.display = "none";
    hist.innerHTML = "";
    return [];
}

function cmd_reboot() {
    window.location.reload();
    return ["rebooting ..."];
}

function cmd_clear(_, hist) {
    hist.innerHTML = "";
    return [];
}
