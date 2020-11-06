require('source-map-support').install()
const wpconfig = require('../webpack.config')
import express from 'express'
import wpDevMiddleware from 'webpack-dev-middleware'
import wpHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import open from 'open'
import server from './server'

const app = express()

const config = wpconfig[0]
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
