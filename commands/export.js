const yargs = require("yargs");

const exportFile = yargs
  .command(
    "$0 <command> [directory] [files] <destination>",
    "Initialize program",
    (yargs) => {
      yargs.option("directory", {}),
        yargs.option("files", {}),
        yargs.option("destination", {});
    },

    () => {}
  )
  .help().argv;
