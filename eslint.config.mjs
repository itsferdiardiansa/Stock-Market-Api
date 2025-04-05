import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['src/**/*.ts'],
    plugins: {
      ts,
      prettier,
    },
    extends: [prettierConfig],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-useless-escape': 'off',
      'callback-return': ['error', ['done', 'proceed', 'next', 'onwards', 'callback', 'cb']],
      camelcase: [
        'warn',
        {
          properties: 'always',
        },
      ],
      'comma-style': ['warn', 'last'],
      curly: ['error'],
      eqeqeq: ['error', 'always'],
      'no-undef': 2,
      'handle-callback-err': ['error'],
      'arrow-body-style': ['off', 2],
      indent: ['off', 2],
      'linebreak-style': ['error', 'unix'],
      'no-dupe-keys': ['error'],
      'no-duplicate-case': ['error'],
      'no-labels': ['error'],
      'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
      'no-redeclare': ['warn'],
      'no-return-assign': ['error', 'always'],
      'no-sequences': ['error'],
      'no-trailing-spaces': ['warn'],
      'no-unexpected-multiline': ['warn'],
      'no-unreachable': ['warn'],
      'no-magic-numbers': ['off'],
      'max-params': ['off'],
      'max-len': ['off'],
      'max-nested-callbacks': ['off'],
      'new-cap': ['off'],
      'consistent-this': ['error', 'that'],
      'no-unused-vars': [
        'error',
        {
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^unused($|[A-Z].*$)',
        },
      ],
      'no-use-before-define': [
        'error',
        {
          functions: false,
        },
      ],
      'no-var': 2,
      'one-var': ['warn', 'never'],
      'prefer-arrow-callback': [
        'warn',
        {
          allowNamedFunctions: true,
        },
      ],
      'semi-spacing': [
        'warn',
        {
          before: false,
          after: true,
        },
      ],
      'semi-style': ['warn', 'last'],
      'space-before-function-paren': ['off', 2],
    },
  },
])
