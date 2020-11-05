const errors = require('../infrastracture/errors')

function authInfoController(req, res) {
  try {
    res.json({ id: req.user.id, nick: req.user.nick })
  } catch (err) {
    res.status(500).send(errors[500])
  }
}

module.exports = authInfoController
