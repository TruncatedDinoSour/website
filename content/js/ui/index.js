"use strict";

function mkelem(elem, content, parent, attrs) {
    let e = document.createElement(elem);

    if (attrs) Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k]));

    switch (content.constructor) {
        case String:
            e.innerText = content;
            break;

        case Array:
            for (let c of content)
                e.appendChild(
                    c.constructor === String ? document.createTextNode(c) : c
                );
            break;

        default:
            e.appendChild(content);
            break;
    }

    parent?.appendChild(e);
    return e;
}
