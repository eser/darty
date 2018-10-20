const { spawnSync } = require('child_process');

function shellSpawn(commandLine, cwd) {
    return spawnSync(commandLine, {
        stdio: 'inherit',
        shell: true,
        cwd: cwd || process.cwd(),
    });
}

module.exports = shellSpawn;
