const cmd_prompt = document.getElementById('prompt');
const cmd_output = document.getElementById('command_output');
const cmd_history = document.getElementById('cmd_hist');
const shell = document.getElementById('shell');
var is_root = false;

function main() {
    cmd_prompt.onkeypress = (e) => {
        if (!cmd_prompt.value) return;

        let code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            let command_list = cmd_prompt.value.split(' ');
            let command = command_list[0];
            let argv = command_list.slice(1);


            if (commands[command]) {
                if (commands[command]['root_only'] && !root) {
                    cmd_output.innerHTML = `'${command}' can <i>only</i> be ran as <b>root</b>. see <b>help su</b>`
                } else {
                    cmd_output.innerHTML = commands[command]['func'](argv);
                } 
            } else {
                cmd_output.innerHTML = `${command}: command not found`
            }


            if (cmd_output.innerHTML.toString().replace(/\s/g, '')) {
                let shell_old = document.createElement('div');
                shell_old.setAttribute('class', 'shell');
                shell_old.setAttribute('prompt', shell.getAttribute('prompt'));

                let cmd = document.createElement('input');
                cmd.setAttribute('class', 'prompt');
                cmd.setAttribute('value', cmd_prompt.value);
                cmd.setAttribute('readonly', '');

                let output = document.createElement('div');
                output.setAttribute('class', 'output')
                output.innerHTML = cmd_output.innerHTML;

                shell_old.appendChild(cmd);
                shell_old.appendChild(output);

                cmd_history.appendChild(shell_old);
            }

            cmd_prompt.value = '';
            cmd_output.innerHTML = '';

            window.scrollTo(0, document.body.scrollHeight);

            if (root) {
                shell.setAttribute('prompt', 'root')
            } else {
                shell.setAttribute('prompt', '')
            }
        }
    };
}

main()
