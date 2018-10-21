/* eslint-env node */

// polyfills
if (global.fetch === undefined) {
    global.fetch = require('node-fetch');
}

// react-dom
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

// startup
import AppStack from './appStack';
import startupExecutor from './startupExecutor';

// SSR rendering method
function ssrRenderer(appStack: AppStack, url, context = {}): string {
    const root = appStack.wrapWith(
        children =>
        // <StaticRouter location={req.originalUrl} context={context}>{children}</StaticRouter>
        React.createElement(
            StaticRouter,
            {
                location: url,
                context: context,
            },
            children
        )
    );

    const html = ReactDOMServer.renderToString(root);

    return html;
}

// execute startup
const startupArgs = {
    history: {},
};

const { appMapping } = startupExecutor(startupArgs);

// appStack
const appStack = new AppStack()
    .setStartupArgs(startupArgs)
    .addRange(appMapping);

const serverObjects = {
    appStack,
    ssrRenderer,
};

export {
    serverObjects as default,
};
