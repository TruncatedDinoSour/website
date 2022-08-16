"use strict";

import { gp, rgb_to_hex } from "../utils/index.js";
import { tty_clrs } from "./clrs.js";

const CLRS = ["r", "g", "b"];

function new_colourpicker(id, clr_map) {
    let div = document.createElement("div");

    div.id = id;

    CLRS.forEach((item, index) => {
        let clr = document.createElement("input");

        clr.type = "range";
        clr.min = 0;
        clr.max = 255;
        clr.name = item;
        clr.value = clr_map[index];
        clr.addEventListener("input", () => update_colour(id));

        div.appendChild(clr);
    });

    return div;
}

function update_colour(id) {
    let picker = document.getElementById(id);
    let gc = (value) => Number(picker.children[value].value); // get colour
    let rgb = [gc("r"), gc("g"), gc("b")];

    picker.style.backgroundColor = `rgb(${rgb.join(",")})`;
    localStorage.setItem(id, JSON.stringify({ rgb: rgb }));

    tty_clrs[id].rgb = rgb;
    generate_theme();
}

function load_from_localtorage() {
    let keys = Object.keys(tty_clrs);

    Object.keys(localStorage).forEach((key) => {
        if (keys.includes(key))
            tty_clrs[key].rgb = JSON.parse(localStorage.getItem(key))[
                "rgb"
            ].map(Number);
    });
}

export function generate_theme(query = "#theme-output") {
    document.body.style.backgroundColor = `rgb(${tty_clrs["black"].rgb.join(
        ","
    )})`;
    document.body.style.color = `rgb(${tty_clrs["light_gray"].rgb.join(",")})`;

    for (let header of document.querySelectorAll("h1, h2:first-of-type"))
        header.style.color = `rgb(${tty_clrs["bold_white"].rgb.join(",")})`;

    let elem = document.querySelector(query);
    if (!elem) throw ReferenceError(`${query} did not match any results`);

    let text = `# Theme generated using: ${window.location.href}
# Installation: Just add these lines to your ~/.bashrc

__tty_theme() {
    [ "$TERM" = 'linux' ] || return # Only run in a TTY

`;

    for (let key in tty_clrs) {
        let key_rgb = tty_clrs[key].rgb;
        let key_hex = rgb_to_hex(key_rgb);
        let rgb_str = `rgb(${key_rgb.join(", ")})`;

        text += `    printf "\\e]P${tty_clrs[key].mod}${key_hex}" # ${key}${gp(
            key,
            14
        )}${rgb_str}${gp(rgb_str, 20)}#${key_hex}\n`;
    }

    text += `
    clear # To fix the background
}

__tty_theme
`;
    elem.innerText = text;
}

export function export_element_as_file(query = "#theme-output") {
    generate_theme(query);

    let blob = new Blob([document.querySelector(query).innerText], {
        type: "text/plain",
    });

    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveBlob(blob, "ari_web_theme.bash");
    else {
        let elem = window.document.createElement("a");

        elem.href = window.URL.createObjectURL(blob);
        elem.download = "ari_web_theme.bash";

        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

export function clear_states() {
    Object.keys(localStorage).forEach((key) => {
        if (Object.keys(tty_clrs).includes(key)) localStorage.removeItem(key);
    });
}

export function copy_elem_to_clip(query = "#theme-output") {
    let elem = document.querySelector(query);
    if (!elem) throw ReferenceError(`Query '${query}' did not return anything`);

    let text_area = document.createElement("textarea");

    text_area.style.position = "fixed";
    text_area.style.top = 0;
    text_area.style.left = 0;

    text_area.style.width = "2em";
    text_area.style.height = "2em";

    text_area.style.padding = 0;

    text_area.style.border = "none";
    text_area.style.outline = "none";
    text_area.style.boxShadow = "none";

    text_area.style.background = "transparent";

    text_area.value = elem.innerText;

    document.body.appendChild(text_area);
    text_area.focus();
    text_area.select();

    document.execCommand("copy");
    document.body.removeChild(text_area);
}

function main() {
    load_from_localtorage();
    let menu = document.getElementById("menu");

    for (let key in tty_clrs) {
        let [r, g, b] = tty_clrs[key].rgb;
        let picker = new_colourpicker(key, [r, g, b]);

        picker.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        menu.appendChild(picker);
    }

    generate_theme();
}

document.addEventListener("DOMContentLoaded", main);
