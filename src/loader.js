const vm = require("vm");
const path = require("path");

class Module {
  constructor(id, parent) {
    this.id = id;
    this.parent = parent;
    Module.updateChildren(parent, this, false);
    this.exports = {};
    this.filename = null;
    this.loaded = false;
    this.children = [];
  }

  compile(content, filename) {
    const wrapper = Module.wrap(content);
    var dirname = path.dirname(filename);
    var require = Module.makeRequireFunction(this);

    // this works similarly to eval, except it does not have
    // access to the local scope. It CAN access global scope, however.
    const compiledWrapper = vm.runInThisContext(wrapper);
    const result = compiledWrapper.call(
      // TIL `this` inside a node module points to module.exports
      this.exports,
      this.exports,
      require,
      this,
      filename,
      dirname
    );
    return result;
  }

  static wrap(content) {
    const wrapper = [
      "(function (exports, require, module, __filename, __dirname) { ",
      "\n});"
    ];

    return wrapper[0] + content + wrapper[1];
  }

  static updateChildren(parent, child, scan) {
    // TODO
    return null;
  }

  static makeRequireFunction() {
    // TODO
    return () => {};
  }
}

module.exports = Module;
