"use strict";

var commands = {
    clear: {
        func: clear,
        root_only: false,
        help: {
            desc: "A command to clear the screen",
            short_desc: "Clear the screen",
            examples: ["clear"],
        },
    },

    reboot: {
        func: reboot,
        root_only: true,
        help: {
            desc: "A command to reboot",
            short_desc: "Reboot",
            examples: ["reboot"],
        },
    },

    help: {
        func: help,
        root_only: false,
        help: {
            desc: "A command to print help",
            short_desc: "Print help",
            examples: ["help", "help help"],
        },
    },

    show: {
        func: show,
        root_only: false,
        help: {
            desc: "A command to show pages",
            short_desc: "Show page",
            examples: ["show src", "show"],
        },
    },

    cd: {
        func: cd,
        root_only: false,
        help: {
            desc: "A command to go to pages",
            short_desc: "Go to a page via an alias",
            examples: ["cd src", "cd"],
        },
    },

    ls: {
        func: list,
        root_only: false,
        help: {
            desc: "A command to list available pages",
            short_desc: "List pages",
            examples: ["ls"],
        },
    },

    su: {
        func: su,
        root_only: false,
        help: {
            desc: "A command to run commands as <b>root</b>, use 'su .' to switch between the users.",
            short_desc: "Run as root",
            examples: ["su .", "su reboot"],
        },
    },

    passwd: {
        func: passwd,
        root_only: true,
        help: {
            desc: "A command to change your password",
            short_desc: "Change password",
            examples: ["passwd"],
        },
    },

    whoami: {
        func: whoami,
        root_only: false,
        help: {
            desc: "A command to show your current user",
            short_desc: "Show user",
            examples: ["whoami"],
        },
    },

    echo: {
        func: echo,
        root_only: false,
        help: {
            desc: "Output a string",
            short_desc: "Output a string",
            examples: ["echo hello world"],
        },
    },
    webfetch: {
        func: webfetch,
        root_only: false,
        help: {
            desc: "Neofetch, but for the web",
            short_desc: "Neofetch for the web",
            examples: ["webfetch"],
        },
    },
};
