/* eslint-disable no-underscore-dangle */
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const Jimp = require('jimp')
const User = require('../models/UserModel')
const errors = require('../infrastracture/errors')
const { validateImageExist, validateImageType } = require('../../shared/validators')

function changeUserController(req, res) {
  const form = formidable({ multiples: false, uploadDir: path.resolve(__dirname, 'tmp') })
  form.parse(req, async (err, fields, files) => {
    let clean = false
    if (err) {
      return res.status(500).send(errors[500])
    }
    try {
      const { nick } = fields
      const update = {}
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
      await User.findByIdAndUpdate(req.user.id, update).exec()
      return res.end()
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
