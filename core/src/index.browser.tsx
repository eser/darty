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

// react-dom
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';

// history
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

// execute startup
import AppStack from './appStack';
import startup from '~/startup';

const startupArgs = {
    history,
};

const appMapping = startup(startupArgs);

const appStack = new AppStack()
    .addRange(appMapping);

const root = appStack.wrapWith(
    children =>
    <Router history={history}>{children}</Router>
);

const targetElement = document.getElementsByTagName('app')[0];
if (targetElement.childNodes.length > 0) {
    ReactDOM.hydrate(root, targetElement);
}
else {
    ReactDOM.render(root, targetElement);
}

// webpack
if (module.hot !== undefined) {
    module.hot.accept(
        (err) => {
            if (err) {
                console.error('Cannot apply HMR update.', err);
            }
        },
        () => ReactDOM.hydrate(root, targetElement),
    );
}
