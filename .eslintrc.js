module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [ "react" ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "indent": [ "error", 4 ],
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "double" ],
        "semi": [ "error", "always" ],
        "eol-last": [ "error", "always" ],
        "space-infix-ops": [ "error" ],
        "curly": [ "error", "all" ],
        "array-bracket-spacing": [ "error", "always", {
            "objectsInArrays": false,
            "arraysInArrays": false
        }],
        "max-len": [ "warn", {
            "code": 150,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }]
    }
};
