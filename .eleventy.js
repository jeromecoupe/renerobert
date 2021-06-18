module.exports = function (eleventyConfig) {
  // projects
  eleventyConfig.addCollection("projects", require("./src/_11ty/collections/projects.js"));

  // projects categories
  eleventyConfig.addCollection("projectsCategories", require("./src/_11ty/collections/projectsCategories.js"));

  // filters
  eleventyConfig.addFilter("date", require("./src/_11ty/filters/date.js"));
  eleventyConfig.addFilter("include", require("./src/_11ty/filters/include.js"));
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter("transform", require("./src/_11ty/filters/transform-images.js"));

  // copy files
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/*": "assets/img" });
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
