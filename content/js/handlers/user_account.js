"use strict";

let user_canceled = false;

function pprompt(message) {
    if (user_canceled) return;

    let value = prompt(message);

    if (value === null) {
        user_canceled = true;
        return;
    }

    return value.replaceAll(" ", "") ? value : pprompt(message);
}

async function user_account_create() {
    alert(
        "This account is not a *real* account, this is just a toy to refer \
to you by your username and for more realistic 'root' access"
    );

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

    let msg = "unknown reason (please report this bug)";
    let valid = false;

    // Lord forgive me, but what else am I supposed to do
    if (!password_confirm) msg = "no password confirmation supplied";
    else if (password.length < 6) msg = "password is shorter than 6 characters";
    else if (username.length > max_username_len || !username)
        msg = `username is not between 1 and ${max_username_len} characters`;
    else if (password !== password_confirm)
        msg = "password and password confirmation did not match";
    else valid = true;

    if (!valid) {
        if (
            !user_canceled &&
            confirm(
                `The credentials you entered are not valid: ${msg}, try again?`
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
