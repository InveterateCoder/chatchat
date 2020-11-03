const jwt = require('jsonwebtoken')

async function authenticateMiddleware(req, res, next) {
  try {
    req.user = { isAuthenticated: false }
    let token = req.header('Authorization')
    if (token) token = token.substring(7)
    else return next()
    const { data: { id, nick } } = jwt.verify(token, process.env.jwtSecret)
    req.user = {
      id,
      nick,
    }
  } catch (err) {
    if (err.constructor !== jwt.JsonWebTokenError) {
      return next(err)
    }
  }
  return next()
}
module.exports = authenticateMiddleware
