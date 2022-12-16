const { defineConfig } = require('eslint-define-config');

process.env.ESLINT_TSCONFIG = 'tsconfig.json';

module.exports = defineConfig({
  root: true,
  extends: ['@antfu', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: '**/*.cjs',
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
});
