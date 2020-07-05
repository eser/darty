import startup from '~/startup';

function startupExecutor(startupArgs: { [key: string]: any }): any {
    // startup object
    let startupObj;

    if (startup.constructor === Function) {
        startupObj = new startup(startupArgs);
    }
    else {
        startupObj = startup;
    }

    return startupObj;
}

export {
    startupExecutor as default,
};
