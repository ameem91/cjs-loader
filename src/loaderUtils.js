const Module = require("./module");
const fs = require("fs");
const vm = require("vm");

class LoaderUtils {
  
  static buildModule(id, parentId, loadMethod) {
    const require = LoaderUtils.buildRequire(id, loadMethod);
    return new Module(id, parentId, require);
  }

  static buildRequire(parentId, loadMethod) {
    return (id) => {
      return loadMethod(id, parentId);
    }
  }

  static execute(module) {
    const compiledModule = LoaderUtils.compile(module);
    const {exports, require} = module;
    return compiledModule.call(
      // TIL `this` inside a node module points to module.exports
      exports,
      exports,
      require,
      module,
    );
  }

  static compile(module) {
    const script = LoaderUtils.makeScript(module);
    const compiledModule = vm.runInThisContext(script);
    return compiledModule;
  }

  static makeScript(module) {
    const content = fs.readFileSync(module.id, "utf8");
    const wrapper = [
      "(function (exports, require, module) { ",
      "\n});"
    ];
    return wrapper[0] + content + wrapper[1];
  }
}

module.exports = LoaderUtils;
