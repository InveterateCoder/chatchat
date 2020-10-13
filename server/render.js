const path = require('path')
const render = require('express').Router()
const { ObjectID } = require('mongodb')
const auth = require('./middleware/authMiddleware')
const { getDb } = require('./db')
const codes = require('./errorCode')

render.get('/avatar/:id?', auth, async (req, res) => {
  try {
    const db = getDb()
    const user = await db.collection('users').findOne({ _id: new ObjectID(req.params.id || req.userId) })
    if (!user) {
      return res.status(400).send(codes.user)
    }
    res.contentType(user.imageType).send(user.image.buffer)
  // eslint-disable-next-line no-empty
  } catch (err) {}
  return res.status(500).send(codes[500])
})

render.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

module.exports = render
