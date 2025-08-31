import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: { ...globals.node, ...globals.browser, ...globals.react },
    },
    ignores: ['src/client/index.js'],
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 0,
    },
    plugins: {
      ...react.configs.flat.recommended.plugins,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
