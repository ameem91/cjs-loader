class Module {
  constructor(filename, require) {
    this.filename = filename;
    this.require = require;
    this.exports = {};
  }
}

module.exports = Module;
