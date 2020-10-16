/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getDb } = require('../infrastracture/db')
const errors = require('../infrastracture/errors')
const { validateSignInForm } = require('../../shared/validators')

async function signinController(req, res) {
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
              _id: user._id,
            },
          },
          process.env.jwtSecret,
          { expiresIn: 60 * 60 * 24 * 30 },
        )
        if (token) {
          return res.send({
            token,
            id: user._id,
            nick: user.nick,
          })
        }
      } else {
        return res.status(400).send(errors.password)
      }
    } else {
      return res.status(400).send(errors.user)
    }
  } catch (error) {
    // return res.status(500).send(codes[500])
  }
  return res.status(500).send(errors[500])
}

module.exports = signinController
