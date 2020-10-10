/* eslint-disable no-underscore-dangle */
class Memory {
  constructor() {
    this.__token = localStorage.getItem(Memory.names.token)
    this.__dark = localStorage.getItem(Memory.names.dark)
  }

  get token() {
    return this.__token
  }

  set token(token) {
    localStorage.setItem(Memory.names.token, token)
    this.__token = token
  }

  get dark() {
    return this.__dark
  }

  set dark(dark) {
    localStorage.setItem(Memory.names.dark, dark)
    this.__dark = dark
  }
}

Memory.names = {
  token: 'api_token',
  dark: 'dark',
}

const memory = new Memory()

export default memory
