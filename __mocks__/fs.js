const fs = jest.genMockFromModule("fs");

function readFileSync(path, encoding) {
  return "my mock content";
}

fs.readFileSync = readFileSync;
module.exports = fs;
