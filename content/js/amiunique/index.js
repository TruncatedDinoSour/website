"use strict";

import TEST_OPTIONS from "./options.js";

function calculate_rarity() {
    let test_div = document.getElementById("unique-test");

    let score = [];
    let exit = false;

    Array.from(test_div.children).forEach((child) => {
        if (exit) return;

        let question_num = child.getAttribute("data-question");
        let question_answer = null;

        Array.from(child.children[1].children).forEach((answer) => {
            if (
                answer instanceof HTMLLabelElement ||
                exit ||
                question_answer !== null
            )
                return;

            if (answer.checked) {
                question_answer = parseFloat(
                    answer.getAttribute("data-rarity")
                );
                return;
            }
        });

        if (question_answer === null) {
            alert(`Unasnwered question: ${question_num}`);
            exit = true;
            return;
        }

        score.push(question_answer);
    });

    return score;
}

function display_score() {
    let score = calculate_rarity();
    let score_percent =
        (score.reduce((partial, answer) => partial + answer, 0) /
            score.length) *
        100;

    if (score.length === TEST_OPTIONS.length) {
        let existing_answer_div = document.getElementById("score");
        let answer_div = existing_answer_div
            ? existing_answer_div
            : document.createElement("div");

        answer_div.setAttribute("id", "score");
        answer_div.onclick = () => {
            answer_div.remove();
            document.body.style.overflow = "initial";
        };

        let answer_h1 = document.createElement("h1");
        answer_h1.innerText = `Your uniqueness% is: ${score_percent}%`;

        answer_div.appendChild(answer_h1);
        document.body.appendChild(answer_div);

        document.body.style.overflow = "hidden";
    }
}

function main() {
    let test_div = document.getElementById("unique-test");
    document.getElementById("unique-test-submit").onclick = () =>
        display_score();

    TEST_OPTIONS.forEach((qitem, qindex) => {
        let question_div = document.createElement("div");
        let question_title = document.createElement("h2");
        let question_options = document.createElement("div");

        question_div.setAttribute("data-question", qindex);

        question_title.innerText = `#${qindex}: ${qitem["title"]}`;

        qitem["options"].forEach((option) => {
            let option_radio = document.createElement("input");
            let option_label = document.createElement("label");

            let radio_options = {
                type: "radio",
                name: qindex,
                id: qindex,
                "data-rarity": option["rarity"],
            };

            Object.keys(radio_options).forEach((attr) =>
                option_radio.setAttribute(attr, radio_options[attr])
            );

            option_label.setAttribute("for", qindex);
            option_label.innerText = option["title"];

            question_options.appendChild(option_radio);
            question_options.appendChild(option_label);
        });

        question_div.appendChild(question_title);
        question_div.appendChild(question_options);

        test_div.appendChild(question_div);
    });
}

document.addEventListener("DOMContentLoaded", main);
