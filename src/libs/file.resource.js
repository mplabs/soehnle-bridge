const fs = require('fs').promises
const path = require('path')

module.exports = (filename, { encoding } = { encoding: 'utf8'}) => {
  filename = path.isAbsolute(filename) ? filename : path.resolve(filename)

  this.exists = () => fs.access(filename, fs.constants.F_OK).then(access => true).catch(err => false)

  this.writeable = () => fs.access(filename, fs.constants.W_OK).then(access => true).catch(err => false)

  this.append = data => fs.appendFile(filename, data, { encoding })

  return this
}
