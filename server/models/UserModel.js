const { ObjectID } = require('mongodb')

const UserModel = {
  get users() {
    return global.db.collection('users')
  },
  findById: (id) => UserModel.users.findOne({ _id: ObjectID(id) }),
  findByNick: (nick) => UserModel.users.findOne({ nick }),
  add: async (user) => {
    const result = await UserModel.users.insertOne(user)
    return result.insertedId
  },
  update: (id, data) => UserModel.users.updateOne({ _id: ObjectID(id) }, { $set: data }),
}

module.exports = UserModel
