// packages
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const sharp = require("sharp");

// specify transforms
const transforms = [
  {
    src: "./src/assets/img/banners/*",
    dist: "./dist/assets/img/banners/_600x338/",
    options: {
      width: 600,
      height: 338,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/_1024x576/",
    options: {
      width: 1024,
      height: 576,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/_600x338/",
    options: {
      width: 600,
      height: 338,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/_800x800/",
    options: {
      width: 800,
      height: 800,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/projects/*",
    dist: "./dist/assets/img/projects/_600xauto/",
    options: {
      width: 600,
      fit: "cover",
    },
  },
];

/**
 * Check folder exists, if not, make it (recursively)
 * @param {string} path - path to folder
 */
const checkFolderExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
};

/**
 * Walk array of filepaths to make
 * thumbnails and write them to disk
 * @param {array} filepaths - array of filepaths
 * @param {object} transform - Sharp options and location of dist folder
 */
const makeThumbnails = (filepaths, transform) => {
  filepaths.forEach((file) => {
    let filename = path.basename(file);
    sharp(file)
      .resize(transform.options)
      .toFile(`${transform.dist}/${filename}`)
      .catch((err) => {
        console.log(err);
      });
  });
};

/**
 * Init function
 * For each specified transform
 * - get src and glob filepaths
 * - pass filepaths and transform object
 */
const init = () => {
  transforms.forEach((transform) => {
    // check dist folder exists
    checkFolderExists(transform.dist);

    // glob files and make thumbnails
    let filepaths = glob.sync(transform.src);
    if (filepaths.length === 0) {
      throw new Error(
        `Thumbnails task error: ${transform.src} folder didn't return any file`
      );
    }
    makeThumbnails(filepaths, transform);
  });
};

// Initialise
init();
