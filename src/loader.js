const LoaderUtils = require("./loaderUtils");

class Loader {
  constructor(moduleCache) {
    this.moduleCache = moduleCache;
    this.load = this.load.bind(this);
  }

  load(filename) {
    if (this.moduleCache.has(filename)) {
      const cachedModule = this.moduleCache.get(filename);
      return cachedModule.exports;
    }
    const module = LoaderUtils.createModule(filename, this.load);
    this.moduleCache.set(filename, module);
    //synchronous execution
    LoaderUtils.execute(module);
    return module.exports;
  }
}

module.exports = Loader;
