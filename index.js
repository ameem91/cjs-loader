const Loader = require("./src/loader");

function main() {
  const cache = new Map();
  const loader = new Loader(cache);
  const fileName = "/Users/Ashaik/workspace/projects/node-cjs-loader/samples/index.js";
  loader.load(fileName, null);
}

main();

