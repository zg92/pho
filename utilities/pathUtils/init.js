const fs = require("fs");
const path = require("path");

const initFiles = async () => {
  console.log("Connecting to the directory...");
  try {
    fs.mkdirSync(path.join(process.cwd(), "phofiles"));
    console.log(
      `Created a directory at location: ${path.join(process.cwd(), "phofiles")}`
    );
  } catch (err) {
    if (err.code == "EEXIST") {
      console.log(
        `You are connected to directory at ${path.join(process.cwd(), "phofiles")}`
      );
    }
  }
};

const initImages = async () => {
  try {
    fs.mkdirSync(path.join(process.cwd(), "phofiles", "images"));
    console.log(
      `Created a folder in the working directory called: ${path.join(
        process.cwd(), 
        "phofiles",
        "images"
      )}`
    
    );
  } catch (err) {
    if (err.code == "EEXIST") {
      return;
    }
  }
};

const initPho = async () => {
  initFiles();
  initImages();
};

module.exports = { initPho };
