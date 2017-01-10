'use strict';

module.exports = {
  'extends': 'smartcar',
  'env': {
    'node': false,
    'browser': true,
  },
  'globals': {
    '_': false,
    'Polymer': false,
    'page': false,
  },
  'plugins': [
    'eslint-plugin-script-tags',
  ],
  'rules': {
    'strict': ['error', 'function'],
    'eol-last' :['error', 'never'],
    'no-console': ['error', {'allow': ['warn', 'error']}],
  }
};
