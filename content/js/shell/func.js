function clear() {
    document.getElementById('command_output').innerHTML = '';
    document.getElementById('cmd_hist').innerHTML = '';
    document.getElementById('content').innerHTML = '';

    return '';
}

function reboot() {
    window.location.reload();
    return 'Rebooting...';
}

function help(cmd) {
    let help_page = '';
    let help_cmd = cmd[0];

    if (help_cmd && !commands[help_cmd]) {
        return `Help page for '${help_cmd}' does not exist`
    }

    if (help_cmd) {
        let cmd_help = commands[help_cmd]['help']

        help_page += `<b>NAME</b>: ${help_cmd}<br/>`;
        help_page += `<b>SUID</b>: ${commands[help_cmd]['root_only']}<br/>`;
        help_page += `<b>DESCRIPTION</b>: ${cmd_help['desc']}<br/>`;
        help_page += `<b>EXAMPLES</b>:<br/>`;

        for (const example in cmd_help['examples']) {
            help_page += `<b>$</b> ${cmd_help['examples'][example]}<br/>`
        }
    } else {
        for (const h in commands) {
            let cmd_help = commands[h]['help']

            help_page += `<b>NAME</b>: ${h}<br/>`
            help_page += `<b>SUID</b>: ${commands[h]['root_only']}<br/>`;
            help_page += `<b>DESCRIPTION</b>: ${cmd_help['short_desc']}<br/>`
            help_page += `<b>EXAMPLE</b>: ${cmd_help['examples'][0]}<br/>`
            help_page += `<br/>`
        }
    }

    return help_page;
}

function show(dest) {
    let dst = dest[0];
    let iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'iframe');

    if (!dst) {
        return help(['show']);
    } else {
        for (const l in locations) {
            if (locations[l]['aliases'].includes(dst)) {
                iframe.setAttribute('src', locations[l]['url']);
                break;
            }
        }
    }

    if (iframe.src) {
        return iframe.outerHTML;
    } else {
        return `Page '${dst}' not found`;
    }
}

function goto(dest) {
    let dst = dest[0];

    if (!dst) {
        window.location = '/';
        return 'Returning to the home page'
    } else {
        for (const l in locations) {
            if (locations[l]['aliases'].includes(dst)) {
                window.location = locations[l]['url'];
                return `Going to ${locations[l]['url']}`
            }
        }
    }

    return `Page ${dst} does not exist`
}

function list() {
    let locs = '';

    for (const l in locations) {
        let loc = locations[l];
        locs += `<b>URL</b>: ${loc['url']}<br/>`
        locs += `<b>DESCRIPTION</b>: ${loc['desc']}<br/>`
        locs += `<b>ALISES</b>: ${loc['aliases'].join(", ")}<br/>`
        locs += `<br/>`
    }

    return locs;
}

function su(cmd) {
    let password_hash;
    if (!root) {
        password_hash = hash(prompt('Enter your password'));
    }

    if (!password_hash) {
        return 'Not authenticated. (empty password)'
    }

    if (password_hash != localStorage.getItem('password') && !root) {
        return 'Wrong password.';
    }

    if (cmd[0]) {
        if (cmd[0] == '.') {
            root = !root
            return `Switched to the <b>${root ? '<b>root</b>' : localStorage.getItem('username')}</b> user.`
        } else {
            return commands[cmd[0]]['func'](cmd.slice(1));
        }
    } else {
        return help(['su']);
    }
}


function passwd() {
    let current_password = hash(prompt("Current password"));
    let password1 = prompt("New password");
    let password2 = prompt("Confirm new password");

    if (current_password == localStorage.getItem('password')) {
        if (password1 === password2) {
            localStorage.setItem("password", bash(password1))
            alert(`password set to '${password1}'`);
        } else {
            return "Passwords don't match"
        }
    } else {
        return 'Wrong password'
    }
}
