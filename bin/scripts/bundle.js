const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function bundle() {
    const webpackBrowserJsPath = path.resolve(__dirname, '../../core/etc/webpack.browser.js');
    const webpackServerJsPath = path.resolve(__dirname, '../../core/etc/webpack.server.js');

    shellSpawn('./node_modules/.bin/webpack', [ '--config', webpackBrowserJsPath ]);
    shellSpawn('./node_modules/.bin/webpack', [ '--config', webpackServerJsPath ]);
}

module.exports = bundle;
