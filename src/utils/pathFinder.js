const fs = require('fs');

function pathFinder(...set) {
    const result = set.find(file => fs.existsSync(file));

    if (result !== undefined) {
        return result;
    }

    return null;
}

module.exports = pathFinder;
