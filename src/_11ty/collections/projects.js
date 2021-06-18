/**
 * Projects collection
 * @param {Array} collection
 * @returns projects collection
 */

module.exports = (collection) => {
  return collection
    .getFilteredByGlob("./src/content/projects/*.md")
    .sort((a, b) => {
      return b.date - a.date;
    });
};
