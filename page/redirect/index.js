let params = (new URL(document.location)).searchParams;


var url = params.get("url");
if (!url) {
    var url = '/';
}
var url = url.toString();


document.title = `redirect to ${url}`;

let head = document.createElement("h1");
head.innerHTML = `Rederect to <a href="${url}">${url}</a>`
document.body.appendChild(head);

document.location.assign(url);
