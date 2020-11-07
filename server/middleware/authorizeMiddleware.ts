import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel'

async function authorizeMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(403).end()
    const user = await User.findById(req.user.id, { nick: 1 }).exec()
    if (user) {
      req.user.nick = user.nick
      return next()
    }
    return res.status(401).end()
  } catch (err) {
    return next(err)
  }
}
export default authorizeMiddleware
