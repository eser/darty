const shellSpawn = require('../shellSpawn');
const path = require('path');
const pathFinder = require('../utils/pathFinder');
const log = require('../log');

function bundle() {
    const webpackBrowserJsPath = pathFinder(
        './webpack.browser.js',
        path.resolve(__dirname, '../../etc/config/webpack.browser.js'),
    );

    const webpackServerJsPath = pathFinder(
        './webpack.server.js',
        path.resolve(__dirname, '../../etc/config/webpack.server.js'),
    );

    log(`webpack config for browser located in ${webpackBrowserJsPath}`);
    shellSpawn('./node_modules/.bin/webpack', [ '--config', webpackBrowserJsPath ]);

    log(`webpack config for server located in ${webpackServerJsPath}`);
    shellSpawn('./node_modules/.bin/webpack', [ '--config', webpackServerJsPath ]);
}

module.exports = bundle;
