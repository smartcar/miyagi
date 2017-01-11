'use strict';

const moduleDirectory = __dirname;

const plugin = require('../lib/plugins');
const nock = require('./fixtures');
const gulp = require('gulp');
const test = require('ava');
const path = require('path');

const helpers = require('./helpers/test-helpers');
const check = helpers.check;
const end = helpers.end;

test.cb('replace invokes modifier with tag content', function(t) {
  const modifier = function(content) {
    t.is(content, nock.originalScript);
  };

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(plugin.replace('script', modifier))
    .pipe(end(t.end));

});

test.cb('replace modifies files', function(t) {
  const modifier = function(content) {
    t.is(content, nock.originalScript);
    return nock.modifiedScript;
  }

  const verify = function(file) {
    t.is(file, nock.modifiedHTML);
  };

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(plugin.replace('script', modifier))
    .pipe(check(verify))
    .pipe(end(t.end));

});

test.cb('replace will match the entire file when a tag name is not provided', function(t) {
  const modifier = function(content) {
    t.is(content, nock.originalHTML);
    return nock.modifiedHTML;
  };

  const verify = function(file) {
    t.is(file, nock.modifiedHTML);
  };

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(plugin.replace(null, modifier))
    .pipe(check(verify))
    .pipe(end(t.end));

});
