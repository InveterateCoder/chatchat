const { readFile } = require('fs/promises')
const express = require('express')
const formidable = require('formidable')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const { extension } = require('mime-types')
const jwt = require('jsonwebtoken')
const { signup, signin } = require('../shared/apiRoutes')
const { getDb } = require('./db')
const codes = require('./errorCode')
const { validateSignUpForm } = require('../shared/validators')

const api = express.Router()

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
    const user = {
      nick: fields.nick,
      password: await bcrypt.hash(fields.password, Number(process.env.saltRounds)),
      imageName: `${uuidv4() + Date.now()}.${extension(files.image.type)}`,
      image: await readFile(files.image.path),
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

api.post(signin, (req, res) => {
  console.log(req.body)
  res.end()
})

module.exports = api
