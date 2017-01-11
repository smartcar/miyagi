'use strict';

const regex = require('./regex');

module.exports = {

  createTagRegex: function(tagName) {
    return new RegExp(`(<${tagName}[\s\S]*?>)([\s\S]*?)(<\/\s*?${tagName}>)`, 'gi');
  }, 

  modifyContent: function(modifier) {

    return function(match, openingTag, content, closingTag) {
      var result = modifier(content);
      return openingTag + content + closingTag;
    };
    
  },

};
