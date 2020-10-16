const formidable = require('formidable')
const Jimp = require('jimp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getDb } = require('../infrastracture/db')
const errors = require('../infrastracture/errors')
const { validateSignUpForm } = require('../../shared/validators')

async function signupController(req, res) {
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
    if (!['image/png', 'image/jpeg'].includes(files.image.type)) {
      return res.status(400).send(errors.image)
    }
    const user = {
      nick: fields.nick,
      password: await bcrypt.hash(fields.password, Number(process.env.saltRounds)),
      imageType: files.image.type,
      image: await Jimp.read(files.image.path)
        .then((image) => image.cover(500, 500).getBufferAsync(files.image.type)),
    }
    const db = getDb()
    try {
      const result = await db.collection('users').insertOne(user)
      if (result.insertedId) {
        const token = jwt.sign(
          {
            data: {
              _id: result.insertedId,
            },
          },
          process.env.jwtSecret,
          { expiresIn: 60 * 60 * 24 * 30 },
        )
        if (token) {
          return res.json({
            token,
            id: result.insertedId,
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
