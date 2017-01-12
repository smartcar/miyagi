'use strict';

const createTagRegex = function(tagName) {
  return new RegExp(`(<${tagName}[\\s\\S]*?>)([\\s\\S]*?)(<\\/\\s*?${tagName}>)`, 'gi');
};

const wrapModifier = function(fun) {

  return function(match, openingTag, content, closingTag) {
    return `${openingTag}${fun(content)}${closingTag}`;
  };
  
};

const returnTagContent = function(file, regex) {
  const result = [];
  var match;

  while (match = regex.exec(file)) {
    result.push(match[2]);
  }

  return result;

};

module.exports = {createTagRegex, wrapModifier, returnTagContent};
