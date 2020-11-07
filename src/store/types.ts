import { Action as ReduxAction } from 'redux'

// drawer type
export const dType = {
  permanent: 'm',
  persistent: 's',
  temporary: 't',
}

export const themeType = {
  auto: 'a',
  light: 'l',
  dark: 'd',
}

export interface Action extends ReduxAction {
  type: string,
  payload?: any
}

export interface Store {
  error: {
    message: string,
    open: boolean,
  },
  theme: string, // dark mode
  dark: boolean, // drawer type
  dtype: string, // drawer open state
  dopen: boolean, // drawer open state
  signup: boolean, // weather to sign up or in
  token: string, // user credentials
  auth: {
    id: string,
    nick: string,
  }, // user credentials, retrieved from ther server
  sopen: boolean, // settings open state
  avatar: {
    url: string,
    open: boolean,
  },
  refava: string, // refresh avatars by appending random data to the URLs
}