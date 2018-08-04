class ModuleLoader {
  constructor(helper, cache) {
    this.cache = cache;
    this.helper = helper;
    this.getOutput = this.getOutput.bind(this);
    this.execute = this.execute.bind(this);
  }

  getOutput(path, parent) {
    const absolutePath = this.helper.resolvePath(path, parent);
    if (this.cache.has(absolutePath)) {
      return this.cache.get(absolutePath);
    }
    const module = this.helper.createModule(absolutePath);
    return this.execute(module);
  }

  execute(module) {
    const require = this.helper.createRequire(module, this);
    //synchronous execution
    this.helper.execute(module, require);
    this.cache.set(module.absolutePath, module.exports);
    return module.exports;
  }
}

module.exports = ModuleLoader;
