'use strict';

const PluginError = require('gulp-util').PluginError;
const CLIEngine = require('eslint').CLIEngine;
const through = require('through2');
const path = require('path');
const _ = require('lodash');

const scriptRegex = /(<script[\s\S]*?>)([\s\S]*?)<\/\s*?script>/g;
const tagRegex = /<\/?script[^>]*>/g;

module.exports = {

  eslintFix: function(args) {
    const linter = new CLIEngine(args);

    return through.obj(function(file, enc, cb) {

      if (file.isNull()) {
        return cb(null, file);
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported'));
        return cb();
      }

      if (file.isBuffer()) {

        var fixed = _.replace(String(file.contents), scriptRegex, function(script) {
          var tags = script.match(tagRegex);
          var js = script.replace(tagRegex, '');

          if (js) {
            js = linter.executeOnText(js).results[0].output || js;
            return tags[0] + js + '  ' + tags[1];
          } else {
            return script;
          }

        });

        file.contents = new Buffer(fixed);

        return cb(null, file);
      }


    });

  },

};
