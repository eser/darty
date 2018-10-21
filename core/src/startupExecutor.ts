import startup from '~/startup';

function startupExecutor(startupArgs: { [key: string]: any }): any {
    // appMapping
    let appMapping;

    if (startup.constructor === Function) {
        appMapping = startup(startupArgs);
    }
    else {
        appMapping = startup;
    }

    return {
        appMapping,
    };
}

export {
    startupExecutor as default,
};
