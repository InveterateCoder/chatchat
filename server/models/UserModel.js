/* eslint-disable func-names */
const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
  nick: {
    type: String,
    required: true,
    minlength: [3, 'Nickname must be at least 3 characters long.'],
    maxlength: [40, 'Nickname must not be more than 40 characters long.'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
    enum: ['image/png', 'image/jpeg'],
  },
  image: {
    type: Buffer,
    required: true,
  },
})

UserSchema.plugin(uniqueValidator, { message: 'The name has been taken, try another one.' })

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    if (this.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.')
    }
    if (this.password.length > 128) {
      throw new Error('Password\'s length exceeds 128 characters.')
    }
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR)
  }
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = model('User', UserSchema)
