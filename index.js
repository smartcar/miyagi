'use strict';

const eslintDefaults = require('./lint-config/eslint.js');
const csslintDefaults = require('./lint-config/stylelint.js');
const htmllintDefaults = require('./lint-config/htmllint.js');
const stylefmtDefaults = require('./lint-config/stylefmt.js');
const polymerlintDefaults = require('./lint-config/polymerlint.js');

const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const eslint = require('eslint');
const postcss = require('postcss');
const stylefmt = require('stylefmt');
const CLIEngine = require('eslint').CLIEngine;
const deasync = require('deasync');

const $ = require('gulp-load-plugins')();
$.polymerLint = require('polymer-lint/gulp');
$.inject = require('./lib/plugins').inject;
$.extract = require('./lib/plugins').extract;

const transformObject = function(defaults, config) {
  var iterator = function(key) {
    return config[key];
  };

  var enabled = _.union(defaults, _.filter(_.keys(config), iterator));
  return _.difference(enabled, _.reject(_.keys(config), iterator));

};

const scriptlint = function(target, config) {
  var args = _.assign({
    configFile: path.join(__dirname, 'lint-config/eslint.js'),
  }, config);

  return function() {

    return gulp.src(target)
      .pipe($.eslint(args))
      .pipe($.eslint.formatEach());

  };

};

const scriptlintFix = function(target, config) {
  var args = _.assign({
    configFile: path.join(__dirname, 'lint-config/eslint.js'),
  }, config);

  args.plugins = [];
  args.fix = true;


  const modifier = function(script) {
    var linter = new CLIEngine(args);
    /* 
    * eslint removes trailing whitespace by default. This can cause problems with
    * tag spacing. This issue is solved by re-inserting whitespace
    * once linting is complete.
    */
    const whitespace = script.match(/[\r\n\t ]+$/)[0];

    return linter.executeOnText(script).results[0].output + whitespace || script;
  };

  return function() {

    return gulp.src(target)
      .pipe($.inject('script', modifier));

  };

};

const csslint = function(target, config) {
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

const csslintFix = function(target, config, dest) {
  var args = _.assign(stylefmtDefaults, config);

  const modifier = function(css) {

    const p = postcss([stylefmt(args)])
      .process(css)
      .then(function(res) {
        css = res.css;
      });

    deasync.loopWhile(function() {
      console.log(p);
      return p.isPending();
    })

    return css;
  };

  return function() {

    return gulp.src(target)
      .pipe($.inject('style', modifier));

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

module.exports = {
  scriptlint, 
  scriptlintFix, 
  csslint, 
  csslintFix, 
  polymerlint, 
  htmllint
};
