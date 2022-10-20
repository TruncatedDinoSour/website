"use strict";

function clear() {
    document.getElementById("command_output").innerHTML = "";
    document.getElementById("cmd_hist").innerHTML = "";
    document.getElementById("content").innerHTML = "";

    return "";
}

function reboot() {
    window.location.reload();
    return "Rebooting...";
}

function help(cmd) {
    let help_page = "";
    let help_cmd = cmd[0];

    if (help_cmd && !commands[help_cmd]) {
        return `Help page for '${help_cmd}' does not exist`;
    }

    if (help_cmd) {
        let cmd_help = commands[help_cmd]["help"];

        help_page += `<b>NAME</b>: ${help_cmd}<br/>`;
        help_page += `<b>SUID</b>: ${commands[help_cmd]["root_only"]}<br/>`;
        help_page += `<b>DESCRIPTION</b>: ${cmd_help["desc"]}<br/>`;
        help_page += `<b>EXAMPLES</b>:<br/>`;

        for (const example in cmd_help["examples"]) {
            help_page += `<b>$</b> ${cmd_help["examples"][example]}<br/>`;
        }
    } else
        for (const h in commands) {
            let cmd_help = commands[h]["help"];

            help_page += `<b>NAME</b>: ${h}<br/>`;
            help_page += `<b>SUID</b>: ${commands[h]["root_only"]}<br/>`;
            help_page += `<b>DESCRIPTION</b>: ${cmd_help["short_desc"]}<br/>`;
            help_page += `<b>EXAMPLE</b>: ${cmd_help["examples"][0]}<br/>`;
            help_page += `<br/>`;
        }

    return help_page;
}

function show(dest) {
    let dst = dest[0];
    let iframe = document.createElement("iframe");
    iframe.setAttribute("class", "iframe");

    if (!dst) return help(["show"]);
    else
        for (const l in locations) {
            if (locations[l]["aliases"].includes(dst)) {
                iframe.setAttribute("src", locations[l]["url"]);
                break;
            }
        }

    if (iframe.src) return iframe.outerHTML;
    else return `Page '${dst}' not found`;
}

function cd(dest) {
    let dst = dest[0];

    if (!dst) {
        window.location = "/";
        return "Returning to the home page";
    } else {
        for (const l in locations) {
            if (locations[l]["aliases"].includes(dst)) {
                window.location = locations[l]["url"];
                return `Going to ${locations[l]["url"]}`;
            }
        }
    }

    return `Page ${dst} does not exist`;
}

function list() {
    let locs = "";

    for (const l in locations) {
        let loc = locations[l];
        locs += `<b>URL</b>: ${loc["url"]}<br/>`;
        locs += `<b>DESCRIPTION</b>: ${loc["desc"]}<br/>`;
        locs += `<b>ALIASES</b>: ${loc["aliases"].join(", ")}<br/>`;
        locs += `<br/>`;
    }

    return locs;
}

function su(cmd) {
    let password_hash;
    if (!root) {
        password_hash = hash(prompt("Enter your password"));
    }

    if (!password_hash && !root) {
        return "Not authenticated. (empty password)";
    }

    if (password_hash != localStorage.getItem("password") && !root) {
        return "Wrong password.";
    }

    if (cmd[0]) {
        if (cmd[0] === ".") {
            root = !root;
            return `Switched to the <b>${
                root ? "root" : escape_HTML(localStorage.getItem("username"))
            }</b> user.`;
        } else {
            root = true;
            let ret = "Command not found";
            let err = false;

            try {
                ret = commands[cmd[0]]["func"](cmd.slice(1));
            } catch (e) {
                if (e.constructor !== TypeError) err = e;
            }

            root = false;

            if (err) {
                alert(`ERROR (report it to 'cd src'): ${err}`);
                throw err;
            }

            return ret;
        }
    } else {
        return help(["su"]);
    }
}

function passwd() {
    let current_password = hash(prompt("Current password"));
    let password1 = prompt("New password");
    let password2 = prompt("Confirm new password");

    if (current_password === parseInt(localStorage.getItem("password"))) {
        if (password1 === password2) {
            localStorage.setItem("password", hash(password1));
            alert(`password set`);
        } else {
            return "Passwords don't match";
        }
    } else {
        return "Wrong password";
    }
}

function whoami() {
    return root ? "root" : escape_HTML(window.localStorage.getItem("username"));
}

function echo(argv) {
    return escape_HTML(argv.join(" "));
}

function webfetch() {
    let head_str = `${window.localStorage.username}@${site_name}`;

    return escape_HTML(`\`8.\`888b                 ,8'      ${head_str}
 \`8.\`888b               ,8'       ${"-".repeat(head_str.length)}
  \`8.\`888b             ,8'        OS: WebOS
   \`8.\`888b     .b    ,8'         Kernel: Wkernel ${kernel_version}
    \`8.\`888b    88b  ,8'          Shell: Wsh
     \`8.\`888b .\`888b,8'           Terminal: HTML
      \`8.\`888b8.\`8888'            CPU: ${site_name[0].toUpperCase()}${site_name.slice(
        1
    )} web cpu (1) @ 1GHz
       \`8.\`888\`8.\`88'             Memory: 2B / 8B
        \`8.\`8' \`8,\`'              Init: WebRC
         \`8.\`   \`8'`);
}

