module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "array-bracket-spacing": [ "error", "always", {
            "objectsInArrays": false,
            "arraysInArrays": false
        }],
        "curly": [ "error", "all" ],
        "eol-last": [ "error", "always" ],
        "indent": [ "error", 4 ],
        "linebreak-style": [ "error", "unix" ],
        "max-len": [ "warn", {
            "code": 150,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "quotes": [ "error", "double" ],
        "react/jsx-curly-spacing": [2, {"when": "always"}],
        "semi": [ "error", "always" ],
        "space-infix-ops": [ "error" ],
        "template-curly-spacing": ["error", "always"]
    }
};
