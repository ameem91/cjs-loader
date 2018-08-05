const Loader = require("../src/loader");

describe("Loader", () => {
  let mockCache;
  let mockPathHelper;
  let mockModuleHelper;
  let mockLoader;

  beforeEach(() => {
    mockCache = {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn()
    };

    mockPathHelper = {
      resolvePath: jest.fn()
    };

    mockModuleHelper = {
      execute: jest.fn(),
      createModule: jest.fn(),
      createRequire: jest.fn()
    };

    mockLoader = new Loader(mockModuleHelper, mockPathHelper, mockCache);
  });

  describe("getOutput", () => {
    it("should return the output from cache when it exists", () => {
      const mockCachedOutput = { prop: "value" };
      mockCache.has.mockReturnValue(true);
      mockCache.get.mockReturnValue(mockCachedOutput);

      expect(mockLoader.getOutput()).toEqual(mockCachedOutput);
    });

    it("should return the output from executing the module when it does not exist in cache", () => {
      const mockOutput = { prop: "value" };
      mockCache.has.mockReturnValue(false);
      mockLoader.execute = jest.fn();
      mockLoader.execute.mockReturnValue(mockOutput);

      expect(mockLoader.getOutput()).toEqual(mockOutput);
    });
  });

  describe("execute", () => {
    it("should execute the module", () => {
      const mockModule = {
        absolutePath: "path/to/file.js",
        exports: {}
      };

      mockLoader.execute(mockModule);
      expect(mockModuleHelper.execute).toHaveBeenCalled();
    });

    it("should add the executing module output to cache", () => {
      const mockModule = {
        absolutePath: "path/to/file.js",
        exports: {}
      };

      mockLoader.execute(mockModule);
      expect(mockCache.set).toHaveBeenCalledWith(
        mockModule.absolutePath,
        mockModule.exports
      );
    });
  });
});
