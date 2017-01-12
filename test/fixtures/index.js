'use strict';

const path = require('path');
const fs = require('fs');

const originalHTML = fs.readFileSync(path.join(__dirname, 'original.html'), 'utf8');
const modifiedHTML = fs.readFileSync(path.join(__dirname, 'modified.html'), 'utf8');
const originalScript = fs.readFileSync(path.join(__dirname, 'original-script.js'), 'utf8');
const modifiedScript = fs.readFileSync(path.join(__dirname, 'modified-script.js'), 'utf8');

module.exports = {originalHTML, modifiedHTML, originalScript, modifiedScript};
