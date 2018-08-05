const fs = require("fs");
const vm = require("vm");
const Module = require("./module");

class ModuleHelper {
  static execute(module, require) {
    const compiledModule = ModuleHelper.compile(module);
    return compiledModule.call(
      // TIL `this` inside a node module points to module.exports
      module.exports,
      module.exports,
      require,
      module
    );
  }

  static createModule(absolutePath) {
    return new Module(absolutePath);
  }

  static createRequire(parent, loader) {
    return path => {
      return loader.getOutput(path, parent);
    };
  }

  static compile(module) {
    const script = ModuleHelper.makeScript(module);
    // vm.runInThisContext is similar to eval but does not have access to local scope
    const compiledModule = vm.runInThisContext(script);
    return compiledModule;
  }

  static makeScript(module) {
    const content = fs.readFileSync(module.absolutePath, "utf8");
    const wrapper = ["(function (exports, require, module) { ", "\n});"];
    return wrapper[0] + content + wrapper[1];
  }
}

module.exports = ModuleHelper;
