const shellSpawn = require('../shellSpawn');
const path = require('path');
const pathFinder = require('../utils/pathFinder');
const log = require('../log');

function dev() {
    const webpackBrowserJsPath = pathFinder(
        './webpack.browser.js',
        path.resolve(__dirname, '../../etc/config/webpack.browser.js'),
    );

    log(`webpack config for browser located in ${webpackBrowserJsPath}`);
    shellSpawn(path.resolve(__dirname, '../../node_modules/.bin/webpack'), [ 'serve', '--config', webpackBrowserJsPath, '--hot', '--progress' ]);
}

module.exports = dev;
