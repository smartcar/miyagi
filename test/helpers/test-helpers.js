const through = require('through2');

module.exports = {

  check: function(fun) {

    return through.obj(function(file, enc, cb) {
      var args = String(file.contents);

      fun(args);
      cb(null, file);

    });

  },

  end: function(testEnd) {

    return through.obj(function(file, enc, cb) {
      testEnd();
    });

  },

};
