const Module = require("./src/loader");
const sample = new Module("test");
sample.compile("console.log('hello world')","");
