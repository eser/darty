const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function bundle() {
    const webpackBrowserJsPath = path.resolve(__dirname, '../../core/etc/webpack.browser.js');

    shellSpawn(`./node_modules/.bin/webpack --config ${webpackBrowserJsPath}`);
}

module.exports = bundle;
