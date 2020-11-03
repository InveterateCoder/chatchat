const User = require('../models/UserModel')

async function authorizeMiddleware(req, res, next) {
  try {
    if (!req.user) return res.status(403).end()

    if (User.exists({ _id: req.user.id })) {
      return next()
    }
    return res.status(401).end()
  } catch (err) {
    return next(err)
  }
}
module.exports = authorizeMiddleware
