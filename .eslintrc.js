const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  globals: {
    cy: true,
    Cypress: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  ignorePatterns: ['.eslintrc.js', 'App/build'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': ['off', { maxDepth: 1, ignoreExternal: true }],
    'import/no-relative-packages': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        assert: 'either',
        depth: 3,
      },
    ],
    'no-await-in-loop': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'prefer-promise-reject-errors': 'off',
    'react/button-has-type': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],

    'import/extensions': [
      'error',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          json: 'always',
          jsx: 'never',
          mjs: 'never',
          tsx: 'never',
          scss: 'always',

          // Special Cases
          charging: 'always',
        },
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': ['off', { caseSensitive: true }],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['spec.ts', '*.spec.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'none',
            argsIgnorePattern: '^_',
            caughtErrors: 'none',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],

  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, './App')],
          ['^', path.resolve(__dirname)],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};
