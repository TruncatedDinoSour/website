"use strict";

// Get padding
export function gp(str, pad) {
    let ammount = pad - str.length;

    if (ammount <= 0) return "";

    return " ".repeat(ammount);
}
