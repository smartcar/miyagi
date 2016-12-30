'use strict';

module.exports = {
  'extends': 'smartcar',
  'env': {
    'node': false,
    'browser': true,
  },
  'globals': {
    'Polymer': false,
    'page': false,
  },
  'plugins': [
    'eslint-plugin-script-tags'
  ],
};
