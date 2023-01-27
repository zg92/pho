const prompts = require('prompts');
const initPho = require("../utilities/pathUtils/init.js");
const checkPath = require('../utilities/pathUtils/checkPath.js');
const config = require('../utilities/logUtils/log');
const figlet = require('figlet');

const init = {
  command: "init",
  describe: "Initialize program",
  handler: async () => {

    console.log(
      figlet.textSync("Welcome to PHO", {
        font: "big",
        horizontalLayout: "default",
        verticalLayout: "default"
      }))

      const baseDir = await prompts({
        type: 'text',
        name: 'value',
        message: "What filepath do you want to create Pho's file system?",

      })
      console.log(baseDir.value)
      if (checkPath(baseDir.value) && baseDir.value !== config().get('basedir')) 
      { 
      await config().set('baseDir', baseDir.value); 
      await initPho() 
    }
      else {
      console.log("That path doesn't exist")
      }
       
    }
    
  
    
  }
      


      
      

    

module.exports = init;
