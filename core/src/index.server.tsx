/* eslint-env node */

// polyfills
if (global.fetch === undefined) {
    global.fetch = require('node-fetch');
}

// startup
const startupArgs = {
};

import startupExecutor from './startupExecutor';

const startupObj = startupExecutor(startupArgs);

export {
    startupObj as default,
};
