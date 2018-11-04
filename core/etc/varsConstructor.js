const path = require('path');

function varsConstructor(env = 'development', argv = {}) {
    const appRoot = process.cwd();
    const dartyRoot = path.resolve(__dirname, '../../');

    const envValue = argv.mode || process.env.NODE_ENV || 'development';
    const isProduction = (envValue === 'production');

    let manifest;

    try {
        manifest = require(`${appRoot}/manifest.json`);
    }
    catch (ex) {
        manifest = {};
    }

    let presetRoot;

    if ('preset' in manifest) {
        try {
            presetRoot = `${appRoot}/node_modules/${manifest['preset']}`;

            manifest = Object.assign(
                {},
                require(`${presetRoot}/manifest.json`),
                manifest
            );
        }
        catch (ex) {
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
