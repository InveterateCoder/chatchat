const path = require('path')
const render = require('express').Router()
const { ObjectID } = require('mongodb')
const { getDb } = require('./db')
const codes = require('./errorCode')

render.get('/avatar/:id', async (req, res) => {
  try {
    const db = getDb()
    const user = await db.collection('users').findOne({ _id: new ObjectID(req.params.id) })
    if (!user) {
      return res.status(404).end()
    }
    return res.contentType(user.imageType).send(user.image.buffer)
  } catch (err) {
    return res.status(500).send(codes[500])
  }
})

render.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

module.exports = render
