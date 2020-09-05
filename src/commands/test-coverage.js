const shellSpawn = require('../shellSpawn');
const path = require('path');
const pathFinder = require('../utils/pathFinder');
const log = require('../log');

function testCoverage() {
    const jestConfigPath = pathFinder(
        './jest.config.js',
        path.resolve(__dirname, '../../etc/config/jest.config.js'),
    );

    log(`jest config located in ${jestConfigPath}`);
    shellSpawn('./node_modules/.bin/jest', [ '--config', jestConfigPath, '--rootDir', './', '--coverage' ]);
}

module.exports = testCoverage;
