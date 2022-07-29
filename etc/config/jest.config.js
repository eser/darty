const variables = require("../../src/variables");
// const { variables } = require('darty');

const vars = variables();

const tsConfigPath = vars.pathFinder(
  "./tsconfig.json",
  `${vars.dartyRoot}/etc/config/tsconfig.json`,
);

// const presetManifest = {
// };

// TODO make this file case-insensitive

module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: tsConfigPath,
      warnOnly: true,
      diagnostics: {
        pathRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?)$",
        ignoreCodes: ["TS2691"],
      },
    },
  },
  // testEnvironment: 'node',
  roots: [
    "<rootDir>/src/",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
  ],
  moduleNameMapper: {
    "\\.(sa|sc|c|le)ss$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      `${__dirname}/fileTransformer.js`,
  },
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx,json}",
    "!**/node_modules/**",
    "!**/coverage/**",
  ],
};
