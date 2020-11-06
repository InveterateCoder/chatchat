import { Request, Response } from 'express'
import User from '../models/UserModel'

async function avatarController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id).exec()
    if (!user) {
      return res.status(404).end()
    }
    return res.contentType(user.imageType).send(user.image)
  } catch (err) {
    return res.status(404).end()
  }
}

export default avatarController
