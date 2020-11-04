/* eslint-disable no-underscore-dangle */
import { themeType } from './types'

class Memory {
  constructor() {
    this.__creds = JSON.parse(localStorage.getItem(Memory.names.creds))
    let theme = localStorage.getItem(Memory.names.theme)
    if (theme) {
      this.__theme = theme
    } else {
      theme = themeType.auto
      localStorage.setItem(Memory.names.theme, theme)
      this.__theme = theme
    }
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

  get theme() {
    return this.__theme
  }

  set theme(theme) {
    localStorage.setItem(Memory.names.theme, theme)
    this.__theme = theme
  }
}

Memory.names = {
  creds: 'creds',
  theme: 'theme',
}

const memory = new Memory()

export default memory
