const shellSpawn = require('../utils/shellSpawn');
const path = require('path');
const fs = require('fs');

const colors = require('colors/safe');

function copyFile(sourceFile, targetFile) {
    const fileContents = fs.readFileSync(sourceFile);

    fs.writeFileSync(targetFile, fileContents);
}

function containerize(imageName) {
//     if (imageName === undefined) {
//         console.error(`${colors.red('specify a image name to create docker container.')}

// ${colors.white('example:')} 'npm run containerize dart-app'
// `);

//         process.exit(1);
//         return;
//     }

    // let [ imageName_, imageTag ] = imageName.split(':');

    // if (imageTag === undefined) {
    //     imageTag = 'latest';
    // }

    const dockerfileFilePath = path.resolve(__dirname, '../../core/etc/Dockerfile');
    const dockerComposeFilePath = path.resolve(__dirname, '../../core/etc/docker-compose.yml');
    const dockerIgnoreFilePath = path.resolve(__dirname, '../../core/etc/.dockerignore');

    const appName = path.basename(process.cwd());

    copyFile(dockerfileFilePath, './Dockerfile');
    copyFile(dockerComposeFilePath, './docker-compose.yml');
    copyFile(dockerIgnoreFilePath, './.dockerignore');

    // console.log(`docker build -t ${imageName}:${imageTag} -f - . < ${dockerFilePath}`);
    console.log(`----------------------------------------
Docker Containerization files are created.

${colors.yellow('if you prefer using docker-compose:')}
- use '${colors.white('docker-compose up')}' command to run your app in docker

${colors.yellow('if you prefer using docker directly:')}
- first run '${colors.white('docker build . -t ' + appName)}' to build your docker app's image
- then '${colors.white('docker run --rm -it ' + appName)}' to run your app in docker
`);
}

module.exports = containerize;
