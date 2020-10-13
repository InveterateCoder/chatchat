const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  try {
    let token = req.header('Authorization')
    if (token) token = token.substring(7)
    else return res.status(403).end()
    const { data: { _id } } = jwt.verify(token, process.env.jwtSecret)
    req.userId = _id
    return next()
  } catch (err) {
    if (err.constructor === jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return next(err)
  }
}
module.exports = authMiddleware
