'use strict';

const through = require('through2');

const check = function(fun) {

  return through.obj(function(file, enc, cb) {
    var args = String(file.contents);

    fun(args);
    cb(null, file);

  });

};

const end = function(testEnd) {

  return through.obj(function() {
    testEnd();
  });

};

module.exports = {check, end};
