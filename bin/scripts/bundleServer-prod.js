const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function bundleServerProd() {
    const webpackServerJsPath = path.resolve(__dirname, '../../core/etc/webpack.server.js');

    shellSpawn(`./node_modules/.bin/webpack --config ${webpackServerJsPath} --mode production`);
}

module.exports = bundleServerProd;
