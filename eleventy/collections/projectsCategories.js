const slugify = require("slugify");

/**
 * Make slug from string
 * @param {Sring} str string to slugify
 * @returns slugified string
 */
const strToSlug = (str) => {
  const options = {
    replacement: "-",
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true,
  };

  return slugify(str, options);
};

/**
 * Project categories
 * @param {*} collection
 * @returns {Array} Array of category objects
 */
module.exports = (collection) => {
  const projects = collection.getFilteredByGlob("./src/projects/*.md");
  const allCategories = projects
    .flatMap((item) => item.data.categories)
    .filter((e) => e)
    .sort((a, b) => a.localeCompare(b));
  const uniqueCategories = [...new Set(allCategories)];
  const categories = uniqueCategories.map((cat) => {
    return {
      title: cat,
      slug: strToSlug(cat),
    };
  });
  return categories;
};
