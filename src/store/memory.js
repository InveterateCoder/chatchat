/* eslint-disable no-underscore-dangle */
class Memory {
  constructor() {
    this.__creds = JSON.parse(localStorage.getItem(Memory.names.creds))
    this.__dark = localStorage.getItem(Memory.names.dark)
  }

  get creds() {
    return this.__creds
  }

  set creds(creds) {
    if (!creds) {
      localStorage.removeItem(Memory.names.creds)
    } else {
      localStorage.setItem(Memory.names.creds, JSON.stringify(creds))
    }
    this.__creds = creds
  }

  get dark() {
    return this.__dark
  }

  set dark(dark) {
    if (!dark) {
      localStorage.removeItem(Memory.names.dark)
    } else {
      localStorage.setItem(Memory.names.dark, dark)
    }
    this.__dark = dark
  }
}

Memory.names = {
  creds: 'creds',
  dark: 'dark',
}

const memory = new Memory()

export default memory
