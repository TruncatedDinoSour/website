"use strict";

function reload(cmd) {
  document.location.reload();
  return "ReLoad: reloading the page";
}

function _goto(cmd) {
  cmd = cmd.split(' ');

  try {
    var loc = pages[cmd[1].toLocaleLowerCase()];
  } catch (e) {
    return "GOTO: cannot pass an empty location";
  }

  if (loc) {
    document.location.assign(loc);
    return "redirecting to ".concat(loc);
  } else {
    return "GOTO: ".concat(cmd[1], " does not exist");
  }
}

function exit() {
  var textbox = document.getElementById("mobileCmd");
  textbox.value = '';
  mobileMenu.classList.add("hiddenMobile");
}

function help(cmd) {
  return "help - display help\n    goto [PAGE] - go to a specified page\n    reload - reload the page\n    exit - exit";
}

var pages = {
  "random_things": "/page/random",
  "javascript_apps": "/page/js",
  "source_code": "/page/redirect?url=//github.com/TruncatedDinosour/website",
  "home": "/"
};
var commands = {
  "help": help,
  "goto": _goto,
  "reload": reload,
  "exit": exit
};