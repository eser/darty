const shellSpawn = require('../utils/shellSpawn');
const path = require('path');

function start() {
    const serverJsPath = path.resolve(__dirname, '../../core/server.js');

    shellSpawn('node', [ serverJsPath ]);
}

module.exports = start;
