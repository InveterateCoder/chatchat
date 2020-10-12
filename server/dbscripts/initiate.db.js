/* eslint-disable no-undef */

db.users.remove({})

const admin = {
  nick: 'admin',
  password: '$2b$10$F0fB1F4xrRz7ezEfUDy7U.1reBsdj0oObEBvtlYHzmV17qGGcd0iC',
  imageName: '',
}

db.users.insertOne(admin)

db.users.createIndex({ nick: 1 }, { unique: true })
db.users.createIndex({ imageName: 1 })
