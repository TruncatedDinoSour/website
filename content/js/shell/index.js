"use strict";

let cmd_prompt = document.getElementById("prompt");
let cmd_output = document.getElementById("command_output");
let cmd_history = document.getElementById("cmd_hist");
let shell = document.getElementById("shell");

function check_hist() {
    if (cmd_prompt?.history === undefined)
        cmd_prompt.history = cmd_history.children.length - 1;

    if (cmd_prompt.history > cmd_history.children.length - 1)
        cmd_prompt.history = cmd_history.children.length - 1;

    if (cmd_prompt.history < 0) cmd_prompt.history = 0;
}

function main() {
    cmd_prompt.history = cmd_history.children.length - 1;

    cmd_prompt.onkeydown = (e) => {
        check_hist();

        switch (e.key) {
            case "Enter": {
                if (!cmd_prompt.value) return;

                let is_comment = false;
                let command_list = cmd_prompt.value.trimStart().split(" ");
                let command = command_list[0].toLocaleLowerCase();
                let argv = command_list.slice(1);

                if (commands[command]) {
                    if (commands[command]["root_only"] && !root) {
                        cmd_output.innerHTML = `'${escape_HTML(
                            command
                        )}' can <i>only</i> be ran as <b>root</b>. see <b>help su</b>`;
                    } else {
                        cmd_output.innerHTML = commands[command]["func"](argv);
                    }
                } else {
                    if (command[0] != "#")
                        cmd_output.innerText = `${command}: command not found`;
                    else is_comment = true;
                }

                if (
                    cmd_output.innerHTML.toString().replace(/\s/g, "") ||
                    is_comment
                ) {
                    let shell_old = document.createElement("pre");
                    shell_old.setAttribute("class", "shell");
                    shell_old.setAttribute(
                        "prompt",
                        shell.getAttribute("prompt")
                    );

                    let cmd = document.createElement("input");
                    cmd.setAttribute("class", "prompt");
                    cmd.setAttribute("value", cmd_prompt.value);
                    cmd.setAttribute("readonly", "");
                    cmd.setAttribute("disabled", "disabled");

                    let output = document.createElement("div");
                    output.setAttribute("class", "output");
                    output.innerHTML = cmd_output.innerHTML;

                    shell_old.appendChild(cmd);
                    shell_old.appendChild(output);

                    cmd_history.appendChild(shell_old);
                }

                cmd_prompt.value = "";
                cmd_output.innerHTML = "";

                window.scrollTo(0, document.body.scrollHeight);

                if (root) {
                    shell.setAttribute("prompt", "root");
                } else {
                    shell.setAttribute("prompt", "");
                }

                break;
            }

            case "ArrowUp": {
                cmd_prompt.value =
                    cmd_history.children[cmd_prompt.history--]?.firstChild
                        .value || cmd_prompt.value;

                cmd_prompt.selectionStart = cmd_prompt.value.length - 1;
                break;
            }

            case "ArrowDown": {
                cmd_prompt.value =
                    cmd_history.children[cmd_prompt.history++]?.firstChild
                        .value || cmd_prompt.value;

                cmd_prompt.selectionStart = cmd_prompt.value.length - 1;
                break;
            }
        }
    };
}

document.addEventListener("DOMContentLoaded", main);
