const Configstore = require('configstore')
const packageJson = require('../../package.json')

const configGet = () => {
  const config = new Configstore(packageJson)
  return config
}

module.exports = configGet
