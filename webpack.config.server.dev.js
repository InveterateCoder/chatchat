const config = require('./webpack.config')[1]

config.entry = './server/server.dev.js'
config.mode = 'development'
config.devtool = 'source-map'

module.exports = config
