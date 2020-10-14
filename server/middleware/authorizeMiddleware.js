const { ObjectID } = require('mongodb')
const { getDb } = require('../db')

async function authorizeMiddleware(req, res, next) {
  try {
    if (!req.user.isAuthenticated) return res.status(403).end()
    const db = getDb()
    const user = await db.collection('users').find({ _id: new ObjectID(req.user.authId) })
    if (!user) {
      return res.status(401).end()
    }
    req.user.info = user
    return next()
  } catch (err) {
    return next(err)
  }
}
module.exports = authorizeMiddleware
