const fs = require("fs");
const path = require("path");
const config = require('../logUtils/log');
const getConfig = config().get('baseDir')

const initFiles = async () => {
  
  console.log("Connecting to the directory...");
  try {
     fs.mkdirSync(path.join(getConfig, "phofiles"));
    console.log(
      `Created a directory at location: ${path.join(getConfig, "phofiles")}`
    );
    return
  } catch (err) {
    if (err.code == "EEXIST") {
      
      return
    }
  }

};

const initImages = async () => {
  try {
    fs.mkdirSync(path.join(getConfig, "phofiles", "images"));
    console.log(
      `Created a folder in the working directory called: ${path.join(
        getConfig, 
        "phofiles",
        "images"
      )}`
    
    );
    return
  } catch (err) {
    if (err.code == "EEXIST") {
      console.log(
        `You are connected to directory at ${path.join(getConfig, "phofiles")}`
      );
      return;
    }
  }
};

const initPho = async () => {
  await initFiles();
  await initImages();
};

module.exports = initPho;
