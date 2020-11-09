import { Reducer } from 'redux'
import initialData from './initialData'
import {
  SET_THEME, SET_DRAWER_TYPE, SET_DRAWER_OPEN,
  LOGIN, LOGOUT, OPEN_SETTINGS, REFRESH_AVATAR,
  SET_SIGNUP, SET_ERROR, SET_AVATAR, SET_DARK,
  SET_AUTH, SET_NICK, SET_CONNECTION_FAILED
} from './actions'
import memory from './memory'
import { themeType, dType, Store, Action } from '../../interfaces/storeTypes'

function getDark() {
  if (memory.theme === themeType.auto) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return memory.theme === themeType.dark
}

const reducer: Reducer<Store, Action> = (state = initialData, action): Store => {
  switch (action.type) {
    case SET_ERROR: {
      const error = { ...state.error, ...action.payload }
      return { ...state, error }
    }
    case SET_CONNECTION_FAILED:
      return { ...state, conFailed: action.payload }
    case SET_THEME:
      memory.theme = action.payload || themeType.auto
      return { ...state, theme: memory.theme, dark: getDark() }
    case SET_DARK:
      return { ...state, dark: action.payload }
    case SET_DRAWER_TYPE:
      return {
        ...state,
        dtype: action.payload,
        dopen: action.payload !== dType.temporary,
      }
    case SET_DRAWER_OPEN:
      return { ...state, dopen: action.payload }
    case SET_SIGNUP:
      return { ...state, signup: action.payload }
    case LOGIN: {
      const token = action.payload
      memory.token = token
      return { ...state, token }
    }
    case SET_AUTH: {
      const { id, nick } = action.payload
      return { ...state, id, nick }
    }
    case SET_NICK: {
      return { ...state, nick: action.payload }
    }
    case LOGOUT:
      memory.token = null
      memory.theme = themeType.auto
      window._WS?.close()
      window._WS = undefined
      return {
        ...state,
        token: '',
        id: '',
        nick: '',
        theme: themeType.auto,
        signup: false,
        sopen: false,
        conFailed: false,
      }
    case OPEN_SETTINGS:
      return { ...state, sopen: action.payload }
    case SET_AVATAR:
      return { ...state, avatar: { ...state.avatar, ...action.payload } }
    case REFRESH_AVATAR:
      return { ...state, refava: action.payload }
    default:
      return state
  }
}

export default reducer
