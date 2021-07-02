"use strict";

var params = new URL(document.location).searchParams;
var url = params.get("url");

if (!url) {
  var url = '/';
}

var url = url.toString();
document.title = "redirect to ".concat(url);
var head = document.createElement("h1");
head.innerHTML = "Rederect to <a href=\"".concat(url, "\">").concat(url, "</a>");
document.body.appendChild(head);
document.location.assign(url);