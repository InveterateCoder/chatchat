import path from 'path'
import { Request, Response } from 'express'

function renderController(req: Request, res: Response) {
  if (req.url !== '/') {
    res.redirect('/')
    return
  }
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
}

export default renderController
