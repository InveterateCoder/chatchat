/* eslint-disable no-underscore-dangle */
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const Jimp = require('jimp')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const errors = require('../infrastracture/errors')
const { validateImageExist, validateImageType } = require('../../shared/validators')

function signupController(req, res) {
  const form = formidable({ multiples: false, uploadDir: path.resolve(__dirname, 'tmp') })
  form.parse(req, async (err, fields, files) => {
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
      const token = jwt.sign(
        {
          data: {
            id: doc._id,
            nick: doc.nick,
          },
        },
        process.env.jwtSecret,
        { expiresIn: 60 * 60 * 24 * 30 },
      )
      if (token) {
        return res.json({
          token,
          id: doc._id,
          nick: doc.nick,
        })
      }
    } catch (error) {
      if (error.errors) {
        return res.status(400).send(Object.entries(error.errors).map(([, e]) => e.message).join('\n'))
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
