function reload(cmd) {
    document.location.reload();
    return "ReLoad: reloading the page"
}

function goto(cmd) {
    cmd = cmd.split(' ');

    try {
        var loc = pages[cmd[1].toLocaleLowerCase()];
    } catch (e) {
        return "GOTO: cannot pass an empty location";
    }

    if (loc) {
        document.location.assign(loc);
        return `redirecting to ${loc}`;
    } else {
        return `GOTO: ${cmd[1]} does not exist`;
    }
}

function exit() {
    let textbox = document.getElementById("mobileCmd");
    textbox.value = '';
    mobileMenu.classList.add("hiddenMobile");
}

function help(cmd) {
    return `help - display help
    goto [PAGE] - go to a specified page
    reload - reload the page
    exit - exit`
}


const pages = {
    "random_things": "/page/random",
    "javascript_apps": "/page/js",
    "source_code": "/page/redirect?url=//github.com/TruncatedDinosour/website",
    "home": "/"
}

const commands = {
    "help": help,
    "goto": goto,
    "reload": reload,
    "exit": exit
}
