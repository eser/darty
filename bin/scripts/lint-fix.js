const shellSpawn = require('../utils/shellSpawn');
const pathFinder = require('../../core/etc/scripts/pathFinder');
const path = require('path');

function lintFix() {
    const eslintDefaultConfigPath = path.resolve(__dirname, '../../core/etc/eslint.config.js');
    const eslintLocalConfigPath = './eslint.config.js';

    const eslintConfigPath = pathFinder(eslintLocalConfigPath, eslintDefaultConfigPath);

    shellSpawn('./node_modules/.bin/eslint', [ '--config', eslintConfigPath, '--ext', '.js,.jsx,.ts,.tsx', '--fix', './src/' ]);
}

module.exports = lintFix;
