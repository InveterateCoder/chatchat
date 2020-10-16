const { ObjectID } = require('mongodb')
const { getDb } = require('../infrastracture/db')

async function avatarController(req, res) {
  try {
    const db = getDb()
    const user = await db.collection('users').findOne({ _id: new ObjectID(req.params.id) })
    if (!user) {
      return res.status(404).end()
    }
    return res.contentType(user.imageType).send(user.image.buffer)
  } catch (err) {
    return res.status(404).end()
  }
}

module.exports = avatarController
