"use strict";

function loadterm() {
    if (window.term >= 3) {
        document.getElementById("term-wrap").style.display = "";
        document.getElementById("term-input").focus();
        window.term = 0;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function evaluate_command(command, output, hist, term_wrap) {
    let cmd = await command.split(" ");
    let cmd_fn = window[`cmd_${cmd[0]}`];

    if (!cmd_fn) {
        output.innerText = `'${cmd[0]}' is not a valid command`;
        return;
    }

    for (let elem of await cmd_fn(cmd.slice(1), hist, term_wrap)) {
        switch (elem.constructor) {
            case String:
                for (let c of elem) {
                    let last = output.childNodes[output.childNodes.length - 1];
                    if (last instanceof Text) last.textContent += c;
                    else await output.appendChild(document.createTextNode(c));
                    await sleep(6);
                }
                break;

            default: {
                let load = document.createTextNode("...");
                await output.appendChild(load);
                await sleep(24);
                load.remove();
                await output.appendChild(elem);
            }
        }
    }
}

async function run_command(hist, input, input_wrap, term_wrap) {
    let hist_wrap = document.createElement("div");
    let hist_item = input_wrap.cloneNode(true);

    hist_item.removeAttribute("id");
    hist_item.children[0].removeAttribute("id");
    hist_item.children[0].disabled = true;

    let output = document.createElement("pre");

    await hist_wrap.appendChild(hist_item);
    hist_wrap.appendChild(output);

    await hist.appendChild(hist_wrap);

    new ResizeObserver((entries) => entries[0].target.scrollIntoView()).observe(
        output
    );

    input.blur();
    input_wrap.style.display = "none";

    await evaluate_command(input.value, output, hist, term_wrap);

    input.value = "";
    input_wrap.style.display = "";

    await input.focus();
    await input.scrollIntoView();
}

function main() {
    let term_wrap = document.getElementById("term-wrap");
    let input = document.getElementById("term-input");
    let hist = document.getElementById("term-hist");
    let input_wrap = document.getElementById("input-wrap");

    input.onkeypress = (e) => {
        if (
            (e.keyCode ? e.keyCode : e.which) === 13 &&
            (input.value = input.value.trim())
        )
            run_command(hist, input, input_wrap, term_wrap);
    };
}

document.addEventListener("DOMContentLoaded", main);
