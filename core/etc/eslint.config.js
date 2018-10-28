const varsConstructor = require('./varsConstructor');

const vars = varsConstructor();

module.exports = {
    "extends": (vars.linter.extends || []),
    "env": {
        "commonjs": true,
        "browser": true,
        "jest": true,
    },
    "parser": "typescript-eslint-parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": (vars.features && vars.features.jsx),
        },
    },
    "rules": (vars.linter.rules || {}),
};
