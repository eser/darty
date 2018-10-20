const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function bundleServer() {
    const webpackServerJsPath = path.resolve(__dirname, '../../core/etc/webpack.server.js');

    shellSpawn(`./node_modules/.bin/webpack --config ${webpackServerJsPath}`);
}

module.exports = bundleServer;
