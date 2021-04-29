// packages
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const sharp = require("sharp");

// specify transforms
const transforms = [
  {
    src: "./src/assets/img/banners/*",
    dist: "./dist/assets/img/banners/",
    resize: null,
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/banners/*",
    dist: "./dist/assets/img/banners/_600x338/",
    resize: {
      width: 600,
      height: 338,
      fit: "cover",
    },
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/",
    resize: null,
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/_1024x576/",
    resize: {
      width: 1024,
      height: 576,
      fit: "cover",
    },
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/_600x338/",
    resize: {
      width: 600,
      height: 338,
      fit: "cover",
    },
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/projects_covers/*",
    dist: "./dist/assets/img/projects_covers/_800x800/",
    resize: {
      width: 800,
      height: 800,
      fit: "cover",
    },
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/projects/*",
    dist: "./dist/assets/img/projects/",
    resize: null,
    formats: ["jpg", "webp"],
  },
  {
    src: "./src/assets/img/projects/*",
    dist: "./dist/assets/img/projects/_600xauto/",
    resize: {
      width: 600,
      fit: "cover",
    },
    formats: ["jpg", "webp"],
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
 * @param {object} transform - Sharp parameters and dist folder
 */
const makeThumbnails = async (filepaths, transform) => {
  filepaths.map(async (file) => {
    let filename = path.parse(file).name;
    let distpath = `${transform.dist}/${filename}`;
    let formats = transform.formats;
    return Promise.all(
      formats.map(async (format) => {
        return await sharp(file)
          .resize(transform.resize)
          .toFormat(format)
          .toFile(`${distpath}.${format}`);
      })
    );
  });
};

/**
 * Init function
 * For each specified transform
 * - get src and glob filepaths
 * - pass filepaths and transform object
 */
const init = async () => {
  transforms.forEach(async (transform) => {
    // check dist folder exists
    checkFolderExists(transform.dist);

    // glob files and make thumbnails
    let filepaths = glob.sync(transform.src);
    if (filepaths.length === 0) {
      throw new Error(
        `THUMBNAILS TASK: ${transform.src} folder didn't return any file`
      );
    }
    makeThumbnails(filepaths, transform);
  });
};

// Initialise
init();
