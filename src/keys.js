/* eslint-disable no-underscore-dangle */
class Keys {
  constructor() {
    this.__token = localStorage.getItem(Keys.names.token)
  }

  get token() {
    return this.__token
  }

  set token(token) {
    localStorage.setItem(Keys.names.token, token)
    this.__token = token
  }
}

Keys.names = {
  token: 'api_token',
}

const keys = new Keys()

export default keys
