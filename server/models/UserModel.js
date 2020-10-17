const { ObjectID } = require('mongodb')

const UserModel = {
  get users() {
    return global.db.collection('users')
  },
  findById: (_id) => UserModel.users.findOne({ _id: ObjectID(_id) }),
  findByNick: (nick) => UserModel.users.findOne({ nick }),
  add: async (user) => {
    const result = await UserModel.users.insertOne(user)
    return result.insertedId
  },
}

module.exports = UserModel
