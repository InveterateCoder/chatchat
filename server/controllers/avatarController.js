const User = require('../models/UserModel')

async function avatarController(req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).end()
    }
    return res.contentType(user.imageType).send(user.image.buffer)
  } catch (err) {
    return res.status(404).end()
  }
}

module.exports = avatarController
