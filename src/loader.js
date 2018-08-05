class ModuleLoader {
  constructor(moduleHelper, pathHelper, cache) {
    this.cache = cache;
    this.moduleHelper = moduleHelper;
    this.pathHelper = pathHelper;
    this.getOutput = this.getOutput.bind(this);
    this.execute = this.execute.bind(this);
  }

  getOutput(path, parent) {
    const absolutePath = this.pathHelper.resolvePath(path, parent);
    if (this.cache.has(absolutePath)) {
      return this.cache.get(absolutePath);
    }
    const module = this.moduleHelper.createModule(absolutePath);
    return this.execute(module);
  }

  execute(module) {
    const require = this.moduleHelper.createRequire(module, this);
    //synchronous execution
    this.moduleHelper.execute(module, require);
    this.cache.set(module.absolutePath, module.exports);
    return module.exports;
  }
}

module.exports = ModuleLoader;
