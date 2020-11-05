/* eslint-disable no-underscore-dangle */
import { themeType } from './types'

class Memory {
  constructor() {
    this.__token = JSON.parse(localStorage.getItem(Memory.names.token))
    this.__auth = JSON.parse(sessionStorage.getItem(Memory.names.auth))
    let theme = localStorage.getItem(Memory.names.theme)
    if (theme) {
      this.__theme = theme
    } else {
      theme = themeType.auto
      localStorage.setItem(Memory.names.theme, theme)
      this.__theme = theme
    }
  }

  get token() {
    return this.__token
  }

  set token(token) {
    if (!token) {
      localStorage.removeItem(Memory.names.token)
    } else {
      localStorage.setItem(Memory.names.token, JSON.stringify(token))
    }
    this.__token = token
  }

  get auth() {
    return this.__auth
  }

  set auth(auth) {
    if (!auth) {
      sessionStorage.removeItem(Memory.names.auth)
    } else {
      sessionStorage.setItem(Memory.names.auth, JSON.stringify(auth))
    }
    this.__auth = auth
  }

  get theme() {
    return this.__theme
  }

  set theme(theme) {
    localStorage.setItem(Memory.names.theme, theme)
    this.__theme = theme
  }
}

Memory.names = {
  token: 'token',
  theme: 'theme',
  auth: 'auth',
}

const memory = new Memory()

export default memory
