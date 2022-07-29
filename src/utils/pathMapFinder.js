const fs = require("fs");

function pathMapFinder(set) {
  const result = Object.keys(set).find((key) => fs.existsSync(key));

  if (result !== undefined) {
    return set[result];
  }

  return null;
}

module.exports = pathMapFinder;
