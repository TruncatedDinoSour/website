"use strict";

// Get padding
export function gp(str, pad) {
    let ammount = pad - str.length;

    if (ammount <= 0) return "";

    return " ".repeat(ammount);
}

export function component_to_hex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function rgb_to_hex(rgb) {
    let hex = "";
    rgb.forEach((item) => (hex += component_to_hex(item)));
    return hex;
}
