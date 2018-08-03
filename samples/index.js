const greeter = require("/Users/Ashaik/workspace/projects/node-cjs-loader/samples/greeter.js");
const greeter2 = require("/Users/Ashaik/workspace/projects/node-cjs-loader/samples/greeter.js");

console.log(greeter());
//cached version
console.log(greeter2());
