var commands = {
    "clear": {
        "func": clear,
        "root_only": false,
        "help": {
            "desc": "A command to clear the screen",
            "short_desc": "Clear the screen",
            "examples": [
                "clear"
            ]
        }
    },

    "reboot": {
        "func": reboot,
        "root_only": true,
        "help": {
            "desc": "A command to reboot",
            "short_desc": "Reboot",
            "examples": [
                "reboot"
            ]
        }
    },

    "help": {
        "func": help,
        "root_only": false,
        "help": {
            "desc": "A command to print help",
            "short_desc": "Print help",
            "examples": [
                "help",
                "help help"
            ]
        }
    },

    "show": {
        "func": show,
        "root_only": false,
        "help": {
            "desc": "A command to show pages",
            "short_desc": "Show page",
            "examples": [
                "show",
                "show src"
            ]
        }
    },

    "goto": {
        "func": goto,
        "root_only": false,
        "help": {
            "desc": "A command to go to pages",
            "short_desc": "Goto a page",
            "examples": [
                "goto",
                "goto src"
            ]
        }
    },

    "ls": {
        "func": list,
        "root_only": false,
        "help": {
            "desc": "A command to list available pages",
            "short_desc": "List pages",
            "examples": [
                "ls",
                "ls src"
            ]
        }
    },

    "su": {
        "func": su,
        "root_only": false,
        "help": {
            "desc": "A command to run commands as <b>root</b>, use 'su .' to switch between the users.",
            "short_desc": "Run as root",
            "examples": [
                "su .",
                "su reboot"
            ]
        }
    },

    "passwd": {
        "func": passwd,
        "root_only": true,
        "help": {
            "desc": "A command to change your password",
            "short_desc": "Change password",
            "examples": [
                "passwd"
            ]
        }
    },
}
