const path = require('path');
const pathFinder = require('./utils/pathFinder');
const pathMapFinder = require('./utils/pathMapFinder');

function variables(webpackOptions = undefined, argv = {}) {
    const appRoot = process.cwd();
    const dartyRoot = path.resolve(__dirname, '../');

    const envValue = argv.mode || process.env.NODE_ENV || 'development';
    const isProduction = (envValue === 'production');

    // load local manifest first
    let manifest = null;

    const localManifestFile = pathFinder(`${appRoot}/manifest.js`, `${appRoot}/manifest.json`);

    if (localManifestFile !== null) {
        manifest = require(localManifestFile);
    }

    // load preset and extend manifest
    let presetRoot = null;

    if (manifest !== null && 'preset' in manifest) {
        presetRoot = `${appRoot}/node_modules/${manifest.preset}`;

        const presetManifestFile = pathFinder(`${presetRoot}/manifest.js`, `${presetRoot}/manifest.json`);

        if (presetManifestFile !== null) {
            const presetManifest = require(presetManifestFile);

            if (presetManifest !== null) {
                manifest = { ...presetManifest, ...manifest };
            }
        }
    }

    return {
        webpackOptions,
        argv,
        manifest,
        appRoot,
        presetRoot,
        dartyRoot,
        envValue,
        isProduction,

        pathFinder,
        pathMapFinder,
    };
}

module.exports = variables;
