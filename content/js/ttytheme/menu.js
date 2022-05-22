"use strict";

import { gp } from "../../js/utils/index.js";

var tty_clrs = {
    black: [0, 0, 0],
    red: [170, 0, 0],
    green: [0, 170, 0],
    orange: [170, 85, 0],
    blue: [0, 0, 170],
    magenta: [170, 0, 170],
    cyan: [0, 170, 170],
    gray: [170, 170, 170],
    dark_gray: [85, 85, 85],
    light_red: [255, 85, 85],
    light_green: [85, 255, 85],
    yellow: [255, 255, 85],
    light_blue: [85, 85, 255],
    light_magenta: [255, 85, 255],
    light_cyan: [85, 255, 255],
    white: [255, 255, 255],
};
const CLRS = ["r", "g", "b"];
const BLACKLIST_LC = ["username", "password"];
const TTY_MODS = {
    black: "0",
    red: "9",
    green: "2",
    orange: "1",
    blue: "4",
    magenta: "5",
    cyan: "6",
    gray: "7",
    dark_gray: "5",
    light_red: "5",
    light_green: "A",
    yellow: "B",
    light_blue: "C",
    light_magenta: "D",
    light_cyan: "E",
    white: "F",
};

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

    tty_clrs[id] = rgb;
    generate_theme();
}

function load_from_localtorage() {
    let keys = Object.keys(tty_clrs);

    Object.keys(localStorage).forEach((key) => {
        if (!BLACKLIST_LC.includes(key) && keys.includes(key))
            tty_clrs[key] = JSON.parse(localStorage.getItem(key))["rgb"].map(
                Number
            );
    });
}

function component_to_hex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgb_to_hex(rgb) {
    let hex = "";
    rgb.forEach((item) => (hex += component_to_hex(item)));
    return hex;
}

function save(filename, data) {
    const blob = new Blob([data], { type: "text/plain" });

    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveBlob(blob, filename);
    else {
        const elem = window.document.createElement("a");

        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;

        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

export function generate_theme(query = "#theme-output") {
    document.body.style.backgroundColor = `rgb(${tty_clrs["black"].join(",")})`;
    document.body.style.color = `rgb(${tty_clrs["white"].join(",")})`;

    let elem = document.querySelector(query);
    if (!elem) throw ReferenceError(`${query} did not match any results`);

    let text = `# Theme generated using: ${window.location.href}
# Installation: Just add these lines to your ~/.bashrc

__tty_theme() {
    [ "$TERM" != 'linux' ] && return # Only run in a TTY

`;

    for (const key in tty_clrs) {
        let key_rgb = tty_clrs[key];
        let key_hex = rgb_to_hex(key_rgb);
        let rgb_str = `rgb(${key_rgb.join(", ")})`;

        text += `    printf "\\e]P${TTY_MODS[key]}${key_hex}" # ${key}${gp(
            key,
            15
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
    save("ari_web_theme.bash", document.querySelector(query).innerText);
}

export function clear_states() {
    Object.keys(localStorage).forEach((key) => {
        if (!BLACKLIST_LC.includes(key)) localStorage.removeItem(key);
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

    for (const key in tty_clrs) {
        let [r, g, b] = tty_clrs[key];
        let picker = new_colourpicker(key, [r, g, b]);

        picker.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        menu.appendChild(picker);
    }

    generate_theme();
}

document.addEventListener("DOMContentLoaded", main);
