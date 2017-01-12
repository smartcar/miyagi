'use strict';

const createTagRegex = function(tagName) {
  return new RegExp(`(<${tagName}[\\s\\S]*?>)([\\s\\S]*?)(<\\/\\s*?${tagName}>)`, 'gi');
};

const wrapModifier = function(fn) {

  return function(match, openingTag, content, closingTag) {
    return `${openingTag}${fn(content)}${closingTag}`;
  };
  
};

const returnTagContent = function(file, regex) {
  const result = [];
  var match = regex.exec(file);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  while (match) {
    result.push(match[2]);
    match = regex.exec(file);
  }

  return result;

};

module.exports = {createTagRegex, wrapModifier, returnTagContent};
