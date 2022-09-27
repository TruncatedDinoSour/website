"use strict";

// Conffeti.js source: https://www.cssscript.com/confetti-falling-animation/

var maxParticleCount = 150; // set max confetti count
var particleSpeed = 2; // set the particle animation speed

var startConfetti; // call to start confetti animation
var stopConfetti; // call to stop adding confetti
var removeConfetti; // call to stop the confetti animation and remove all confetti immediately

(function () {
    startConfetti = startConfettiInner;
    stopConfetti = stopConfettiInner;
    removeConfetti = removeConfettiInner;
    var context, canvas;

    var colors = [
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
    var streamingConfetti = false;
    var animationTimer = null;
    var particles = [];
    var waveAngle = 0;

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = 0;
        return particle;
    }

    function startConfettiInner(text, textclr) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        window.requestAnimFrame = (function () {
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

        canvas = document.getElementById("confetti-canvas");

        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confetti-canvas");
            canvas.setAttribute(
                "style",
                "display: block;z-index:999999;pointer-events:none;overflow-y:hidden;min-width:100%;min-height:100%;position:fixed;top:0;left:0;"
            );
            document.body.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
            window.addEventListener(
                "resize",
                function () {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                },
                true
            );
        }

        context = canvas.getContext("2d");

        while (particles.length < maxParticleCount)
            particles.push(resetParticle({}, width, height));
        streamingConfetti = true;
        if (animationTimer === null) {
            (function runAnimation() {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight);

                if (particles.length === 0) {
                    animationTimer = null;
                    context.clearRect(
                        0,
                        0,
                        window.innerWidth,
                        window.innerHeight
                    );
                } else {
                    updateParticles();
                    drawParticles(context);
                    animationTimer = requestAnimFrame(runAnimation);

                    context.textAlign = "center";
                    context.fillStyle = textclr;
                    context.font = "2em sans";

                    context.fillText(text, canvas.width / 2, canvas.height / 2);
                }
            })();
        }
    }

    function stopConfettiInner() {
        streamingConfetti = false;
    }

    function removeConfettiInner() {
        stopConfetti();
        particles = [];
    }

    function drawParticles(context) {
        var particle;
        var x;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            x = particle.x + particle.tilt;
            context.moveTo(x + particle.diameter / 2, particle.y);
            context.lineTo(
                x,
                particle.y + particle.tilt + particle.diameter / 2
            );
            context.stroke();
        }
    }

    function updateParticles() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var particle;
        waveAngle += 0.01;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            if (!streamingConfetti && particle.y < -15)
                particle.y = height + 100;
            else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(waveAngle);
                particle.y +=
                    (Math.cos(waveAngle) + particle.diameter + particleSpeed) *
                    0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if (
                particle.x > width + 20 ||
                particle.x < -20 ||
                particle.y > height
            ) {
                if (streamingConfetti && particles.length <= maxParticleCount)
                    resetParticle(particle, width, height);
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

        startConfetti(
            `Happy ${human_num(bday)} birthday, ${site_name}!`,
            "#f0f7ff"
        );

        setTimeout(() => {
            stopConfetti();
            removeConfetti();
        }, 5000);

        window.localStorage.setItem("bday", ctime.getFullYear());
    }
}

document.addEventListener("DOMContentLoaded", main);
