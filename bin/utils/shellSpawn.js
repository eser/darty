const { spawnSync } = require('child_process');

function shellSpawn(commandLine, cwd) {
    const proc = spawnSync(commandLine, {
        stdio: 'inherit',
        shell: true,
        cwd: cwd || process.cwd(),
    });

    if (proc.status > 0) {
        throw new Error(`command '${commandLine}' exited with ${proc.status}.`);
    }

    return proc;
}

module.exports = shellSpawn;
