"use strict";

// Confetti.js source: https://www.cssscript.com/confetti-falling-animation/

let max_partics = 150; // set max confetti count
let partic_spd = 2; // set the particle animation speed

let confetti; // call to start confetti animation
let stop_confetti; // call to stop adding confetti
let rm_confetti; // call to stop the confetti animation and remove all confetti immediately

(function () {
    confetti = start_confetti_inner;
    stop_confetti = stop_confetti_inner;
    rm_confetti = remove_confetti_inner;

    let ctx, canvas;
    let clrs = [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "Pink",
        "SlateBlue",
        "LightBlue",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson",
    ];
    let confetti_on = false;
    let anim_t = null;
    let particles = [];
    let wav_angle = 0;

    function reset_particle(part, width, height) {
        part.color = clrs[(Math.random() * clrs.length) | 0];
        part.x = Math.random() * width;
        part.y = Math.random() * height - height;
        part.diameter = Math.random() * 10 + 5;
        part.tilt = Math.random() * 10 - 10;
        part.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        part.tiltAngle = 0;

        return part;
    }

    function stop_confetti_inner() {
        confetti_on = false;
    }

    function remove_confetti_inner() {
        stop_confetti();
        setTimeout(() => canvas.remove(), 500);
        particles = [];
    }

    function start_confetti_inner(text, textclr) {
        let width = window.innerWidth;
        let height = window.innerHeight;

        window.req_animf = (function () {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 16.6666667);
                }
            );
        })();

        canvas = document.getElementById("c");

        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "c");
            canvas.setAttribute(
                "style",
                "display:block;z-index:999999;pointer-events:none;overflow-y:hidden;min-width:100%;min-height:100%;position:fixed;top:0;left:0;"
            );

            document.body.appendChild(canvas);

            canvas.width = width;
            canvas.height = height;

            window.addEventListener(
                "resize",
                () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                },
                true
            );
        }

        ctx = canvas.getContext("2d");

        while (particles.length < max_partics)
            particles.push(reset_particle({}, width, height));

        confetti_on = true;

        if (anim_t === null) {
            (function anim() {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                if (particles.length === 0) {
                    anim_t = null;
                    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                } else {
                    try {
                        upd_partics();
                        drw_partics();

                        anim_t = req_animf(anim);

                        ctx.textAlign = "center";
                        ctx.fillStyle = textclr;
                        ctx.font = "2em sans-serif";

                        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                    } catch (e) {
                        console.error(e);

                        alert(`\u{0001f389} ${text} \u{0001f389}`);
                        particles = [];

                        return stop_confetti();
                    }
                }
            })();
        }
    }

    function drw_partics() {
        let part, x;

        for (let i = 0; i < particles.length; i++) {
            part = particles[i];
            ctx.beginPath();
            ctx.lineWidth = part.diameter;
            ctx.strokeStyle = part.color;

            x = part.x + part.tilt;

            ctx.moveTo(x + part.diameter / 2, part.y);
            ctx.lineTo(x, part.y + part.tilt + part.diameter / 2);
            ctx.stroke();
        }
    }

    function upd_partics() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let part;

        wav_angle += 0.01;

        for (let i = 0; i < particles.length; i++) {
            part = particles[i];

            if (!confetti_on && part.y < -15) part.y = height + 100;
            else {
                part.tiltAngle += part.tiltAngleIncrement;
                part.x += Math.sin(wav_angle);
                part.y +=
                    (Math.cos(wav_angle) + part.diameter + partic_spd) * 0.5;
                part.tilt = Math.sin(part.tiltAngle) * 15;
            }

            if (part.x > width + 20 || part.x < -20 || part.y > height) {
                if (confetti_on && particles.length <= max_partics)
                    reset_particle(part, width, height);
                else {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
})();

function human_num(n) {
    let tmp_numr = NUMERICS[n - 1];
    return `${n}${tmp_numr ? tmp_numr : NUMERICS[NUMERICS.length - 1]}`;
}

function main() {
    let ctime = new Date();

    if (
        BIRTHDAY.getDate() == ctime.getDate() &&
        BIRTHDAY.getMonth() == ctime.getMonth() &&
        BIRTHDAY.getFullYear() != ctime.getFullYear() &&
        (!("bday" in window.localStorage) ||
            window.localStorage["bday"] != ctime.getFullYear())
    ) {
        let bday = ctime.getFullYear() - BIRTHDAY.getFullYear();

        confetti(
            `happy ${human_num(bday)} birthday, ${SITE_NAME} !`,
            "#f0f7ff"
        );

        setTimeout(() => {
            stop_confetti();
            rm_confetti();
        }, 5000);

        window.localStorage.setItem("bday", ctime.getFullYear());
    }
}

document.addEventListener("DOMContentLoaded", main);
