const Module = require("../src/module");

describe("Module", () => {
  const mockAbsolutePath = "path/to/file.js";
  const module = new Module(mockAbsolutePath);

  it("should contain an 'absolutePath' property set to the given absolute path", () => {
    expect(module.absolutePath).toEqual(mockAbsolutePath);
  });

  it("should contain an 'exports' property set to an empty object", () => {
    expect(module.exports).toEqual({});
  });
});
