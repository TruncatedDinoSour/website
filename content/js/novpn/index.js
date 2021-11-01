var scroll_element = 0;
const scroll_elements = document.getElementsByClassName("content");

function scrollDown() {
    ++scroll_element;
    let elem = scroll_elements[scroll_element];
    if (elem) elem.scrollIntoView(true);
}
