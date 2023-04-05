"use strict";

function cmd_help() {
    let ul = document.createElement("ul");

    Object.keys(window)
        .filter((name) => name.startsWith("cmd_"))
        .map((name) => name.slice(4))
        .forEach((cmd) => mkelem("li", cmd, ul));

    return [
        "congratulations, you are now in the ari-web terminal\nheres some commands :\n\n",
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

function cmd_echo(args) {
    return [args];
}

function cmd_webfetch() {
    let head = `user@${SITE_NAME}`;

    return [
        `\`8.\`888b                 ,8'      ${head}
 \`8.\`888b               ,8'       ${"-".repeat(head.length)}
  \`8.\`888b             ,8'        OS: WebOS
   \`8.\`888b     .b    ,8'         Kernel: Wkernel 1.0
    \`8.\`888b    88b  ,8'          Shell: Wsh
     \`8.\`888b .\`888b,8'           Terminal: HTML
      \`8.\`888b8.\`8888'            CPU: ${SITE_NAME[0].toUpperCase()}${SITE_NAME.slice(
            1
        )} web cpu (1) @ 1GHz
       \`8.\`888\`8.\`88'             Memory: 2 B / 8B
        \`8.\`8' \`8,\`'              Init: WebRC
         \`8.\`   \`8'               Packages: ${
             document.scripts.length + document.styleSheets.length + 1
         } (document)`,
    ];
}

function cmd_rand() {
    return ["" + Math.random() * 11e10];
}

function cmd_date() {
    return new Date().toString();
}
