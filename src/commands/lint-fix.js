const shellSpawn = require('../shellSpawn');
const pathFinder = require('../utils/pathFinder');
const path = require('path');

function lintFix() {
    const eslintDefaultConfigPath = path.resolve(__dirname, '../../etc/config/eslint.config.js');
    const eslintLocalConfigPath = './eslint.config.js';

    const eslintConfigPath = pathFinder(eslintLocalConfigPath, eslintDefaultConfigPath);

    shellSpawn('./node_modules/.bin/eslint', [ '--config', eslintConfigPath, '--ext', '.js,.jsx,.ts,.tsx', '--fix', './src/' ]);
}

module.exports = lintFix;
