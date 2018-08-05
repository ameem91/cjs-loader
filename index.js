#!/usr/bin/env node
"use strict";

const program = require("commander");
const Loader = require("./src/loader");
const moduleHelper = require("./src/moduleHelper");
const pathHelper = require("./src/pathHelper");

function load(path) {
  const cache = new Map();
  const loader = new Loader(moduleHelper, pathHelper, cache);
  loader.getOutput(path, null);
}

program.parse(process.argv);
load(program.args[0]);
