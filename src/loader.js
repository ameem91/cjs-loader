const LoaderUtils = require("./loaderUtils");

class Loader {
  constructor(cache) {
    this.cache = cache;
    this.load = this.load.bind(this);
  }

  load(id, parentId) {
    if (this.cache.has(id)) {
      const cachedModule = this.cache.get(id);
      return cachedModule.exports;
    }
    const module = LoaderUtils.buildModule(id, parentId, this.load);
    this.cache.set(id, module);
    LoaderUtils.execute(module);
    return module.exports;
  }
}

module.exports = Loader;
