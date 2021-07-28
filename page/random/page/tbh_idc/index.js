const random_person_instagram = document.getElementById("random_person_instagram");

function create_img_elements(html_element, count, dir) {
    for (let i = 1; i < count + 1; ++i) {
        let img = document.createElement("img");
        img.setAttribute("src", `${dir}/${i}.jpg`);
        img.setAttribute("width", "200px")
        html_element.appendChild(img);
    }
}

create_img_elements(random_person_instagram, 11, '/page/random/page/tbh_idc/img/random_person_on_instagram');
