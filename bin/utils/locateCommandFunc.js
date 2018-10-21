function locateCommandFunc(commands, arg, ...argsRest) {
    if (arg === undefined) {
        return {
            error: `No command specified, valid commands are: ${commands.join(', ')}`,
            func: null,
        };
    }

    if (commands.indexOf(arg) === -1) {
        return {
            error: `'${arg}' is not a valid command.`,
            func: null,
        };
    }

    const command = arg.replace(':', '-');
    const commandFunc = require(`../scripts/${command}`);

    return {
        error: null,
        func: commandFunc,
        args: argsRest,
    };
}

module.exports = locateCommandFunc;
