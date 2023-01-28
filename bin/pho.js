#! /usr/bin/env node

const yargs = require("yargs");

yargs
  .commandDir("../commands/fileActions")
  .commandDir("../commands/imageManipulation")
  .help().argv;
