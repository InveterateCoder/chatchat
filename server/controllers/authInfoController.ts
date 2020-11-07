import { Request, Response } from 'express'
import errors from '../infrastracture/errors'

function authInfoController(req: Request, res: Response) {
  try {
    res.json({ id: req.user.id, nick: req.user.nick })
  } catch (err) {
    res.status(500).send(errors[500])
  }
}

export default authInfoController
