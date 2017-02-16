'use strict';

module.exports = {
  extends: 'smartcar',
  env: {
    node: false,
    browser: true,
  },
  globals: {
    _: false,
    Polymer: false,
    page: false,
  },
  plugins: [
    'eslint-plugin-script-tags',
  ],
  rules: {
    strict: ['error', 'function'],
    'eol-last': ['error', 'never'],
    'no-console': ['error', {allow: ['warn', 'error']}],
    'max-len': ['warn', {
      code: 100,
      comments: 120,
      ignoreUrls: true,
    }],
  },
};
