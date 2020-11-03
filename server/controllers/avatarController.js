const User = require('../models/UserModel')

async function avatarController(req, res) {
  try {
    const user = await User.findById(req.params.id).exec()
    if (!user) {
      return res.status(404).end()
    }
    return res.contentType(user.imageType).send(user.image)
  } catch (err) {
    return res.status(404).end()
  }
}

module.exports = avatarController
