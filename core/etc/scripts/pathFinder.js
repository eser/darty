const fs = require('fs');

function pathFinder(...set) {
    for (const file of set) {
        if (fs.existsSync(file)) {
            return file;
        }
    }

    return null;
}

module.exports = pathFinder;
