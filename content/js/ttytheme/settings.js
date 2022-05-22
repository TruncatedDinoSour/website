"use strict";

import { tty_clrs } from "./clrs.js";
import { rgb_to_hex } from "../utils/index.js";

const HEX_REGEX = /^#[0-9A-F]{6}$/i;

function change_clr(id) {
    let box = document.getElementById(`${id}-box`);
    let out = document.getElementById(id);

    if (!box.value || !box.value.match(HEX_REGEX)) {
        out.style.backgroundColor = document.body.style.backgroundColor;
        return;
    }

    out.style.backgroundColor = box.value;
}

function hex_to_rgb(hex) {
    if (hex.length != 7) throw SyntaxError("Invalid hex");

    let rgb_hex = hex.substring(1).match(/.{1,2}/g);
    return [
        parseInt(rgb_hex[0], 16),
        parseInt(rgb_hex[1], 16),
        parseInt(rgb_hex[2], 16),
    ];
}

function commit(fields) {
    Array.from(fields.children).forEach((item) => {
        let clr_name = item.getAttribute("data-clr-name");
        let clr = item.children[0].value;

        if (clr_name && !clr && clr_name in localStorage)
            localStorage.removeItem(clr_name);

        if (!clr || !clr.match(HEX_REGEX)) return;

        localStorage.setItem(
            clr_name,
            JSON.stringify({ rgb: hex_to_rgb(clr) })
        );
    });

    alert("Settings saved!");
}

function load_local_storage() {
    let keys = Object.keys(tty_clrs);

    Object.keys(localStorage).forEach((key) => {
        if (keys.includes(key)) {
            let box = document.getElementById(`${key}-box`);

            if (!box) return;

            box.value = `#${rgb_to_hex(
                JSON.parse(localStorage.getItem(key))["rgb"].map(Number)
            )}`;
            box.onkeyup();
        }
    });
}

function main() {
    let clr_fields = document.getElementById("clr-fields");
    document.getElementById("commit").onclick = () => commit(clr_fields);

    for (const key in tty_clrs) {
        let entry = document.createElement("li");
        entry.setAttribute("data-clr-name", key);

        let entry_box = document.createElement("input");
        entry_box.type = "text";
        entry_box.id = `${key}-box`;
        entry_box.placeholder = `#${rgb_to_hex(tty_clrs[key].rgb)}`;

        let entry_test = document.createElement("span");
        entry_test.id = key;
        entry_test.innerText = `Test: ${key}`;

        entry_box.onkeyup = () => change_clr(key);

        entry.appendChild(entry_box);
        entry.appendChild(entry_test);

        clr_fields.appendChild(entry);
    }

    load_local_storage();
}

document.addEventListener("DOMContentLoaded", main);
