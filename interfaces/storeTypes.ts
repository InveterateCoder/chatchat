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

export interface AppError {
  message?: string,
  open: boolean,
}

export interface Avatar {
  url?: string,
  open: boolean,
}

export interface Store {
  id: string,
  nick: string,
  url: string, // url of the user's avatar
  error: AppError, // app error
  conFailed: boolean, // connection state
  theme: string, // dark mode
  dark: boolean, // drawer type
  dtype: string, // drawer open state
  dopen: boolean, // drawer open state
  signup: boolean, // weather to sign up or in
  token: string, // user credentials
  sopen: boolean, // settings open state
  avatar: Avatar, // avatar to be shown
}

export interface iSignIn {
  [key: string]: string,
  nick: string,
  password: string,
}