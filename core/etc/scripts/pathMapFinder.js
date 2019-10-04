const fs = require('fs');

function pathMapFinder(set) {
    for (const key in set) {
        if (fs.existsSync(key)) {
            return set[key];
        }
    }

    return null;
}

module.exports = pathMapFinder;
