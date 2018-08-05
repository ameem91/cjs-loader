# cjs-loader
A basic CommonJS module loader in the style of the default Node.js module loader. It resolves dependencies in your code, and then executes it using the [vm module](https://nodejs.org/api/vm.html) in Node.js. 

This is an **example** project, and is NOT meant to be used in production code. I wrote this to help myself understand how the Node.js module loader works under the hood. Just sharing it in case it helps others too.

## Usage

Project setup:

```
yarn install
yarn link
```

Require using `require`:
```js
require("./path/to/file.js")
```

Export using `module.exports` or `exports`:
```js
module.exports = {...}

// or

exports.something = ...
```

Execute your file using the CLI:
```
cjs-loader <path-to-file>
```