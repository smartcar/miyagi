const PluginError = require('gulp-util').PluginError;
const CLIEngine = require('eslint').CLIEngine;
const through = require('through2');
const path = require('path');
const _ = require('lodash');


const moduleDirectory = __dirname;

module.exports = {

  eslintFix: function(args) {
    const scriptRegexp = /(<script[\s\S]*?>)([\s\S]*?)<\/\s*?script>/g;
    const tagRegex = /<\/?script[^>]*>/g;
    const linter = new CLIEngine(args);

    return through.obj(function(file, enc, cb) {
      var fileString = String(file.contents);

      if (file.isBuffer()) {

        var fixed = _.replace(fileString, scriptRegexp, function(script) {
          var tags = script.match(tagRegex);
          var js = script.replace(tagRegex, '');

          if (js) {
            return tags[0] + linter.executeOnText(js).results[0].output + tags[1];
          } else {
            return script;
          }

        });

        file.contents = new Buffer(fixed);

        this.push(file);
        return cb(null, file);
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported'));
        return cb();
      }

    });

  },

};
