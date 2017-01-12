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

test.cb('pull pipes tag content to the next plugin', function(t) {
  const verify = function(file) {
    t.is(file, mock.originalScript);
  };

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(plugin.pull('script'))
    .pipe(check(verify))
    .pipe(end(t.end));

});

test.cb('pull will create a new stream for every matching tag pair', function(t) {
  var completedStreams = 0;

  const verify = function(file) {
    completedStreams++;

    if (file !== mock.originalScript) {
      t.is(file, mock.modifiedScript);
    }

    if (completedStreams === 2) {
      t.end();
    }
  };

  t.plan(1);

  /*
  * The 'multiple-match.html' file contains two 'script' tags.
  * When passed into 'pull', it will be split into two separate
  * streams. One will be identical to 'original-script.js'. The
  * other will match 'modified-script.js'
  */
  gulp.src(path.join(moduleDirectory, 'fixtures/multiple-match.html'))
    .pipe(plugin.pull('script'))
    .pipe(check(verify));

});
