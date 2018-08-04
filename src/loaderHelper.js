const fs = require("fs");
const vm = require("vm");
const pathHeper = require("path");
const Module = require("./module");

function execute(module, require) {
  const compiledModule = compile(module);
  return compiledModule.call(
    // TIL `this` inside a node module points to module.exports
    exports,
    exports,
    require,
    module
  );
}

function resolvePath(path, parentModule) {
  if (pathHeper.isAbsolute(path)) {
    return path;
  }
  const cwd = parentModule
    ? pathHeper.dirname(parentModule.absolutePath)
    : process.cwd();
  return pathHeper.resolve(cwd, path);
}

function createModule(absolutePath) {
  return new Module(absolutePath);
}

function createRequire(parent, loader) {
  return unresolvedPath => {
    return loader.getOutput(unresolvedPath, parent);
  };
}

function compile(module) {
  const script = makeScript(module);
  // vm.runInThisContext is similar to eval but does not have access to local scope
  const compiledModule = vm.runInThisContext(script);
  return compiledModule;
}

function makeScript(module) {
  const content = fs.readFileSync(module.absolutePath, "utf8");
  const wrapper = ["(function (exports, require, module) { ", "\n});"];
  return wrapper[0] + content + wrapper[1];
}

module.exports = {
  execute,
  resolvePath,
  createModule,
  createRequire
};
