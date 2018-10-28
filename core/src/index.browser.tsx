/* eslint-env browser */

declare var document: any;

// polyfills
if (global.Promise === undefined) {
    const es6promise = require('es6-promise');

    es6promise.polyfill();
}

if (global.fetch === undefined) {
    require('whatwg-fetch');
}

// startup
const startupArgs = {
};

import startupExecutor from './startupExecutor';
const startupObj = startupExecutor(startupArgs);

const targetElement = document.getElementsByTagName('app')[0];
const isSsr = (targetElement.childNodes.length > 0);

startupObj.clientRender(targetElement, isSsr);

// webpack
if (module.hot !== undefined) {
    module.hot.accept(
        (err) => {
            if (err) {
                console.error('Cannot apply HMR update.', err);
            }
        },
        () => startupObj.clientUpdateRender(targetElement),
    );
}
