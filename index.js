'use strict';

const moduleDirectory = __dirname;

var csslintDefaults = require('./lint-config/csslint.js');
var htmllintDefaults = require('./lint-config/htmllint.js');
var polymerlintDefaults = require('./lint-config/polymerlint.js');

var _ = require('lodash');
var gulp = require('gulp');
var path = require('path');

var $ = require('gulp-load-plugins')();
$.polymerLint = require('polymer-lint/gulp');

var transformObject = function(defaults, config) {
  var args = _.reduce(config, function(args, value, key) {
    return value ? _.concat(args, key) : _.without(args, key);
  }, defaults);

  return _.uniq(args);

};

module.exports = {

  eslint: function(target, config) {
    var args = _.assign({
      configFile: path.join(moduleDirectory, 'lint-config/eslint.js'),
    }, config);

    return function() {

      return gulp.src(target)
        .pipe($.eslint(args))
        .pipe($.eslint.format());

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
