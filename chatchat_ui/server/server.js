require('dotenv').config()
const path = require('path')
const express = require('express')
const render = require('./render.jsx').default

function server(val) {
  const app = val || express()
  app.set('view engine', 'ejs')

  app.use(express.static(path.resolve(__dirname, 'public')))
  app.get('*', render)

  const port = process.env.PORT || 8000
  app.listen(port, console.log(`server started on port ${port}`))
}

module.exports = server
