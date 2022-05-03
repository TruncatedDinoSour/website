function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function add_boot_entry(entry_object) {
    for (const entry in entry_object) {
        if (do_sleep) {
            let sleep_time;
            if (typeof entry_object[entry]["sleep_time"] !== "undefined") {
                sleep_time = entry_object[entry]["sleep_time"];
            } else {
                sleep_time = Math.floor(Math.random() * 2000 + 500);
            }
            await sleep(sleep_time);
        }

        let new_entry = document.createElement("p");
        new_entry.innerHTML = entry_object[entry]["text"];
        new_entry.classList.add("bmsg");

        let entry_class;
        switch (entry_object[entry]["type"]) {
            case "error":
                entry_class = "error";
                break;

            case "warning":
                entry_class = "warn";
                break;

            case "ok":
                entry_class = "ok";
                break;

            default:
                throw `Type '${entry_object[entry]["type"]}' not found.`;
        }

        new_entry.setAttribute("bmsg_type", entry_class);
        boot.appendChild(new_entry);
    }
}

function hash(string) {
    return string.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
}
