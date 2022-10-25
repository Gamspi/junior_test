const { merge } = require('webpack-merge')
const { configBase } = require('./config.base')
const { configDev } = require('./config.dev')
const { configProd } = require('./config.prod')

module.exports = (env) => {
  if (env.development) {
    return merge(configBase, configDev)
  } else if (env.production) {
    return merge(configBase, configProd)
  }
  throw new Error('no matching configuration was found :(((((')
}
