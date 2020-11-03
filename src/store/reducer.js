import initialData from './initialData'
import {
  SET_DARK, SET_DRAWER_TYPE, SET_DRAWER_OPEN,
  LOGIN, LOGOUT, OPEN_SETTINGS, REFRESH_AVATAR,
  dType, SET_SIGNUP, SET_ERROR, SET_AVATAR,
} from './actions'
import memory from './memory'

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case SET_ERROR: {
      const error = { ...state.error, ...action.payload }
      return { ...state, error }
    }
    case SET_DARK:
      memory.dark = action.payload || ''
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
      memory.dark = null
      return {
        ...state,
        creds: null,
        dark: null,
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
