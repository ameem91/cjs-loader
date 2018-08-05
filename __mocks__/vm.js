const vm = jest.genMockFromModule("vm");

function runInThisContext(script) {
  return `${script} executed`;
}

vm.runInThisContext = runInThisContext;
module.exports = vm;
