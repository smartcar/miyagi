'use strict';

const eslintDefaults = require('./lint-config/eslint.js');
const csslintDefaults = require('./lint-config/stylelint.js');
const htmllintDefaults = require('./lint-config/htmllint.js');
const polymerlintDefaults = require('./lint-config/polymerlint.js');

const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const eslint = require('eslint');
const CLIEngine = require('eslint').CLIEngine;

const $ = require('gulp-load-plugins')();
$.polymerLint = require('polymer-lint/gulp');
$.eslintFix = require('./lib/plugins').eslintFix;
$.inject = require('./lib/plugins').inject;
$.extract = require('./lib/plugins').extract;

const transformObject = function(defaults, config) {
  var iterator = function(key) {
    return config[key];
  };

  var enabled = _.union(defaults, _.filter(_.keys(config), iterator));
  return _.difference(enabled, _.reject(_.keys(config), iterator));

};

const jslint = function(target, config) {
  var args = _.assign({
    configFile: path.join(__dirname, 'lint-config/eslint.js'),
  }, config);

  return function() {

    return gulp.src(target)
      .pipe($.eslint(args))
      .pipe($.eslint.formatEach());

  };

};

const jslintFix = function(target, config, dest) {
  var args = _.assign({
    configFile: path.join(__dirname, 'lint-config/eslint.js'),
  }, config);

  args.plugins = [];
  args.fix = true;

  return function() {

    return gulp.src(target)
      .pipe($.eslintFix(args))
      .pipe(gulp.dest(dest));

  };

};

const csslint = function(target, config, dest) {
  var args = _.assign(csslintDefaults, config);

  return function() {

    return gulp.src(target)
      .pipe($.extract('style'))
      .pipe($.stylelint({
        config: args,
        reporters: [{formatter: 'string', console: true}],
      }));

  };

};

const polymerlint = function(target, config) {
  var args = transformObject(polymerlintDefaults, config);

  return function() {

    return gulp.src(target)
      .pipe($.polymerLint({
        rules: args,
      }))
      .pipe($.polymerLint.report());

  };

};

const htmllint = function(target, config) {
  var args = _.assign(htmllintDefaults, config);

  return function() {

    return gulp.src(target)
      .pipe($.htmlLint({
        rules: args,
      }))
      .pipe($.htmlLint.formatEach());

  };

};

module.exports = {jslint, jslintFix, csslint, polymerlint, htmllint};
