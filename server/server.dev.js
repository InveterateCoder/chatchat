require('source-map-support').install()
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const wpDevMiddleware = require('webpack-dev-middleware')
const wpHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const config = require('../webpack.config')[0]
const server = require('./server')

const app = express()

config.mode = 'development'
config.devtool = 'source-map'
config.entry.app.push('webpack-hot-middleware/client')
config.plugins = config.plugins || []
config.plugins.push(new webpack.HotModuleReplacementPlugin())
const compiler = webpack(config)
app.use(wpDevMiddleware(compiler))
app.use(wpHotMiddleware(compiler))

server(app)
