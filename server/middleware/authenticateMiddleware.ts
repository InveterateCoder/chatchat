import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.header('Authorization')
    if (token) token = token.substring(7)
    else return next()
    const secret = process.env.jwtSecret || 'a very very hard secret phrase'
    const { data: { id } } = <any>jwt.verify(token, secret)
    req.user = { id }
  } catch (err) {
    if (err.constructor !== jwt.JsonWebTokenError) {
      return next(err)
    }
  }
  return next()
}
export default authenticateMiddleware
