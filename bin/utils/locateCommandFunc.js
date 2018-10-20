function locateCommandFunc(commands, args) {
    if (args.length === 0) {
        return () => console.log(`No command specified, valid commands are: ${commands.join(', ')}`);
    }

    if (commands.indexOf(args[0]) === -1) {
        return () => console.log(`'${args[0]}' is not a valid command.`);
    }

    const command = args[0].replace(':', '-');

    const commandFunc = require(`../scripts/${command}`);

    return commandFunc;
}

module.exports = locateCommandFunc;
