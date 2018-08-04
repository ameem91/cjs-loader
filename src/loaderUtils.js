const Module = require("./module");
const fs = require("fs");
const vm = require("vm");

class LoaderUtils {
  static createModule(filename, loadMethod) {
    const require = LoaderUtils.createRequireFunc(loadMethod);
    return new Module(filename, require);
  }

  static createRequireFunc(loadMethod) {
    return filename => {
      return loadMethod(filename);
    };
  }

  static execute(module) {
    const compiledModule = LoaderUtils.compile(module);
    const { exports, require } = module;
    return compiledModule.call(
      // TIL `this` inside a node module points to module.exports
      exports,
      exports,
      require,
      module
    );
  }

  static compile(module) {
    const script = LoaderUtils.makeScript(module);
    // vm.runInThisContext is similar to eval but does not have access to local scope
    const compiledModule = vm.runInThisContext(script);
    return compiledModule;
  }

  static makeScript(module) {
    const content = fs.readFileSync(module.filename, "utf8");
    const wrapper = ["(function (exports, require, module) { ", "\n});"];
    return wrapper[0] + content + wrapper[1];
  }
}

module.exports = LoaderUtils;
