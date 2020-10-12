const { readFile } = require('fs/promises')
const express = require('express')
const formidable = require('formidable')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const { extension } = require('mime-types')
const { signup } = require('../shared/apiRoutes')
const { getDb } = require('./db')

const api = express.Router()

api.post(signup, (req, res) => {
  const form = formidable({ multiples: false })
  form.parse(req, async (err, fields, files) => {
    const user = {
      nick: fields.nick,
      password: await bcrypt.hash(fields.password, Number(process.env.saltRounds)),
      imageName: `${uuidv4() + Date.now()}.${extension(files.image.type)}`,
      image: await readFile(files.image.path),
    }
    const db = getDb()
    try {
      const result = await db.collection('users').insertOne(user)
      console.log(result)
    } catch (error) {
      console.log(error.message)
    }
    res.end()
  })
})

module.exports = api
