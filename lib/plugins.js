'use strict';

const stringReplaceAsync = require('string-replace-async');
const PluginError = require('gulp-util').PluginError;
const Promise = require('bluebird');
const through = require('through2');
const util = require('./util');
const _ = require('lodash');

/**
 * A function responsible for modifying content in some way
 *
 * @callback modifier
 * @param {String} the content of a tag
 *
 * @returns {String} the modified tag content
 */

/**
 * A gulp plugin for modifying the content of html tags
 *
 * @param {String} tagName the type of tag to modify
 * @param {Modifier} fn a function for modifying tag content
 *
 * @returns {Stream} a file stream
 */
const inject = function(tagName, fn) {
  const regex = util.createTagRegex(tagName);
  var contentModifier;

  if (fn.length === 2) {
    contentModifier = util.wrapModifier(Promise.promisify(fn));
  } else {
    contentModifier = util.wrapModifier(Promise.method(fn));
  }

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(
        contentModifier.name,
        'Streams not supported'
      ));
      return cb();
    }

    if (file.isBuffer()) {

      stringReplaceAsync(String(file.contents), regex, contentModifier)
        .then(function(result) {
          file.contents = Buffer.from(result, 'utf8');
          cb(null, file);
        });

    }
  });

};

/**
 * A gulp plugin for extracting the content of html tags
 * and passing them into new streams
 *
 * @param {String} tagName the type of tag to extract
 *
 * @returns {Stream} a file stream
 */
const extract = function(tagName) {
  const regex = util.createTagRegex(tagName);

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(
        file.path,
        'Streams are not supported'
      ));
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

      return cb();
    }
  });

};

module.exports = {inject, extract};
