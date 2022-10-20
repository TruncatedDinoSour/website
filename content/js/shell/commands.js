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

    list: {
        func: list,
        root_only: false,
        help: {
            desc: "A command to list available pages",
            short_desc: "List pages",
            examples: ["list"],
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

    wed: {
        func: wed,
        root_only: false,
        help: {
            desc: "Standard web editor",
            short_desc: "Standard web editor",
            examples: ["wed file"],
        },
    },

    rm: {
        func: rm,
        root_only: false,
        help: {
            desc: "Remove file(s)",
            short_desc: "Remove a file",
            examples: ["rm file", "rm file1 file"],
        },
    },

    ls: {
        func: ls,
        root_only: false,
        help: {
            desc: "List files",
            short_desc: "List files",
            examples: ["ls", "ls file"],
        },
    },

    mv: {
        func: mv,
        root_only: false,
        help: {
            desc: "Move files",
            short_desc: "Move files",
            examples: ["mv file file1"],
        },
    },

    cat: {
        func: cat,
        root_only: false,
        help: {
            desc: "Concat files",
            short_desc: "Concat files",
            examples: ["cat file", "cat file file1"],
        },
    },

    upload: {
        func: upload,
        root_only: false,
        help: {
            desc: "Upload file(s)",
            short_desc: "File upload",
            examples: ["upload"],
        },
    },

    download: {
        func: download,
        root_only: false,
        help: {
            desc: "Download file(s)",
            short_desc: "File download",
            examples: ["download file", "download file1 file"],
        },
    },
};
