const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const transforms = [
  {
    // 600x338 thumbnails for banners
    src: "./src/assets/img/banners/",
    dist: "./dist/assets/img/banners/600x338/",
    formats: ["jpg"],
    options: {
      width: 600,
      height: 338,
      fit: "cover",
    },
  },
  {
    // 600x338 thumbnails for project covers
    src: "./src/assets/img/projects_covers/",
    dist: "./dist/assets/img/projects_covers/600x338/",
    formats: ["jpg"],
    options: {
      width: 600,
      height: 338,
      fit: "cover",
    },
  },
  {
    // 1024x576 thumbnails for project covers
    src: "./src/assets/img/projects_covers/",
    dist: "./dist/assets/img/projects_covers/1024x576/",
    formats: ["jpg"],
    options: {
      width: 1024,
      height: 576,
      fit: "cover",
    },
  },
  {
    // 600x600 thumbnails for project covers
    src: "./src/assets/img/projects_covers/",
    dist: "./dist/assets/img/projects_covers/600x600/",
    formats: ["jpg"],
    options: {
      width: 600,
      height: 600,
      fit: "cover",
    },
  },
  {
    // 600xauto thumbnails for projects
    src: "./src/assets/img/projects/",
    dist: "./dist/assets/img/projects/600xauto/",
    formats: ["jpg"],
    options: {
      width: 600,
      height: null,
      fit: "cover",
    },
  },
];

// config
const config = {
  allowedFormats: ["jpg", "jpeg", "webp", "avif", "png", "gif"],
};

/**
 * Create Directory recursively from path
 */
function createDir(path) {
  // return if dir already exists
  if (fs.existsSync(path)) return;
  // create dir
  try {
    fs.mkdirSync(path, { recursive: true });
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Generate images based on transforms object
 */
async function init() {
  // array for promises
  let sharpPromises = [];

  // loop through transforms
  transforms.forEach(async (transform) => {
    let inputDir = transform.src;
    let outputDir = transform.dist;
    let formats = transform.formats;
    let options = transform.options;

    // check formats is array
    if (!Array.isArray(formats)) {
      throw new Error(`"formats" in transforms should be an array`);
    }

    // check formats are of allowed types
    formats.forEach((el) => {
      if (!config.allowedFormats.includes(el)) {
        throw new Error(
          `Unknown format: "${el}". Allowed formats are: ${config.allowedFormats.toString()}`
        );
      }
    });

    // Get image files in input directory
    let imagesGlob = path.join(
      inputDir,
      `*.{${config.allowedFormats.toString()}}`
    );

    let imagesFiles = globSync(imagesGlob);

    // Create output dir
    createDir(outputDir);

    // loop through all images and create Sharp promises
    imagesFiles.forEach((file) => {
      // Create resized images for each specified formats
      formats.forEach((format) => {
        // get input image name
        let inputFileName = path.parse(file).name;

        // build image output path
        let outputPath = path.join(outputDir, `${inputFileName}.${format}`);

        // bail out if image output path exists
        if (fs.existsSync(outputPath)) return;

        // create sharp promises
        try {
          // resize promise
          let sharpPromise = sharp(file).resize(options).toFile(outputPath);

          // push promise to array
          sharpPromises.push(sharpPromise);
        } catch (err) {
          throw new Error(err);
        }
      });
    });
  });

  // resolve all promises in parallel
  try {
    await Promise.all(sharpPromises);
    console.log(`${sharpPromises.length} resized images generated`);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = init();
