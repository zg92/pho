const yargs = require("yargs");
const init = require("./commands/init");
const peek = require("./commands/peek");

enteredCommand = yargs.argv._[0];

if (enteredCommand == "init") {
  init();
} else if (enteredCommand == "peek") {
  peek();
}
