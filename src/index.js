const locateCommandFunc = require('./locateCommandFunc');

const commands = [
    'bundle',
    'bundle:prod',
    'containerize',
    'dev',
    'extract',
    'help',
    'lint',
    'lint:fix',
    'start',
    'test',
    'test:coverage',
];

function main(args) {
    const commandFunc = locateCommandFunc(commands, ...args);

    if (commandFunc.error !== null) {
        // eslint-disable-next-line no-console
        console.error(commandFunc.error);

        return 1;
    }

    try {
        commandFunc.func(...commandFunc.args);
    }
    catch (ex) {
        // eslint-disable-next-line no-console
        console.error(ex);

        return 1;
    }

    return 0;
}

module.exports = main;
