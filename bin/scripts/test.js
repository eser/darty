const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function test() {
    const jestConfigPath = path.resolve(__dirname, '../../core/etc/jest.config.js');

    shellSpawn('./node_modules/.bin/jest', [ '--config', jestConfigPath, '--rootDir', './' ]);
}

module.exports = test;
