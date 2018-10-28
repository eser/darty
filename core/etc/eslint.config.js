const presetManifest = {
    extends: "eser-react",
    jsx: true,
    rules: {
        "jsx-a11y/href-no-hash": 0,
    }
};

module.exports = {
    "extends": [
        presetManifest.extends,
    ],
    "env": {
        "commonjs": true,
        "browser": true,
        "jest": true,
    },
    "parser": "typescript-eslint-parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": presetManifest.jsx,
        },
    },
    "rules": {
        ...presetManifest.rules,
    },
};
