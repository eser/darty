const shellSpawn = require('../shellSpawn');
const pathFinder = require('../utils/pathFinder');
const path = require('path');

function lint() {
    const eslintDefaultConfigPath = path.resolve(__dirname, '../../etc/eslint.config.js');
    const eslintLocalConfigPath = './eslint.config.js';

    const eslintConfigPath = pathFinder(eslintLocalConfigPath, eslintDefaultConfigPath);

    shellSpawn('./node_modules/.bin/eslint', [ '--config', eslintConfigPath, '--ext', '.js,.jsx,.ts,.tsx', './src/' ]);
}

module.exports = lint;
