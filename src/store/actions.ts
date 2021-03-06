import { dType, AppError, Avatar } from '../../interfaces/storeTypes'
import { Auth } from '../../interfaces/socketTypes'

export const SET_ERROR = 'error'
export const setError = (err: AppError) => ({
  type: SET_ERROR,
  payload: err,
})

export const SET_CONNECTION_FAILED = 'set_con_failed'
export const setConFailed = (state: boolean) => ({
  type: SET_CONNECTION_FAILED,
  payload: state,
})

export const SET_THEME = 'set_theme'
export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
})

export const SET_DARK = 'set_dark'
export const setDark = (dark: boolean) => ({
  type: SET_DARK,
  payload: dark,
})

export const SET_DRAWER_TYPE = 'set_drawer_type'
export const setDrawerType = (sm: boolean, md: boolean) => {
  const type = SET_DRAWER_TYPE
  let payload
  if (sm) payload = dType.temporary
  else if (md) payload = dType.persistent
  else payload = dType.permanent
  return { type, payload }
}

export const SET_DRAWER_OPEN = 'set_drawer_open'
export const setDrawerOpen = (open: boolean) => ({
  type: SET_DRAWER_OPEN,
  payload: open,
})

export const SET_SIGNUP = 'set_signup'
export const setSignUP = (signup: boolean) => ({
  type: SET_SIGNUP,
  payload: signup,
})

export const LOGIN = 'login'
export const login = (token: string) => ({
  type: LOGIN,
  payload: token,
})

export const LOGOUT = 'logout'
export const logout = () => ({
  type: LOGOUT,
})

export const SET_AUTH = 'set_auth'
export const setAuth = (auth: Auth) => ({
  type: SET_AUTH,
  payload: auth,
})

export const SET_NICK = 'set_nick'
export const setNick = (nick: string) => ({
  type: SET_NICK,
  payload: nick
})

export const SET_URL = 'set_url'
export const setURL = (url: string) => ({
  type: SET_URL,
  payload: url,
})

export const OPEN_SETTINGS = 'open_settings'
export const openSettings = (state: boolean) => ({
  type: OPEN_SETTINGS,
  payload: state,
})

export const SET_AVATAR = 'set_avatar'
export const setAvatar = (avatar: Avatar) => ({
  type: SET_AVATAR,
  payload: avatar,
})
