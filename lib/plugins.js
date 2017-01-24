'use strict';

const PluginError = require('gulp-util').PluginError;
const through = require('through2');
const util = require('./util');
const path = require('path');
const _ = require('lodash');

/**
 * A function responsible for modifying content in some way
 *
 * @callback modifier
 * @param {string} the content of a tag
 *
 * @returns {string} the modified tag content
 */

/**
 * A gulp plugin for modifying the content of html tags
 * 
 * @param {string} tagName the type of tag to modify
 * @param {modifier} fn a function for modifying tag content
 *
 * @returns {stream} a file stream
 */
const inject = function(tagName, fn) {
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

      file.contents = Buffer.from(modified, 'utf8');
      return cb(null, file);
    }
  });

};

/**
 * A gulp plugin for extracting the content of html tags
 * and passing them into new streams
 * 
 * @param {string} tagName the type of tag to extract
 *
 * @returns {stream} a file stream
 */
const extract = function(tagName) {
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

        newFile.contents = Buffer.from(content, 'utf8');
        newFile.path = `${file.path}_${tagName}_${index}`;
        this.push(newFile);
      });

      cb();
    }
  });

};

module.exports = {inject, extract};
