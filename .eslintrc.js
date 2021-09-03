module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
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
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "format": ["camelCase"]
            },
            {
                "selector": "variable",
                "format": ["camelCase", "PascalCase", "UPPER_CASE"]
            },
            {
                "selector": "parameter",
                "format": ["camelCase"],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "typeLike",
                "format": ["PascalCase"]
            }
        ],
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
        "object-curly-spacing": [ "error", "always" ],
        "quotes": [ "error", "double" ],
        "react/jsx-curly-spacing": [ 2, { "when": "always", "children": true }],
        "react/prop-types": "off",
        "semi": [ "error", "always" ],
        "space-infix-ops": [ "error" ],
        "template-curly-spacing": [ "error", "always" ]
    }
};
