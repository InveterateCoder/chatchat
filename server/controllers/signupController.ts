import path from 'path'
import { Request, Response } from 'express'
import fs from 'fs'
import Jimp from 'jimp'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel'
import errors from '../infrastracture/errors'
const { validateImageExist, validateImageType } = require('../../shared/validators')
const formidable = require('formidable')

function signupController(req: Request, res: Response) {
  const form = formidable({ multiples: false, uploadDir: path.resolve(__dirname, 'tmp') })
  form.parse(req, async (err: any, fields: any, files: any) => {
    let clean = false
    if (err) {
      return res.status(500).send(errors[500])
    }
    let valErr = validateImageExist(files.image)
    if (valErr) {
      return res.status(400).send(valErr)
    }
    clean = true
    valErr = validateImageType(files.image)
    if (valErr) {
      return res.status(400).send(valErr)
    }
    if (fields.password !== fields.confirm) {
      return res.status(400).send(errors[400])
    }
    const img = await Jimp.read(files.image.path)
      .then((image) => image.cover(500, 500).getBufferAsync(files.image.type))
    try {
      const user = new User({
        nick: fields.nick,
        password: fields.password,
        imageType: files.image.type,
        image: img,
      })
      const doc = await user.save()
      const jwtSecret = process.env.jwtSecret || 'a very very hard secret phrase'
      const token = jwt.sign(
        {
          data: { id: doc._id },
        },
        jwtSecret,
        { expiresIn: 60 * 60 * 24 * 30 },
      )
      if (token) {
        return res.json({ token, auth: { id: doc._id, nick: doc.nick } })
      }
    } catch (error) {
      if (error.errors) {
        return res.status(400).send(Object.entries(error.errors).map(([k, e]: [k: any, e: any]) => e.message).join('\n'))
      }
    } finally {
      if (clean) {
        fs.unlinkSync(files.image.path)
      }
    }
    return res.status(500).send(errors[500])
  })
}

module.exports = signupController
