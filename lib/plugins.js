'use strict';

const PluginError = require('gulp-util').PluginError;
const CLIEngine = require('eslint').CLIEngine;
const through = require('through2');
const util = require('./util');
const path = require('path');
const _ = require('lodash');

const replace = function(tagName, fn) {
  var regex = util.createTagRegex(tagName);
  var contentModifier = util.wrapModifier(fn);

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(modifier.name, 'Streams are not supported'));
      return cb();
    }

    if (file.isBuffer()) {
      var modified = _.replace(String(file.contents), regex, contentModifier);

      file.contents = new Buffer(modified);
      return cb(null, file);
    }
  });

};

module.exports = {replace};
