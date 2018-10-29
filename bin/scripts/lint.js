const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function lint() {
    const eslintConfigPath = path.resolve(__dirname, '../../core/etc/eslint.config.js');

    shellSpawn('./node_modules/.bin/eslint', [ '--config', eslintConfigPath, '--ext', '.js,.jsx,.ts,.tsx,.mjs', './src/' ]);
}

module.exports = lint;
