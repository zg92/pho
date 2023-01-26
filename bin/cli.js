#! /usr/bin/env node

const yargs = require("yargs");

yargs
  .commandDir("../commands")
  .commandDir("../commands/imageManipulation")
  .help().argv;
