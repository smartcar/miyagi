'use strict';

module.exports = {

  createTagRegex: function(tagName) {

    if (tagName) {
      return new RegExp(`(<${tagName}[\\s\\S]*?>)([\\s\\S]*?)(<\\/\\s*?${tagName}>)`, 'gi');
    } else {
      // If no tag name is provided, match the entire file
      return new RegExp('[\\s\\S]*');
    }
    
  }, 

  modifyContent: function(modifier) {

    return function(match, openingTag, content, closingTag) {
      return closingTag ? `${openingTag}${modifier(content)}${closingTag}` : modifier(match);
    };
    
  },

};
