'use strict';

const moduleDirectory = __dirname;

const plugin = require('../lib/plugins');
const nock = require('./fixtures');
const gulp = require('gulp');
const test = require('ava');
const path = require('path');

test('replace invokes modifier with tag content', function(t) {
  t.plan(2);

  const buff = new Buffer(nock.originalHTML);

  const modifier = function(content) {
    t.is(content, nock.originalScript);
    return content;
  };

  const cb = function(arg, file) {
    t.is(file.contents, buff);
  };
  // const nockPlugin = plugin.transform('script', modifier);
  // console.log(nockPlugin);

  gulp.src(path.join(moduleDirectory, 'fixtures/original.html'))
    .pipe(gulp.dest(path.join(moduleDirectory, 'result')));
    // .pipe(plugin.transform('script', modifier));
    // .pipe(console.log);
    // .pipe(nockPlugin);

});

// test('replace returns a modified buffer', function(t) {

// });

