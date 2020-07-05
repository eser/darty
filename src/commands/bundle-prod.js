const shellSpawn = require('../shellSpawn');
const path = require('path');

function bundleProd() {
    const webpackBrowserJsPath = path.resolve(__dirname, '../../etc/config/webpack.browser.js');
    const webpackServerJsPath = path.resolve(__dirname, '../../etc/config/webpack.server.js');

    shellSpawn('./node_modules/.bin/webpack', [ '--config', webpackBrowserJsPath, '--mode', 'production' ]);
    shellSpawn('./node_modules/.bin/webpack', [ '--config', webpackServerJsPath, '--mode', 'production' ]);
}

module.exports = bundleProd;
