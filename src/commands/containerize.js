const path = require("path");
const fs = require("fs");
const log = require("../log");

const colors = require("colors/safe");

function copyFile(sourceFile, targetFile) {
  const fileContents = fs.readFileSync(sourceFile);

  fs.writeFileSync(targetFile, fileContents);
}

function copyFileIfNeeded(filename) {
  if (fs.existsSync(filename)) {
    return;
  }

  const defaultFilePath = path.resolve(
    __dirname,
    "../../etc/containerization/",
    filename,
  );

  copyFile(defaultFilePath, filename);
}

function containerize() { // imageName
  /*
    if (imageName === undefined) {
        console.error(`${colors.red('specify a image name to create docker container.')}

${colors.white('example:')} 'npm run containerize darty-app'
`);

        process.exit(1);
        return;
    }

    let [ imageName_, imageTag ] = imageName.split(':');

    if (imageTag === undefined) {
        imageTag = 'latest';
    }
    */

  copyFileIfNeeded("./Dockerfile");
  copyFileIfNeeded("./docker-compose.yml");
  copyFileIfNeeded("./.dockerignore");

  const appName = path.basename(process.cwd());

  // log(`docker build -t ${imageName}:${imageTag} -f - . < ${dockerFilePath}`);
  log(`----------------------------------------
Docker Containerization files are created.

${colors.yellow("if you prefer using docker-compose:")}
- use '${colors.white("docker-compose up")}' command to run your app in docker

${colors.yellow("if you prefer using docker directly:")}
- first run '${
    colors.white(`docker build . -t ${appName}`)
  }' to build your docker app's image
- then '${
    colors.white(`docker run --rm -it ${appName}`)
  }' to run your app in docker
`);
}

module.exports = containerize;
