const path = require('path');

// const presetManifest = {
// };

module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: path.resolve(__dirname, 'tsconfig.json'),
        },
    },
    testEnvironment: "node",
    roots: [
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?|mjs)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "mjs"
    ],
    moduleNameMapper: {
        "^.+\\.(css|s[ac]ss)$": "identity-obj-proxy"
    },
};
