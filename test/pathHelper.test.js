const PathHelper = require("../src/pathHelper");

describe("PathHelper", () => {
  describe("resolvePath()", () => {
    it("should return the given path when it is already an absolute path", () => {
      const mockPath = "/path/to/file.js";
      expect(PathHelper.resolvePath(mockPath)).toEqual(mockPath);
    });

    it("should convert relative paths to absolute paths using the parent as baseline when available", () => {
      const mockParentModule = {
        absolutePath: "/path/to/my/file.js"
      };

      const mockPath = "../../anotherFile.js";
      expect(PathHelper.resolvePath(mockPath, mockParentModule)).toEqual(
        "/path/anotherFile.js"
      );
    });

    it("should covert relative paths to absolute using the cwd as baseline if no parent is available", () => {
      const mockPath = "../../anotherFile.js";
      const mockCwd = jest
        .spyOn(process, "cwd")
        .mockImplementation(() => "/path/to/mycwd/");
      expect(PathHelper.resolvePath(mockPath)).toEqual("/path/anotherFile.js");
      mockCwd.mockRestore();
    });
  });
});
