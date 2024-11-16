// @ts-check
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['eslint.config.mjs', '/*.js', 'node_modules', 'dist'],
  },
);