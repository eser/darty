const shellSpawn = require('../utils/shellSpawn');
const path = require('path');
const rimraf = require('rimraf');

const baseRepo = 'https://github.com/eserozvataf/dart-app';

function create(folder) {
    if (folder === undefined) {
        console.error(`specify a directory to create project files.\n\nexample: 'npx dart create app'\n`);

        process.exit(1);
        return;
    }

    const target = path.resolve(process.cwd(), folder);

    shellSpawn('git', [ 'clone', '--depth=1', '--branch=master', baseRepo, target ]);
    rimraf.sync(`${target}/.git`);
    shellSpawn('npm', [ 'install', target ]);
}

module.exports = create;
