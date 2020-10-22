/* eslint-disable no-undef */

db.users.deleteMany({})
db.users.createIndex({ nick: 1 }, { unique: true })
