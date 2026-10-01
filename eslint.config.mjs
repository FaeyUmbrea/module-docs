import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', 'build/**', '.astro/**', '.docusaurus/**', 'submodules/**', 'releases/**', 'docs/**', 'obs-utils_versioned_docs/**', 'types/**'] },
  js.configs.recommended,
  { files: ['public/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.mjs'], languageOptions: { globals: { ...globals.node } } },
];
