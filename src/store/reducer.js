import initialData from './initialData'
import {
  SET_DARK, SET_DRAWER_TYPE, SET_DRAWER_OPEN,
  SET_SIGN_TYPE
} from './actions'
import memory from './memory'

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case SET_DARK:
      memory.dark = action.payload || ''
      return { ...state, dark: action.payload }
    case SET_DRAWER_TYPE:
      return { ...state, dtype: action.payload, dopen: false }
    case SET_DRAWER_OPEN:
      return { ...state, dopen: action.payload }
    case SET_SIGN_TYPE:
      return { ...state, sign: action.payload }
    default:
      return state
  }
}