function wed(argv) {
    if (!argv.length) return "Wed: Error: No file specified";

    let shell_prompt = document.getElementById("prompt");

    disable(shell_prompt);

    for (let elem of document.getElementsByClassName("editor")) elem.remove();

    let editor = document.createElement("div");
    let editor_box = document.createElement("textarea");
    let editor_name = document.createElement("h1");

    let editor_buttons = document.createElement("div");
    let editor_save = document.createElement("button");
    let editor_quit = document.createElement("button");

    editor_box.value = get_file(argv[0]);
    editor_box.spellcheck = false;
    editor_box.placeholder = "Enter content here...";

    editor_save.innerText = "Save";
    editor_quit.innerText = "Quit";

    editor_name.innerText = argv[0];

    editor_buttons.appendChild(editor_save);
    editor_buttons.appendChild(editor_quit);

    editor_quit.onclick = () => {
        editor.remove();
        shell_prompt.focus();

        enable(shell_prompt);
        shell_prompt.focus();
    };

    editor_save.onclick = () => {
        save_file(argv[0], editor_box.value);
        editor_quit.onclick();
    };

    editor.appendChild(editor_name);
    editor.appendChild(editor_box);
    editor.appendChild(editor_buttons);

    editor.classList.add("editor");
    editor_buttons.classList.add("editor-buttons");

    document.body.appendChild(editor);

    editor_box.focus();

    return `Editing: ${escape_HTML(argv[0])}`;
}

function rm(argv) {
    if (!argv.length) return "Rm: no files specified";

    for (let file of argv) {
        if (!file_exists(file))
            return `Rm: ${escape_HTML(file)}: Nothing appropriate`;
        remove_file(file);
    }

    return "Removed file(s)";
}

function ls(argv) {
    if (argv.length) {
        let out = "";

        for (let file of argv)
            if (file_exists(file)) out += `${escape_HTML(file)}\n`;

        return out ? out : null;
    }

    let out = "";

    for (let file of list_files()) out += `${escape_HTML(file)}\n`;
    return out ? out : null;
}

function mv(argv) {
    if (!argv.length || !file_exists(argv[0]))
        return "No valid input file specified";
    if (!argv[1]) return "No output file specified";
    if (argv[0] === argv[1]) return "Input must not be the same as output";

    let old_file = get_file(argv[0]);

    remove_file(argv[0]);
    save_file(argv[1], old_file);

    return `${escape_HTML(argv[0])} -> ${escape_HTML(argv[1])}`;
}

function cat(argv) {
    if (!argv.length) return "No input file specified";

    let out = "";

    for (let file of argv) {
        if (file_exists(file)) out += `${escape_HTML(get_file(file))}\n`;
        else out += `Cat: ${escape_HTML(file)}: No such file\n`;
    }

    return out;
}

function upload() {
    let input_id = `upload_${document.getElementsByTagName("input").length}`;

    let upload_container = document.createElement("div");
    upload_container.classList.add("upload");

    let upload_input = document.createElement("input");
    upload_input.setAttribute("type", "file");
    upload_input.setAttribute("multiple", "true");
    upload_input.setAttribute("id", input_id);

    let commit_upload = document.createElement("button");
    commit_upload.innerText = "Commit";
    commit_upload.setAttribute("id", `commit_upload_${input_id}`);
    commit_upload.setAttribute(
        "onclick",
        `
function uploader_${input_id}() {
    if (typeof FileReader !== 'function') {
        alert("The FileReader API isn't supported on this browser");
        return;
    }

    let upload = document.getElementById("${input_id}");
    let upload_button = document.getElementById("${commit_upload.id}");

    let files = upload.files;

    if (!files.length) {
        alert("Pick at least 1 file to upload");
        return;
    }

    for (let file of files) {
        let filename = to_filename(file.name);

        if (file_exists(filename)) {
            alert(\`File \${filename} alredy exists, please rm it\`)
            return;
        }
    }

    for (let file of files) {
        let filename = to_filename(file.name);

        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (evt) => {
            save_file(filename, evt.target.result);
        };

        reader.onerror = (err) => {
            alert(\`error reading the file: \${err}\`);
            return;
        };
    }

    upload_button.innerText = "Uploaded";

    disable(upload);
    disable(upload_button)
}

uploader_${input_id}();
document.getElementById("prompt").focus();
    `
    );

    upload_container.appendChild(upload_input);
    upload_container.appendChild(commit_upload);

    return upload_container.outerHTML;
}

function download(argv) {
    if (!argv.length) return "No specified files to download";

    argv = [...new Set(argv)];

    for (let file of argv) {
        if (!file_exists(file))
            return `File ${escape_HTML(file)} does not exist`;
    }

    for (let file of argv) invoke_download(file, get_file(file));

    return "File(s) downloaded";
}
