'use strict';

const _ = require('lodash');

const createTagRegex = function(tagName) {
  return new RegExp(`(<${tagName}[\\s\\S]*?>)([\\s\\S]*?)(<\\/\\s*?${tagName}>)`, 'gi');
};

const wrapModifier = function(fun) {
  /*
  * If a user provides a tag name the regex passed to 'String.replace()'
  * will include capture groups matching open/closing tags and content.
  * If no tag name is provided, the entire file will be matched without
  * capture groups.
  */
  return function(match, openingTag, content, closingTag) {
    return closingTag ? `${openingTag}${fun(content)}${closingTag}` : fun(match);
  };
  
};



module.exports = {createTagRegex, wrapModifier};
