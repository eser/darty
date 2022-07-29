const shellSpawn = require("../shellSpawn");
const path = require("path");

function start() {
  const serverJsPath = path.resolve(__dirname, "../server.js");

  shellSpawn("node", [serverJsPath]);
}

module.exports = start;
