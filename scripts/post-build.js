const fs = require("fs");
const fsExtra = require("fs-extra");

const indexFilepath = "./dist/index.html";

const inFile = fs.readFileSync(indexFilepath, { encoding: "utf-8" });
const outFile = inFile.replace(/"\/assets/g, '"assets');

fs.writeFileSync(indexFilepath, outFile, { encoding: "utf-8" });

const backgroundFilepath = "./src/background/main.js";
const backgroundDestination = "./dist/build-background.js";

fs.copyFileSync(backgroundFilepath, backgroundDestination);

const manifestFilepath = "./manifest.json";
const manifestDestination = "./dist/manifest.json";

fs.copyFileSync(manifestFilepath, manifestDestination);

const iconsDirectory = "./icons/";
const iconsDestination = "./dist/icons/";

fsExtra.copySync(iconsDirectory, iconsDestination);
