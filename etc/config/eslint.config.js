const variables = require('../../src/variables');
// const { variables } = require('darty');

const { manifest } = variables();

module.exports = {
    'extends': (manifest.linter && manifest.linter.extends) || [],
    'env': {
        'commonjs': true,
        'browser': true,
        'jest': true,
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': (manifest.features && manifest.features.jsx) || true,
        },
    },
    'rules': (manifest.linter && manifest.linter.rules) || {},
};
