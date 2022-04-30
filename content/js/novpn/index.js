"use strict";

var scroll_element = 0;
const scroll_elements = document.getElementsByClassName("content");

function scrollDown() {
    ++scroll_element;
    let elem = scroll_elements[scroll_element];
    elem.scrollIntoView({ behavior: "smooth" });
    if (elem) elem.scrollIntoView(true);
}

function scrollUp() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    scroll_element = 0;
}
