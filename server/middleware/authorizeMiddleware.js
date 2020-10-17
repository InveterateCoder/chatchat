const User = require('../models/UserModel')

async function authorizeMiddleware(req, res, next) {
  try {
    if (!req.user.isAuthenticated) return res.status(403).end()
    const user = await User.findById(req.user.authId)
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
