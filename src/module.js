class Module {
  constructor(absolutePath) {
    this.absolutePath = absolutePath;
    this.exports = {};
  }
}

module.exports = Module;
