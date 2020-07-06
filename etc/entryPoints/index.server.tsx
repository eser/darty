/* eslint-env node */
import startupExecutor from './startupExecutor.ts';

// polyfills
if (global.fetch === undefined) {
    global.fetch = require('node-fetch');
}

// startup
const startupArgs = {
    platform: 'server',
};

const startupObj = startupExecutor(startupArgs);

export {
    startupObj as default,
};
