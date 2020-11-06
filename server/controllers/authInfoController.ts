import { Response } from 'express'
import { Req } from '../infrastracture/types'
import errors from '../infrastracture/errors'

function authInfoController(req: Req, res: Response) {
  try {
    res.json({ id: req.user.id, nick: req.user.nick })
  } catch (err) {
    res.status(500).send(errors[500])
  }
}

export default authInfoController
