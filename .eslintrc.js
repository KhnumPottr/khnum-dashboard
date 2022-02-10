module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true, // Defines things like process.env when generating through node
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jest/recommended",
        "plugin:testing-library/react",
    ],
    parser: "@babel/eslint-parser", // Uses babel-eslint transforms.
    parserOptions: {
        babelOptions: {
            presets: ["@babel/preset-react"],
        },
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    plugins: [
        "import", // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
        "prettier",
    ],
    root: true, // For configuration cascading.
    rules: {
        "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
        indent: ["error", 4],
        quotes: ["warn", "double"],
        "max-len": [
            "warn",
            {
                code: 120,
            },
        ],
        "no-console": "warn",
    },
    settings: {
        react: {
            version: "detect", // Detect react version
        },
    },
}
