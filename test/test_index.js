const {check, end} = require('./helpers/test_helpers');
const {scriptlintFix, csslintFix} = require('../index.js');
const mock = require('./fixtures');
const path = require('path');
const gulp = require('gulp');
const test = require('ava');

test.cb('scriptlintFix applies changes to javascript', function(t) {
  const verify = function(file) {
    t.is(file, mock.lintedScript);
  };

  scriptlintFix(path.join(__dirname, './fixtures/unlinted-script.html'))()
    .pipe(check(verify))
    .pipe(end(t.end));

});

test.only.cb('csslintFix applies changes to css', function(t) {
  const verify = function(file) {
    console.log(file);
    t.is(file, mock.lintedStyle);
  };

  csslintFix(path.join(__dirname, './fixtures/unlinted-style.html'))()
    .pipe(check(verify))
    .pipe(end(t.end));

});
