'use strict';

/**
 * Returns a regex that can be used for matching html tags
 * and their content
 *
 * @param {string} tagName the type of html tag to be matched
 *
 * @returns {regex} a regex that will produce capture groups for open/closing tags and content.
 */
const createTagRegex = function(tagName) {
  return new RegExp(`(<${tagName}[\\s\\S]*?>)([\\s\\S]*?)(<\\/\\s*?${tagName}>)`, 'gi');
};

/**
 * Wraps a function that modifies tag content so that it can
 * be used in conjunction with '_.replace'
 * 
 * @param {function} fn a function that modifies text
 *
 * @returns {function} a function that can be passed to '_.replace' as
 * an argument
 */
const wrapModifier = function(fn) {

  /**
   * Returns tags containing modified content. Used by '_.replace'
   * 
   * @param {string} match the entire matched portion of a string (contains
   * both tags and content)
   * @param {string} openingTag an opening tag and all of it's attributes
   * @param {string} content The tag content. This is passed into 'fn' and modified
   * @param {string} closingTag a closing tag
   *
   * @returns {string} a string containing modified html.
   */
  return function(match, openingTag, content, closingTag) {
    return `${openingTag}${fn(content)}${closingTag}`;
  };
  
};

/**
 * Returns the content of every 'tag' matched by a regex within a file
 * 
 * @param {string} file an entire html file
 * @param {regex} regex a regex for matching a specific type of tag and its contents
 *
 * @returns {string[]} the content of each tag (tags themselves are removed)
 */
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
