/**
 * Get the filename from path
 *
 * @param {String} filepath - target file path
 * @return {String} filename
 */

const path = require("path");

module.exports = (filepath) => {
  return path.parse(filepath).name;
};
