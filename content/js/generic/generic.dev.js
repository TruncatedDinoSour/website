"use strict";

var content = document.getElementById("content");
var bar = document.getElementById("bar");
var bar_list = document.getElementById("bar-list");
var menus = document.getElementById("menus");
var mobileMenu = document.getElementById("mobile-menu");
var showMobileMenu = true;

function addNewBarElement(innerElement, content, attrs) {
  var appendElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : bar_list;
  var item = document.createElement('li');
  var itemContent = document.createElement(innerElement);
  item.setAttribute("class", "nav-item");

  for (var attr in attrs) {
    itemContent.setAttribute(attr, attrs[attr]);
  }

  itemContent.innerHTML = content;
  appendElement.appendChild(document.createTextNode("\n"));
  item.appendChild(itemContent);
  appendElement.appendChild(item);
}

function detectSmallScreen() {
  var isSmall = window.matchMedia ? window.matchMedia("screen and (max-width: 699px)") : screen.width <= 699;
  var bar_items = document.getElementsByClassName("doHide");

  if (isSmall.matches) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = bar_items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var bar_item = _step.value;
        bar_item.classList.add("smallHide");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!document.getElementById("mobileMenu")) {
      addNewBarElement('a', 'Menu', {
        "href": "#!",
        "class": "nav-item bigHide noMargin",
        "onClick": "openMobileMenu();",
        "id": "mobileMenu"
      });
    }
  } else {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = bar_items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _bar_item = _step2.value;

        _bar_item.classList.remove("smallHide", "noMargin");
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
}

function mobileCmd(e) {
  var textbox = document.getElementById("mobileCmd");
  var output = document.getElementById("mobileCmdOutput");
  if (!e) e = window.event;
  var keyCode = e.code || e.key;

  if (keyCode == 'Enter') {
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
    var _list = document.createElement("ul");

    _list.setAttribute("id", "mobileList");

    mobileMenu.appendChild(_list);
  }

  var list = document.getElementById("mobileList");
  var item = document.createElement("li");
  var itemContent = document.createElement(innerElement);

  for (var attr in attrs) {
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

  var list = document.getElementById("mobileList");

  if (!list) {
    alert("No menu found :)");
    showMobileMenu = false;
    return;
  }

  var output = document.getElementById("mobileCmdOutput");
  output.innerHTML = '';

  if (mobileMenu.classList.contains("hiddenMobile")) {
    mobileMenu.classList.remove("hiddenMobile");
  } else {
    mobileMenu.classList.add("hiddenMobile");
  }

  var textbox = document.getElementById("mobileCmd");
  textbox.focus();
}

addNewBarElement('a', 'Random_things', {
  "href": "/page/random",
  "class": "nav-item doHide"
});
addNewBarElement('a', 'JavaScript_apps', {
  "href": "/page/js",
  "class": "nav-item doHide"
});
addNewBarElement('a', 'Source_code', {
  "href": "//github.com/TruncatedDinosour/website",
  "class": "nav-item doHide"
});
addNewBarElement('a', 'Ari\'s_Web', {
  "href": "/",
  "class": "nav-logo"
});
addNewMobileMenuItem('b', 'Pages:', {});
addNewMobileMenuItem('p', ' * Random_things', {
  "class": "keep-whitespace"
});
addNewMobileMenuItem('p', ' * JavaScript_apps', {
  "class": "keep-whitespace"
});
addNewMobileMenuItem('p', ' * Source_code', {
  "class": "keep-whitespace"
});
addNewMobileMenuItem('p', ' * Home', {
  "class": "keep-whitespace"
});
addNewMobileMenuItem('br', '', {});
addNewMobileMenuItem('b', 'type "help" for help', {});
addNewMobileMenuItem('input', '', {
  "type": "text",
  "class": "cmd",
  "onkeypress": "mobileCmd();",
  "id": "mobileCmd"
});
addNewMobileMenuItem('div', '', {
  "id": "mobileCmdOutput",
  "class": "cmd-output"
});
detectSmallScreen();
setInterval(detectSmallScreen, 100);