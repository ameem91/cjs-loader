class Module {
  constructor(id, parent, require) {
    this.id = id;
    this.parent = parent;
    this.require = require;
    this.exports = {};
  }
}

module.exports = Module;
