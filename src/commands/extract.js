const path = require("path");
const fs = require("fs");
const glob = require("glob");
const log = require("../log");

const colors = require("colors/safe");

function copyFile(sourceFile, targetFile) {
  const fileContents = fs.readFileSync(sourceFile);

  fs.writeFileSync(targetFile, fileContents);
}

function extract(pattern) {
  const baseSourcePath = path.resolve(__dirname, "../../etc/config/");

  const globOptions = {
    cwd: baseSourcePath,
    dot: false,
    nosort: true,
    nonull: false,
  };

  const globResult = glob.sync(pattern, globOptions);

  if (globResult.length === 0) {
    log(`${colors.yellow(pattern)} does not exists.`);

    return;
  }

  globResult.forEach((filename) => {
    const sourceFilePath = `${baseSourcePath}/${filename}`;
    const targetFilePath = `./${filename}`;

    copyFile(sourceFilePath, targetFilePath);

    log(`${colors.yellow(filename)} is extracted.`);
  });
}

module.exports = extract;
