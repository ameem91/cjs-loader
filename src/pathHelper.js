const pathUtil = require("path");

class PathHelper {
  static resolvePath(path, parentModule) {
    if (pathUtil.isAbsolute(path)) {
      return path;
    }
    const cwd = parentModule
      ? pathUtil.dirname(parentModule.absolutePath)
      : process.cwd();
    return pathUtil.resolve(cwd, path);
  }
}

module.exports = PathHelper;
