// collections
const projects = require("./src/_11ty/collections/projects.js");
const projectsCategories = require("./src/_11ty/collections/projectsCategories.js");

// filters
const limit = require("./src/_11ty/filters/limit.js");
const include = require("./src/_11ty/filters/include.js");
const dates = require("./src/_11ty/filters/dates.js");

module.exports = function (eleventyConfig) {
  // collections
  eleventyConfig.addCollection("projects", projects);
  eleventyConfig.addCollection("projectsCategories", projectsCategories);

  // filters
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("include", include);
  eleventyConfig.addFilter("limit", limit);

  // copy files
  eleventyConfig.addPassthroughCopy({ "./src/static": "./" });
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");

  // server config
  eleventyConfig.setServerOptions({
    watch: ["./dist/assets/css/**/*.css", "./dist/assets/js/**/*.js"],
    port: 3000,
  });

  // override default config
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
