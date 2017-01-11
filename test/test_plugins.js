'use strict';

const moduleDirectory = __dirname;

const {check, end} = require('./helpers/test_helpers');
const plugin = require('../lib/plugins');
const mock = require('./fixtures');
const gulp = require('gulp');
const test = require('ava');
const path = require('path');

test.cb('replace invokes modifier with tag content', function(t) {
  const modifier = function(content) {
    t.is(content, mock.originalScript);
  };

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(plugin.replace('script', modifier))
    .pipe(end(t.end));

});

test.cb('replace modifies files', function(t) {
  const modifier = function(content) {
    t.is(content, mock.originalScript);
    return mock.modifiedScript;
  }

  const verify = function(file) {
    t.is(file, mock.modifiedHTML);
  };

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(plugin.replace('script', modifier))
    .pipe(check(verify))
    .pipe(end(t.end));

});
