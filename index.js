const Loader = require("./src/loader");
const loaderHelper = require("./src/loaderHelper");

function main() {
  const cache = new Map();
  const loader = new Loader(loaderHelper, cache);
  const fileName =
    "./samples/index.js";
  loader.getOutput(fileName, null);
}

main();
