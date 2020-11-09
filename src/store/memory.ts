import { themeType } from '../../interfaces/storeTypes'

const names = {
  token: 'token',
  theme: 'theme',
}

class Memory {
  __token
  __theme
  constructor() {
    this.__token = JSON.parse(localStorage.getItem(names.token) || 'null')
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
