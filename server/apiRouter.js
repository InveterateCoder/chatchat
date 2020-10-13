const api = require('express').Router()
const formidable = require('formidable')
const Jimp = require('jimp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { signup, signin } = require('../shared/apiRoutes')
const { getDb } = require('./db')
const codes = require('./errorCode')
const { validateSignUpForm, validateSignInForm } = require('../shared/validators')

api.post(signup, (req, res) => {
  const form = formidable({ multiples: false })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send(codes[500])
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
      return res.status(400).send(codes.image)
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
        if (token) return res.send(token)
      }
    } catch (error) {
      if (error.code) {
        const text = codes[error.code]
        if (text) {
          return res.status(400).send(text)
        }
      }
    }
    return res.status(500).send(codes[500])
  })
})

api.post(signin, async (req, res) => {
  const validity = validateSignInForm(req.body)
  if (!validity.valid) {
    return res.status(400).send(Object.values(validity.errors).filter((val) => val).join('\n'))
  }
  const db = getDb()
  try {
    const user = await db.collection('users').findOne({ nick: req.body.nick })
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            data: {
              // eslint-disable-next-line no-underscore-dangle
              _id: user._id,
            },
          },
          process.env.jwtSecret,
          { expiresIn: 60 * 60 * 24 * 30 },
        )
        if (token) return res.send(token)
      } else {
        return res.status(400).send(codes.password)
      }
    } else {
      return res.status(400).send(codes.user)
    }
  } catch (error) {
    // return res.status(500).send(codes[500])
  }
  return res.status(500).send(codes[500])
})

module.exports = api
