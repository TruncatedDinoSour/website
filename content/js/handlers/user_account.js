"use strict";

function pprompt(message) {
    let value = prompt(message);
    return value ? value : pprompt(message);
}

async function user_account_create() {
    let username = pprompt(`Enter (make up) your username`);
    let password = pprompt(`Enter the password for '${username}'`);
    let password_confirm = pprompt(`Confirm the password for '${username}'`);

    let tmp_boot_entries = {
        0: {
            type: "error",
            text: "User account not created: canceled by user",
            sleep_time: 0,
        },
    };

    let valid =
        username &&
        password &&
        password_confirm &&
        password.length > 6 &&
        password == password_confirm;

    if (!valid) {
        if (
            confirm(
                "The credentials you entered are not valid (password/username too short or the password don't match), try again?"
            )
        ) {
            user_account_create();
            return 1;
        }

        add_boot_entry({ 0: tmp_boot_entries[0] });
        await sleep(2500);
    } else {
        alert("The next popup will show your credentials, press OK to proceed");
        let confirm_credentials = confirm(`Are these credentials correct?:
        USER: ${username}
        PASS: ${password}`);

        if (confirm_credentials) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", hash(password));

            alert("Credentials saved!");
        }
    }
}
