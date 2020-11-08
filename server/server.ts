import dotenv from 'dotenv'
import dotnevExpand from 'dotenv-expand'
import path from 'path'
import express from 'express'
import helmet from 'helmet'
import { connect } from 'mongoose'
import { connectWS } from './ws/wsHub'
import apiRoutes from './infrastracture/apiRoutes'
import serverRoutes from './infrastracture/serverRoutes'

dotnevExpand(dotenv.config())

async function server(val = express()) {
  const app = val
  const dbURL = process.env.dbURL || 'mongodb://localhost/chatchat'
  await await connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  console.log('connected to MongoDB at', dbURL)
  app
    .use(express.static(path.resolve(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet())
    .use(apiRoutes)
    .use(serverRoutes)

  const port = process.env.PORT || 8000
  const servr = app.listen(port, () => console.log(`server started on port ${port}`))
  connectWS(servr)
}

export default server
