#! /usr/bin/env node

const yargs = require("yargs");
const { dirPath } = require("../utilities/pathUtils/dir");

console.log(dirPath)

yargs
  .command(require("../commands/init"))
  .commandDir("../commands")
  .commandDir("../commands/imageManipulation")
  .help().argv;
