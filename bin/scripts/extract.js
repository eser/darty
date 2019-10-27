const path = require('path');
const fs = require('fs');
const pathFinder = require('../../core/etc/scripts/pathFinder');
const log = require('../utils/log');

const colors = require('colors/safe');

function copyFile(sourceFile, targetFile) {
    const fileContents = fs.readFileSync(sourceFile);

    fs.writeFileSync(targetFile, fileContents);
}

function extract(filename) {
    const sourceFilePath = pathFinder(path.resolve(__dirname, '../../core/etc/', filename));
    const targetFilePath = path.resolve('./', filename);

    if (sourceFilePath === null) {
        log(`${colors.yellow(filename)} does not exists.`);

        return;
    }

    copyFile(sourceFilePath, targetFilePath);

    log(`${colors.yellow(filename)} is extracted.`);
}

module.exports = extract;
