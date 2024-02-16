function runCommand(cmd) {
    return new Promise((resolve, reject) => {
        const output = [];
        const child = spawn(cmd, { shell: true });

        const errors = [];

        child.stdout.on('data', (data) => {
            output.push(`${data}\n`);
        });

        child.stderr.on('data', (data) => {
            errors.push(`${data}\n`);
        });

        child.on('close', (code, hghngf) => {
            console.log(`child process exited with code ${code}`);
            if (code === 0) {
                resolve({ output, errors });
            } else {
                reject({ output, errors });
            }
        });
    });
}
module.exports.runCommand = runCommand;