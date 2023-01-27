
const Configstore = require('configstore')
const packageJson = require('../../package.json')


const configGet = () => {
    const config = new Configstore(packageJson)
return config
}

const configSet = async (value) => {
    await checkPath(value) ? config().set('baseDir', value) :
      console.log("That path doesn't exist")
}
module.exports = configGet