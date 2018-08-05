jest.mock("fs");
jest.mock("vm");

const mockFs = require("fs");
const mockVm = require("vm");
const ModuleHelper = require("../src/moduleHelper");
const Module = require("../src/module");

describe("ModuleHelper", () => {
  describe("execute()", () => {
    it("should compile and run the module", () => {
      mockCompiledModule = jest.fn();
      mockCompiledModule.call = jest.fn();
      const mockCompile = jest
        .spyOn(ModuleHelper, "compile")
        .mockImplementation(x => mockCompiledModule);
      const mockModule = { exports: {} };
      const require = () => {};

      ModuleHelper.execute(mockModule, require);
      expect(mockCompiledModule.call).toHaveBeenCalledWith(
        mockModule.exports,
        mockModule.exports,
        require,
        mockModule
      );

      mockCompile.mockRestore();
    });
  });

  describe("createModule()", () => {
    it("should return a new Module instance", () => {
      const mockAbsoutePath = "path/to/file.js";
      expect(ModuleHelper.createModule(mockAbsoutePath)).toEqual(
        new Module(mockAbsoutePath)
      );
    });
  });

  describe("createRequire()", () => {
    const mockLoader = {
      getOutput: jest.fn()
    };
    const mockParent = {};
    const mockPath = "/path/to/file.js";
    const mockRequire = ModuleHelper.createRequire(mockParent, mockLoader);

    mockRequire(mockPath);
    expect(mockLoader.getOutput).toHaveBeenCalledWith(mockPath, mockParent);
  });

  describe("compile()", () => {
    it("should compile the given module using the vm module", () => {
      const mockScript = "my mock script";
      const mockMakeScript = jest
        .spyOn(ModuleHelper, "makeScript")
        .mockImplementation(() => mockScript);
      const expectedCompiledScript = mockVm.runInThisContext(mockScript);
      expect(ModuleHelper.compile("mock")).toEqual(expectedCompiledScript);

      mockMakeScript.mockRestore();
    });
  });

  describe("makeScript()", () => {
    it("should wrap the contents of the file in a function", () => {
      const mockModule = { absolutePath: "path/to/file.js" };
      const mockContent = mockFs.readFileSync(
        mockModule.absolutePath,
        "mockEncoding"
      );
      const expectedScript = `(function (exports, require, module) { ${mockContent}\n});`;
      expect(ModuleHelper.makeScript(mockModule)).toEqual(expectedScript);
    });
  });
});
