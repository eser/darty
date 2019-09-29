const path = require('path');

// const presetManifest = {
// };

module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: path.resolve(__dirname, 'tsconfig.json'),
        },
    },
    testEnvironment: 'node',
    roots: [
        '<rootDir>/src',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?|mjs)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'mjs',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(sa|sc|c|le)ss$': 'identity-obj-proxy',
    },
};
