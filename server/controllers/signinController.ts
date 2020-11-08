import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel'
import errors from '../infrastracture/errors'
const { validateSignInForm } = require('../../shared/validators')

async function signinController(req: Request, res: Response) {
  const validity = validateSignInForm(req.body)
  if (!validity.valid) {
    return res.status(400).send(Object.values(validity.errors).filter((val) => val).join('\n'))
  }
  try {
    const user = await User.findOne({ nick: req.body.nick }).select({ image: 0 }).exec()
    if (user) {
      if (user.comparePassword(req.body.password)) {
        const jwtSecret = process.env.jwtSecret || 'a very very hard secret phrase'
        const token = jwt.sign(
          {
            data: { id: user._id },
          },
          jwtSecret,
          { expiresIn: 60 * 60 * 24 * 30 },
        )
        return res.send(token)
      } else {
        return res.status(400).send(errors.password)
      }
    } else {
      return res.status(400).send(errors.user)
    }
  } catch (error) {
    // return res.status(500).send(codes[500])
  }
  return res.status(500).send(errors[500])
}

export default signinController
