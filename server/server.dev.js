/* eslint-disable import/no-extraneous-dependencies */
require('source-map-support').install()
const express = require('express')
const wpDevMiddleware = require('webpack-dev-middleware')
const wpHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const open = require('open')
const config = require('../webpack.config')[0]
const server = require('./server')

const app = express()

config.mode = 'development'
config.devtool = 'source-map'
config.entry.app.push('webpack-hot-middleware/client')
config.plugins = config.plugins || []
config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
const compiler = webpack(config)
app.use(wpDevMiddleware(compiler))
app.use(wpHotMiddleware(compiler))

setTimeout(() => {
  open('http://localhost:8000')
}, 2000)

server(app)
