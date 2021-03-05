const fs = require('fs');

const indexFilepath = './dist/index.html';

const inFile = fs.readFileSync(indexFilepath, {encoding: 'utf-8'});
const outFile = inFile.replace(/"\/assets/g, '"assets');

fs.writeFileSync(indexFilepath, outFile, {encoding: 'utf-8'});