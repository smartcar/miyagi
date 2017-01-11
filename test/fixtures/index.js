var path = require('path');
var fs = require('fs');

module.exports = {
  originalHTML: fs.readFileSync(path.join(__dirname, 'original.html'), 'utf8'),
  modifiedHTML: fs.readFileSync(path.join(__dirname, 'modified.html'), 'utf8'),
  originalScript: fs.readFileSync(path.join(__dirname, 'original-script.js'), 'utf8'),
};
