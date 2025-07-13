import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const domGlobals = {
  window: 'readonly',
  document: 'readonly',
  HTMLElement: 'readonly',
  HTMLButtonElement: 'readonly',
  // Add more DOM globals as needed
  console: 'readonly',
  setTimeout: 'readonly',
};

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...domGlobals,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'public/',
      '*.min.js',
    ],
  },
]; 