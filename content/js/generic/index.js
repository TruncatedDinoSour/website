var root = false;

add_boot_entry(boot_message)

async function main() {
    let is_logged_in = (
        localStorage.getItem('username') &&
        localStorage.getItem('password')
    )

    let tmp_boot_entries = {
        0: {
            "type": 'error',
            "text": 'No user account found'
        },
        1: {
            "type": 'warning',
            "text": 'Creating account',
            "sleep_time": 500
        },
        3: {
            "type": 'ok',
            "text": `Found user account: <b>${localStorage.getItem('username')}</b>`
        },
        4: {
            "type": 'ok',
            "text": 'Loading HTML'
        },
        5: {
            "type": 'ok',
            "text": 'Loading a basic shell'
        },
        6: {
            "type": 'ok',
            "text": `'${site_name}' has been booted! enjoy`
        }
    }

    if (!is_logged_in) {
        await add_boot_entry({0: tmp_boot_entries[0], 1: tmp_boot_entries[1]});
        await sleep(500);
        user_account_create();

        return 1;
    } else {
        await add_boot_entry({
            0: tmp_boot_entries[3]
        });
        await add_boot_entry({
            0: tmp_boot_entries[4],
            1: tmp_boot_entries[5],
            2: tmp_boot_entries[6]
        });

        document.getElementById("shell").style.display = 'block';
        document.getElementById('prompt').focus();
    }
}


main();
