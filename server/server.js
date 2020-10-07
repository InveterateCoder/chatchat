require('dotenv').config()
require('dotenv').config()
const path = require('path')
const express = require('express')
const render = require('./render')

function server(val) {
  const app = val || express()

  app.use(express.static(path.resolve(__dirname, 'public')))
  app.get('/', render)
  app.use('*', (req, res) => {
    res.status(404).end()
  })
  const port = process.env.PORT || 8000
  app.listen(port, console.log(`server started on port ${port}`))
}

module.exports = server
