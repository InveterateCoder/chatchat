import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Req } from '../infrastracture/types'

async function authenticateMiddleware(req: Req, res: Response, next: NextFunction) {
  try {
    let token = req.header('Authorization')
    if (token) token = token.substring(7)
    else return next()
    const secret = process.env.jwtSecret || 'a very very hard secret phrase'
    const { data: { id } } = jwt.verify(token, secret)
    req.user = { id }
  } catch (err) {
    if (err.constructor !== jwt.JsonWebTokenError) {
      return next(err)
    }
  }
  return next()
}
export default authenticateMiddleware
