const path = require('path');
const pathFinder = require('../../src/utils/pathFinder');

// eslint-disable-next-line max-statements
function varsConstructor(env = undefined, argv = {}) {
    const appRoot = process.cwd();
    const dartyRoot = path.resolve(__dirname, '../../');

    const envValue = env || argv.mode || process.env.NODE_ENV || 'development';
    const isProduction = (envValue === 'production');

    // load local manifest first
    let manifest = null;

    const localManifestFile = pathFinder(`${appRoot}/manifest.js`, `${appRoot}/manifest.json`);

    if (localManifestFile !== null) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        manifest = require(localManifestFile);
    }

    // load preset and extend manifest
    let presetRoot = null;

    if (manifest !== null && 'preset' in manifest) {
        presetRoot = `${appRoot}/node_modules/${manifest.preset}`;

        const presetManifestFile = pathFinder(`${presetRoot}/manifest.js`, `${presetRoot}/manifest.json`);

        if (presetManifestFile !== null) {
            // eslint-disable-next-line import/no-dynamic-require, global-require
            const presetManifest = require(presetManifestFile);

            if (presetManifest !== null) {
                manifest = { ...presetManifest, ...manifest };
            }
        }
    }

    return {
        env,
        argv,
        manifest,
        appRoot,
        presetRoot,
        dartyRoot,
        envValue,
        isProduction,
    };
}

module.exports = varsConstructor;
