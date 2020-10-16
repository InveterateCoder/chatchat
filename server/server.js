require('dotenv').config()
const path = require('path')
const express = require('express')
const apiRoutes = require('./infrastracture/apiRoutes')
const serverRoutes = require('./infrastracture/serverRoutes')
const { connectDb } = require('./infrastracture/db')
const authenticate = require('./middleware/authenticateMiddleware')

async function server(val) {
  const app = val || express()
  await connectDb()
  app
    .use(express.static(path.resolve(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(authenticate)
    .use(apiRoutes)
    .use(serverRoutes)

  const port = process.env.PORT || 8000
  app.listen(port, console.log(`server started on port ${port}`))
}

module.exports = server
