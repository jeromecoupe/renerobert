/**
 * Project categories
 * @param {*} collection
 * @returns {Array} Array of category objects
 */
module.exports = (collection) => {
  const projects = collection.getFilteredByGlob("./src/projects/*.md");
  const categories = projects
    .flatMap((item) => item.data.categories)
    .sort((a, b) => a.localeCompare(b));
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
};
