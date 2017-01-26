'use strict';

/**
 * Returns a regex that can be used for matching html tags
 * and their content
 *
 * @param {String} tagName the type of html tag to be matched
 *
 * @returns {Regex} a regex that will produce capture groups
 * for open/closing tags and content.
 */
const createTagRegex = function(tagName) {
  // eslint-disable-next-line max-len
  return new RegExp(`(<${tagName}[\\s\\S]*?>)([\\s\\S]*?)(<\\/\\s*?${tagName}>)`, 'gi');
};

/**
 * Wraps a function that modifies tag content so that it can
 * be used in conjunction with '_.replace'
 *
 * @param {Function} fn a function that modifies text
 *
 * @returns {Function} a function that can be passed to '_.replace' as
 * an argument
 */
const wrapModifier = function(fn) {

  /**
   * Returns tags containing modified content. Used by '_.replace'
   *
   * @param {String} match the entire matched portion of a string (contains
   * both tags and content)
   * @param {String} openingTag an opening tag and all of it's attributes
   * @param {String} content The tag content. This is passed into
   * 'fn' and modified
   * @param {String} closingTag a closing tag
   *
   * @returns {Promise} a promise that returns modified html.
   */
  return function(match, openingTag, content, closingTag) {

    return fn(content)
      .then(function(result) {
        return `${openingTag}${result}${closingTag}`;
      });

  };

};

/**
 * Returns the content of every 'tag' matched by a regex within a file
 *
 * @param {String} file an entire html file
 * @param {Regex} regex a regex for matching a specific type
 * of tag and its contents
 *
 * @returns {String[]} the content of each tag (tags themselves are removed)
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
