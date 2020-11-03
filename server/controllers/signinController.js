/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const errors = require('../infrastracture/errors')
const { validateSignInForm } = require('../../shared/validators')

async function signinController(req, res) {
  const validity = validateSignInForm(req.body)
  if (!validity.valid) {
    return res.status(400).send(Object.values(validity.errors).filter((val) => val).join('\n'))
  }
  try {
    // const user = await User.findByNick(req.body.nick)
    const user = await User.findOne({ nick: req.body.nick }).exec()
    if (user) {
      if (user.comparePassword(req.body.password)) {
        const token = jwt.sign(
          {
            data: {
              id: user._id,
              nick: user.nick,
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
