import path from 'path'
import { Response } from 'express'
import fs from 'fs'
import Jimp from 'jimp'
import User from '../models/UserModel'
import { Req } from '../infrastracture/types'
import errors from '../infrastracture/errors'
const { validateImageExist, validateImageType } = require('../../shared/validators')
const formidable = require('formidable')

function changeUserController(req: Req, res: Response) {
  const form = formidable({ multiples: false, uploadDir: path.resolve(__dirname, 'tmp') })
  form.parse(req, async (err: any, fields: any, files: any) => {
    let clean = false
    if (err) {
      return res.status(500).send(errors[500])
    }
    try {
      const { nick } = fields
      const update: {
        nick?: String,
        imageType?: String,
        image?: Buffer
      } = {}
      if (nick && nick !== req.user.nick) {
        update.nick = nick
      }
      let valErr = validateImageExist(files.image)
      if (!valErr) {
        clean = true
        valErr = validateImageType(files.image)
        if (valErr) {
          return res.status(400).send(valErr)
        }
        update.imageType = files.image.type
        update.image = await Jimp.read(files.image.path)
          .then((img) => img.cover(500, 500)
            .getBufferAsync(files.image.type))
      }
      if (Object.keys(update).length === 0) {
        return res.status(400).send(errors.noChange)
      }
      const doc = await User.findByIdAndUpdate(req.user.id, update, { new: true }).exec()
      req.user.nick = doc?.nick
      return res.json({ auth: { id: doc?._id, nick: doc?.nick } })
    } catch (error) {
      if (error.code) {
        const text = errors[error.code]
        if (text) {
          return res.status(400).send(text)
        }
      }
    } finally {
      if (clean) {
        fs.unlinkSync(files.image.path)
      }
    }
    return res.status(500).send(errors[500])
  })
}

module.exports = changeUserController