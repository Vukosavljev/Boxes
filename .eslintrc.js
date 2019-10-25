module.exports = {
    "extends": "",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "globals": {
        "fetch": false
    },
    "rules": {
        "semi": 2,
        "indent": [
            "tab"
        ],
        "jsx-a11y/anchor-is-valid": [
            "error",
            {
                "components": [
                    "Link"
                ],
                "specialLink": [
                    "hrefLeft",
                    "hrefRight"
                ],
                "aspects": [
                    "noHref",
                    "invalidHref",
                    "preferButton"
                ]
            }
        ],
        "react/jsx-indent": [
            "error",
            "tab"
        ],
        "react/jsx-indent-props": [
            "error",
            "tab"
        ],
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js",
                    ".jsx"
                ]
            }
        ],
        "import/no-unresolved": 0,
        "no-tabs": 0,
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "always-multiline",
                "exports": "always-multiline",
                "functions": "ignore"
            }
        ],
        "no-param-reassign": [
            2,
            {
                "props": false
            }
        ],
        "max-len": [
            "error",
            {
                "code": 200
            }
        ],
        "import/no-extraneous-dependencies": 0,
        "class-methods-use-this": 0
    }
};