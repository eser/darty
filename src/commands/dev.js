const shellSpawn = require('../shellSpawn');
const path = require('path');

function dev() {
    const webpackBrowserJsPath = path.resolve(__dirname, '../../etc/config/webpack.browser.js');

    shellSpawn('./node_modules/.bin/webpack-dev-server', [ '--config', webpackBrowserJsPath, '--inline', '--hot', '--progress' ]);
}

module.exports = dev;
