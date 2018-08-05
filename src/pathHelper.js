const pathUtil = require("path");

function resolvePath(path, parentModule) {
  if (pathUtil.isAbsolute(path)) {
    return path;
  }
  const cwd = parentModule
    ? pathUtil.dirname(parentModule.absolutePath)
    : process.cwd();
  return pathUtil.resolve(cwd, path);
}

module.exports = {
  resolvePath
};
