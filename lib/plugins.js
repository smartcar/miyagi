'use strict';

const PluginError = require('gulp-util').PluginError;
const CLIEngine = require('eslint').CLIEngine;
const through = require('through2');
const util = require('./util');
const path = require('path');
const _ = require('lodash');

module.exports = {

  replace: function(tagName, modifier) {
    var regex = util.createTagRegex(tagName);
    var modifyContent = util.modifyContent(modifier);

    return through.obj(function(file, enc, cb) {

      if (file.isNull()) {
        return cb(null, file);
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(modifier.name, 'Streams are not supported'));
        return cb();
      }

      if (file.isBuffer()) {
        var modified = _.replace(String(file.contents), regex, modifyContent);

        file.contents = new Buffer(modified);
        return cb(null, file);
      }
    });

  },

  eslintFix: function(args) {
    var linter = new CLIEngine(args);

    return this.replace('script', function(content) {
      return linter.executeOnText(content).results[0].output || content;
    });

  },

};
