'use strict';

const moduleDirectory = __dirname;

var eslintDefaults = require('./lint-config/eslint.js');
var csslintDefaults = require('./lint-config/csslint.js');
var htmllintDefaults = require('./lint-config/htmllint.js');
var polymerlintDefaults = require('./lint-config/polymerlint.js');

var _ = require('lodash');
var gulp = require('gulp');
var path = require('path');
var eslint = require('eslint');

var $ = require('gulp-load-plugins')();
$.polymerLint = require('polymer-lint/gulp');
$.eslintFix = require('./lib/plugins').eslintFix;

var transformObject = function(defaults, config) {
  var iterator = function(key) {
    return config[key];
  };

  var enabled = _.union(defaults, _.filter(_.keys(config), iterator));
  return _.difference(enabled, _.reject(_.keys(config), iterator));

};

module.exports = {

  eslint: function(target, config) {
    var args = _.assign({
      configFile: path.join(moduleDirectory, 'lint-config/eslint.js'),
    }, config);

    return function() {

      return gulp.src(target)
        .pipe($.eslint(args))
        .pipe($.eslint.formatEach());

    };

  },

  eslintFix: function(target, config, dest) {
    var args = _.assign({
      configFile: path.join(moduleDirectory, 'lint-config/eslint.js'),
    }, config);

    args.plugins = [];
    args.fix = true;

    return function() {

      return gulp.src(target)
        .pipe($.eslintFix(args))
        .pipe(gulp.dest(dest));

    };

  },

  csslint: function(target, config) {
    var args = _.assign(csslintDefaults, config);

    return function() {

      return gulp.src(target)
        .pipe($.htmlExtract({
          sel: 'style',
        }))
        .pipe($.csslintLatest(args))
        .pipe($.csslintLatest.reporter());

    };

  },

  polymerlint: function(target, config) {
    var args = transformObject(polymerlintDefaults, config);

    return function() {

      return gulp.src(target)
        .pipe($.polymerLint({
          rules: args,
        }))
        .pipe($.polymerLint.report());

    };

  },

  htmllint: function(target, config) {
    var args = _.assign(htmllintDefaults, config);

    return function() {

      return gulp.src(target)
        .pipe($.htmlLint({
          rules: args,
        }))
        .pipe($.htmlLint.formatEach());

    };

  },

};
