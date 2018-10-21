import { createBrowserHistory } from 'history';
import AppStack from './appStack';
import startup from '~/startup';

// create history
const history = createBrowserHistory();

const startupArgs = {
    history,
};

// appMapping
let appMapping;

if (startup.constructor === Function) {
    appMapping = startup(startupArgs);
}
else {
    appMapping = startup;
}

// appStack
const appStack = new AppStack()
    .setStartupArgs(startupArgs)
    .addRange(appMapping);

export {
    appStack,
    startupArgs,
};
