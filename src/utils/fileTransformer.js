const path = require('path');

// eslint-disable-next-line no-unused-vars
function process(src, filename, config, options) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
}

module.exports = {
    process,
};
