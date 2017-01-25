'use strict';

const path = require('path');
const fs = require('fs');

const originalHTML = fs.readFileSync(path.join(__dirname, 'original.html'), 'utf8');
const modifiedHTML = fs.readFileSync(path.join(__dirname, 'modified.html'), 'utf8');
const originalScript = fs.readFileSync(path.join(__dirname, 'original-script.js'), 'utf8');
const modifiedScript = fs.readFileSync(path.join(__dirname, 'modified-script.js'), 'utf8');
const multipleMatchHTML = fs.readFileSync(path.join(__dirname, 'multiple-match.html'), 'utf8');
const unlintedScript = fs.readFileSync(path.join(__dirname, 'unlinted-script.html'), 'utf8');
const lintedScript = fs.readFileSync(path.join(__dirname, 'linted-script.html'), 'utf8');
const unlintedStyle = fs.readFileSync(path.join(__dirname, 'unlinted-style.html'), 'utf8');
const lintedStyle = fs.readFileSync(path.join(__dirname, 'linted-style.html'), 'utf8');

module.exports = {
  originalHTML, 
  modifiedHTML, 
  originalScript, 
  modifiedScript,
  unlintedScript,
  lintedScript,
  unlintedStyle,
  lintedStyle,
};
