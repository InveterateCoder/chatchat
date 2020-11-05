const User = require('../models/UserModel')

async function authorizeMiddleware(req, res, next) {
  try {
    if (!req.user) return res.status(403).end()
    const user = await User.findById(req.user.id).exec()
    if (user) {
      req.user.nick = user.nick
      return next()
    }
    return res.status(401).end()
  } catch (err) {
    return next(err)
  }
}
module.exports = authorizeMiddleware
