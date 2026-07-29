const a11y = require('eslint-plugin-jsx-a11y');
const globals = require('globals');
const js = require('@eslint/js');
const reactRefresh = require('eslint-plugin-react-refresh');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    // Generated / federated types — not hand-written source
    ignores: [
      '**/node_modules/**',
      '**/Types/**',
      '**/@mf-types/**',
      '**/build/**',
      '**/.Caches/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': a11y,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
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
];
