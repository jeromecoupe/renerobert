module.exports = function (eleventyConfig) {
  // collections
  eleventyConfig.addCollection("projects", function (collection) {
    return collection
      .getFilteredByGlob("./src/projects/*.md")
      .sort((a, b) => b.year - a.year);
  });

  // filters
  eleventyConfig.addFilter("date", require("./src/_filters/date.js"));

  // copy files
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");

  // deep merge
  eleventyConfig.setDataDeepMerge(true);

  // override default config
  return {
    dir: {
      input: "./src/",
      output: "./dist/",
    },
  };
};
