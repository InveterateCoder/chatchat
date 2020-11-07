import { themeType } from './types'

const names = {
  token: 'token',
  theme: 'theme',
  auth: 'auth',
}

class Memory {
  __token
  __auth
  __theme
  constructor() {
    this.__token = JSON.parse(localStorage.getItem(names.token) || 'null')
    this.__auth = JSON.parse(sessionStorage.getItem(names.auth) || 'null')
    let theme = localStorage.getItem(names.theme)
    if (theme) {
      this.__theme = theme
    } else {
      theme = themeType.auto
      localStorage.setItem(names.theme, theme)
      this.__theme = theme
    }
  }

  get token() {
    return this.__token
  }

  set token(token) {
    if (!token) {
      localStorage.removeItem(names.token)
    } else {
      localStorage.setItem(names.token, JSON.stringify(token))
    }
    this.__token = token
  }

  get auth() {
    return this.__auth
  }

  set auth(auth) {
    if (!auth) {
      sessionStorage.removeItem(names.auth)
    } else {
      sessionStorage.setItem(names.auth, JSON.stringify(auth))
    }
    this.__auth = auth
  }

  get theme() {
    return this.__theme
  }

  set theme(theme) {
    localStorage.setItem(names.theme, theme)
    this.__theme = theme
  }
}

const memory = new Memory()

export default memory
