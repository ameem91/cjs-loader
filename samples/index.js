const greeter = require("./greeter.js");
const { makePerson } = require("./personUtils.js");

const person = makePerson("Bob Smith");

console.log(greeter.greet(person));
