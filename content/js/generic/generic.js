const content = document.getElementById("content");
const bar = document.getElementById("bar");
const bar_list = document.getElementById("bar-list");
const menus = document.getElementById("menus");
const mobileMenu = document.getElementById("mobile-menu");

var showMobileMenu = true;


function addNewBarElement(innerElement, content, attrs, appendElement = bar_list) {
    let item = document.createElement('li');
    let itemContent = document.createElement(innerElement);

    item.setAttribute("class", "nav-item");
    for (const attr in attrs) {
        itemContent.setAttribute(attr, attrs[attr]);
    }

    itemContent.innerHTML = content;
    appendElement.appendChild(document.createTextNode("\n"));

    item.appendChild(itemContent);
    appendElement.appendChild(item);
}

function detectSmallScreen() {
    var isSmall = window.matchMedia ? 
              window.matchMedia("screen and (max-width: 699px)") : 
              screen.width<=699;
    let bar_items = document.getElementsByClassName("doHide");
    
    if (isSmall.matches) {
        for (const bar_item of bar_items) {
            bar_item.classList.add("smallHide");
        }

        if (!document.getElementById("mobileMenu")) {
            addNewBarElement(
                'a', 'Menu', {
                    "href": "#!",
                    "class": "nav-item bigHide noMargin",
                    "onClick": "openMobileMenu();",
                    "id": "mobileMenu"
                }
            );
        }
    } else {
        for (const bar_item of bar_items) {
            bar_item.classList.remove("smallHide", "noMargin");
        }
    }
}

function mobileCmd(e) {
    let textbox = document.getElementById("mobileCmd");
    let output = document.getElementById("mobileCmdOutput");

    if (!e) e = window.event;
    const keyCode = e.code || e.key;

    if (keyCode == 'Enter'){
        if (textbox.value) {
            try {
                var out = commands[textbox.value.replace(/^\$ /, '').split(' ')[0]](textbox.value);
            } catch (e) {
                var out = e;
            }
        }

        if (out) {
            output.innerText = out;
            textbox.value = '';
        }
    }
}

function addNewMobileMenuItem(innerElement, content, attrs) {
    if (!document.getElementById("mobileList")) {
        let list = document.createElement("ul");
        list.setAttribute("id", "mobileList")
        mobileMenu.appendChild(list);
    }
    let list = document.getElementById("mobileList");

    let item = document.createElement("li");
    let itemContent = document.createElement(innerElement);

    for (const attr in attrs) {
        itemContent.setAttribute(attr, attrs[attr]);
    }

    itemContent.innerHTML = content;
    list.appendChild(document.createTextNode("\n"));

    item.appendChild(itemContent);
    list.appendChild(item);
}

function openMobileMenu() {
    if (!showMobileMenu) {
        return;
    }


    let list = document.getElementById("mobileList");
    if (!list) {
        alert("No menu found :)");
        showMobileMenu = false;
        return;
    }

    let output = document.getElementById("mobileCmdOutput");
    output.innerHTML = '';

    if (mobileMenu.classList.contains("hiddenMobile")) {
        mobileMenu.classList.remove("hiddenMobile");
    } else {
        mobileMenu.classList.add("hiddenMobile");
    }

    let textbox = document.getElementById("mobileCmd");
    textbox.focus();
}


addNewBarElement(
    'a', 'Random_things', {
        "href": "/page/random",
        "class": "nav-item doHide",
    }
);

addNewBarElement(
    'a', 'JavaScript_apps', {
        "href": "/page/js",
        "class": "nav-item doHide",
    }
);

addNewBarElement(
    'a', 'Source_code', {
        "href": "//github.com/TruncatedDinosour/website",
        "class": "nav-item doHide",
    }
);

addNewBarElement(
    'a', 'Ari\'s_Web', {
        "href": "/",
        "class": "nav-logo"
    }
);

addNewMobileMenuItem('b', 'Pages:', {});
addNewMobileMenuItem('p', ' * Random_things', { "class": "keep-whitespace" });
addNewMobileMenuItem('p', ' * JavaScript_apps', { "class": "keep-whitespace" });
addNewMobileMenuItem('p', ' * Source_code', { "class": "keep-whitespace" });
addNewMobileMenuItem('p', ' * Home', { "class": "keep-whitespace" });


addNewMobileMenuItem('br', '', {});
addNewMobileMenuItem('b', 'type "help" for help', {});

addNewMobileMenuItem(
    'input', '', 
    {
        "type": "text",
        "class": "cmd",
        "onkeypress": "mobileCmd();",
        "id": "mobileCmd"
    }
);

addNewMobileMenuItem('div', '', { "id": "mobileCmdOutput", "class": "cmd-output" });


detectSmallScreen();
setInterval(detectSmallScreen, 100);
