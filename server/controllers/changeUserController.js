const formidable = require('formidable')
const Jimp = require('jimp')
const User = require('../models/UserModel')
const errors = require('../infrastracture/errors')
const { validateChangeUserForm } = require('../../shared/validators')

function changeUserController(req, res) {
  const user = req.user.doc
  const form = formidable({ multiples: false })
  form.parse(req, async (err, fields, files) => {
    const { nick } = fields
    const validity = validateChangeUserForm({ nick: nick || user.nick, image: files.image })
    if (!validity.valid) {
      return res.status(400).send(Object.values(validity.errors).filter((val) => val).join('\n'))
    }
    const update = {}
    if (files.image && files.image.size > 0) {
      update.imageType = files.image.type
      update.image = await Jimp.read(files.image.path)
        .then((img) => img.cover(500, 500)
          .getBufferAsync(files.image.type))
    }
    if (nick && nick !== user.nick) {
      update.nick = nick
    }
    if (Object.keys(update).length === 0) {
      return res.status(400).send(errors.noChange)
    }
    // update db here
    console.log(update)
    res.end()
  })
}

module.exports = changeUserController
