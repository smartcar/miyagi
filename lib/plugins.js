'use strict';

const PluginError = require('gulp-util').PluginError;
const CLIEngine = require('eslint').CLIEngine;
const through = require('through2');
const util = require('./util');
const path = require('path');
const _ = require('lodash');

const replace = function(tagName, fn) {
  const regex = util.createTagRegex(tagName);
  const contentModifier = util.wrapModifier(fn);

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(modifier.name, 'Streams are not supported'));
      return cb();
    }

    if (file.isBuffer()) {
      const modified = _.replace(String(file.contents), regex, contentModifier);

      file.contents = new Buffer(modified);
      return cb(null, file);
    }
  });

};

const pull = function(tagName) {
  const regex = util.createTagRegex(tagName);

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(modifier.name, 'Streams are not supported'));
      return cb();
    }

    if (file.isBuffer()) {
      const tagContent = util.returnTagContent(String(file.contents), regex);

      _.forEach(tagContent, (content, index) => {
        const newFile = file.clone();

        newFile.contents = new Buffer(content);
        newFile.path = `${file.path}_${tagName}_${index}`;
        this.push(newFile);
      });

      cb();
    }
  });

};

module.exports = {replace, pull};
