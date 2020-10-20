const formidable = require('formidable')
const Jimp = require('jimp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const errors = require('../infrastracture/errors')
const { validateSignUpForm } = require('../../shared/validators')

function signupController(req, res) {
  const form = formidable({ multiples: false })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send(errors[500])
    }
    const validity = validateSignUpForm({
      nick: fields.nick,
      password: fields.password,
      confirm: fields.confirm,
      image: files.image,
    })
    if (!validity.valid) {
      return res.status(400).send(Object.values(validity.errors).filter((val) => val).join('\n'))
    }
    const user = {
      nick: fields.nick,
      password: await bcrypt.hash(fields.password, Number(process.env.saltRounds)),
      imageType: files.image.type,
      image: await Jimp.read(files.image.path)
        .then((image) => image.cover(500, 500).getBufferAsync(files.image.type)),
    }
    try {
      const insertedId = await User.add(user)
      if (insertedId) {
        const token = jwt.sign(
          {
            data: {
              _id: insertedId,
            },
          },
          process.env.jwtSecret,
          { expiresIn: 60 * 60 * 24 * 30 },
        )
        if (token) {
          return res.json({
            token,
            id: insertedId,
            nick: user.nick,
          })
        }
      }
    } catch (error) {
      if (error.code) {
        const text = errors[error.code]
        if (text) {
          return res.status(400).send(text)
        }
      }
    }
    return res.status(500).send(errors[500])
  })
}

module.exports = signupController
