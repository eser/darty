const pathFinder = require('../etc/scripts/pathFinder');

const tsConfigPath = pathFinder(`./tsconfig.json`, `${__dirname}/tsconfig.json`); // `${vars.dartyRoot}/core/etc/tsconfig.json`

// const presetManifest = {
// };

// TODO make this file case-insensitive

module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: tsConfigPath,
            warnOnly: true,
            diagnostics: {
                pathRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?)$',
            },
        },
    },
    testEnvironment: 'node',
    roots: [
        '<rootDir>/src',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(sa|sc|c|le)ss$': 'identity-obj-proxy',
    },
};
