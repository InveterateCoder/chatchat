import initialData from './initialData'
import {
  SET_THEME, SET_DRAWER_TYPE, SET_DRAWER_OPEN,
  LOGIN, LOGOUT, OPEN_SETTINGS, REFRESH_AVATAR,
  SET_SIGNUP, SET_ERROR, SET_AVATAR, SET_DARK,
} from './actions'
import memory from './memory'
import { themeType, dType } from './types'

function getDark() {
  if (memory.theme === themeType.auto) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return memory.theme === themeType.dark
}

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case SET_ERROR: {
      const error = { ...state.error, ...action.payload }
      return { ...state, error }
    }
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
    case LOGIN:
      memory.creds = action.payload
      return { ...state, creds: action.payload }
    case LOGOUT:
      memory.creds = null
      memory.theme = themeType.auto
      return {
        ...state,
        creds: null,
        theme: themeType.auto,
        signup: false,
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
