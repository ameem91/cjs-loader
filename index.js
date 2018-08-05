#!/usr/bin/env node
"use strict";

const program = require("commander");
const Loader = require("./src/loader");
const loaderHelper = require("./src/loaderHelper");

function load(path) {
  const cache = new Map();
  const loader = new Loader(loaderHelper, cache);
  loader.getOutput(path, null);
}

program.parse(process.argv);
load(program.args[0]);
