module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    env: {
        es2021: true,
        browser: true,
        mocha: true,
    },
    rules: {
        indent: 'off',
        camelcase: 'off',
        'max-len': ['error', {
            code: 150,
            comments: 140,
        }],
        'no-restricted-syntax': ['off', 'ForOfLoop'],
        // Too restrictive, writing ugly code to defend against
        // a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        'no-underscore-dangle': ['error', { enforceInMethodNames: false }],
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        'no-prototype-builtins': 'off',
        'import/prefer-default-export': 'off',
        // Allow most functions to rely on type inference. If the function is exported,
        // then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
        'import/no-default-export': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-restricted-globals': 'off',
        'no-use-before-define': 'off',
        'no-param-reassign': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'class-methods-use-this': 'off',
        'no-undef': 'off',
        'array-callback-return': 'off',
    },
};
