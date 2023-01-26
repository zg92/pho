#! /usr/bin/env node

const yargs = require("yargs");

yargs
  .command(require("../commands/init"))
  .commandDir("../commands")
  .commandDir("../commands/imageManipulation")
  .help().argv;
