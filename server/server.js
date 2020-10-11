require('dotenv').config()
const path = require('path')
const express = require('express')
const apiRouter = require('./apiRouter')
const render = require('./render')
const { connectDb } = require('./db')

async function server(val) {
  const app = val || express()
  await connectDb()
  app
    .use(express.static(path.resolve(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(apiRouter)
    .use(render)

  const port = process.env.PORT || 8000
  app.listen(port, console.log(`server started on port ${port}`))
}

module.exports = server
