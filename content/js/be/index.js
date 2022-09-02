"use strict";

const FORM_CHECKERS = {
    android: (e, edata) => {
        let data = Object.fromEntries(new FormData(e.target).entries());

        console.log(data);
        console.log(edata);

        function no_has_gh(str) {
            return str.indexOf(data["gh-username"]) === -1;
        }

        if (!/^[0-9a-zA-Z]+$/.test(data["gh-username"]))
            alert("Invalid github username");
        else if (
            edata["disallowed-android-versions"].includes(
                data["and-version"].toLowerCase()
            )
        )
            alert("Disallowed android version");
        else if (data["ctree-url"])
            if (no_has_gh(data["ctree-url"]))
                alert(
                    "You have not provided any (valid) url from common trees"
                );
            else if (no_has_gh(data["dev-url"])) alert("No valid device url");
            else if (data["err-url"].indexOf("pastebin.com") !== -1)
                alert("Pastebin is not allowed");
            else if (no_has_gh(data["kern-url"]))
                alert("No valid kernel tree given");
            else if (data["rom-url"].indexOf("github") === -1)
                alert("No github url provided for the rom");
            else if (no_has_gh(data["ven-url"]))
                alert("No valid vendor url specified");
            else return true;

        return false;
    },
};

function append_children(parent, ...children) {
    for (let child of children) parent.appendChild(child);
}

function submit_btn() {
    let submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.id = "submit-button";

    return submit;
}

function to_clipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", text);
    } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
    ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

function render_type(type, data) {
    if (type.startsWith("%") || !(type in data)) {
        document.body.innerHTML = "<h1>Not a valid type, not rendering</h1>";
        setTimeout(() => (document.location = "."), 1000);

        return;
    }

    document.body.innerHTML =
        "<h1>Rendering form... (if this takes too long please see the dev console)</h1>";

    let form = document.createElement("form");
    form.id = "form";

    for (let [key, value] of Object.entries(data[type])) {
        let label = document.createElement("label");
        label.innerText = key;
        label.setAttribute("for", value.id);

        let input = document.createElement(
            value.textbox ? "textarea" : "input"
        );
        input.id = input.name = value.id;
        input.placeholder = input.title = value.placeholder;
        input.required = !value.optional;

        append_children(form, input, label, document.createElement("br"));
    }

    form.appendChild(submit_btn());
    document.body.innerHTML = "";

    let title = document.createElement("h1");
    title.innerText = `Error report form: ${type}`;

    document.body.innerHTML = `${title.outerHTML}${form.outerHTML}`;

    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        let is_good = true;

        if (type in FORM_CHECKERS)
            is_good = FORM_CHECKERS[type](e, data[`%${type}`]);

        if (is_good) {
            let text = `Error submission form: ${type}
From: ${document.location}

`;
            for (let [key, value] of new FormData(e.target).entries()) {
                if (!value) continue;

                text += `${
                    document.querySelector(`label[for="${key}"]`).innerText
                }: ${value}\n`;
            }

            document.body.innerText = text;
            document.body.onclick = () => {
                to_clipboard(document.body.innerText);
                alert("Copied to clipboard");
            };
        }

        return false;
    });
}

function render_full(data) {
    document.body.innerHTML = "<h1>Pick a type (no `t` GET param found)</h1>";

    let label = document.createElement("label");
    label.setAttribute("for", "types");
    label.innerText = "Pick the error report type:";

    let select = document.createElement("select");
    select.name = "types";
    select.id = "types";

    let submit = submit_btn();

    submit.onclick = () => {
        let val = select.value;
        if (!val) alert("Not a valid type :(");

        render_type(val, data);
    };

    for (let key in data) {
        if (key.startsWith("%")) continue;

        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;

        select.appendChild(option);
    }

    append_children(document.body, label, select, submit);
}

function main() {
    let type = new URL(document.location).searchParams.get("t");

    fetch("/api/errtemplate.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (type) render_type(type, data);
            else render_full(data);
        })
        .catch((err) => {
            alert(`Error, please report it to ${document.domain}/git: ${err}`);
        });
}

document.addEventListener("DOMContentLoaded", main);
