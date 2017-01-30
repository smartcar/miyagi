'use strict';

const csslintDefaults = require('./stylelint.js');
const _ = require('lodash');

const stylefmt = {};

/* set a 'supportedRules' value to 'false' to disable
autofixes for a specific rule */
const supportedRules = {
  'at-rule-empty-line-before': true,
  'at-rule-semicolon-newline-after': true,
  'block-closing-brace-newline-after': true,
  'block-closing-brace-newline-before': true,
  'block-opening-brace-newline-after': true,
  'block-opening-brace-newline-before': true,
  'block-opening-brace-space-after': true,
  'block-opening-brace-space-before': true,
  'color-hex-case': false,
  'color-hex-length': true,
  'declaration-block-properties-order': true,
  'declaration-colon-space-after': true,
  'declaration-colon-space-before': true,
  indentation: true,
  'length-zero-no-unit': true,
  'number-leading-zero': true,
  'number-no-trailing-zeros': true,
  'selector-combinator-space-after': true,
  'selector-combinator-space-before': true,
  'selector-list-comma-newline-after': true,
  'selector-list-comma-newline-before': true,
  'selector-list-comma-space-after': true,
  'selector-list-comma-space-before': true,
  'shorthand-property-no-redundant-values': true,
  'string-quotes': true,
};

// If a rule is both featured in stylelint's config and set to 'true', add it to
// the configuration object for autofixing
stylefmt.rules = _.reduce(supportedRules, function(rules, value, key) {
  if (value && csslintDefaults.rules[key] !== undefined) {
    rules[key] = csslintDefaults.rules[key];
  }

  return rules;
}, {});

// incorporate other stylelint options before exporting
module.exports = _.assign(csslintDefaults, stylefmt);
