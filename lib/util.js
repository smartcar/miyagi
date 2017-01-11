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
    /*
    * If a user provides a tag name the regex passed to 'String.replace()'
    * will include capture groups matching open/closing tags and content.
    * If no tag name is provided, the entire file will be matched without
    * capture groups.
    */
    return function(match, openingTag, content, closingTag) {
      return closingTag ? `${openingTag}${modifier(content)}${closingTag}` : modifier(match);
    };
    
  },

};
