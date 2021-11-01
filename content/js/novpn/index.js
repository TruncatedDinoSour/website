var scroll_element = 0;
const scroll_elements = document.getElementsByClassName("content");

function scrollDown() {
    ++scroll_element;
    let elem = scroll_elements[scroll_element];
    elem.scrollIntoView({ behavior: 'smooth' });
    if (elem) elem.scrollIntoView(true);
}

function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
