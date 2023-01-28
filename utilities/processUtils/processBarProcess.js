const colors = require("ansi-colors");
const cliProgress = require("cli-progress");

class ProgressBar {
  constructor(processName, fileLength) {
    this.processName = processName;
    this.fileLength = fileLength;

    this.progressBar = new cliProgress.SingleBar(
      {
        format:
          `${this.processName} |` +
          colors.green("{bar}") +
          "| {percentage}% || {value}/{total} Files",
      },
      cliProgress.Presets.shades_classic
    );
    this.start = () => this.progressBar.start(this.fileLength, 0);
    this.increment = () => this.progressBar.increment();
    this.stop = () => this.progressBar.stop();
  }
}

module.exports = ProgressBar;
