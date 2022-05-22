"use strict";

import {
    clear_states,
    generate_theme,
    export_element_as_file,
    copy_elem_to_clip,
} from "./menu.js";

const ONCLICK_EVENTS = {
    "clear-states": () => {
        clear_states();
        window.location.reload();
    },
    "generate-theme": generate_theme,
    "export-file": export_element_as_file,
    copy: copy_elem_to_clip,
};

function main() {
    for (let id in ONCLICK_EVENTS)
        document.getElementById(id).addEventListener("click", async () => {
            ONCLICK_EVENTS[id]();

            let self_elem = document.getElementById(id);
            let old_text = self_elem.innerText;

            self_elem.innerText = "Done!";
            await new Promise((r) => setTimeout(r, 800));
            self_elem.innerText = old_text;
        });
}

document.addEventListener("DOMContentLoaded", main);
