require('dotenv-expand')(require('dotenv').config())
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const { connect } = require('mongoose')
const apiRoutes = require('./infrastracture/apiRoutes')
const serverRoutes = require('./infrastracture/serverRoutes')
const authenticate = require('./middleware/authenticateMiddleware')

async function server(val) {
  const app = val || express()
  await await connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  console.log('connected to MongoDB at', process.env.dbURL)
  app
    .use(express.static(path.resolve(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet())
    .use(authenticate)
    .use(apiRoutes)
    .use(serverRoutes)

  const port = process.env.PORT || 8000
  app.listen(port, () => console.log(`server started on port ${port}`))
}

module.exports = server
