import {
  SET_DARK, SET_DRAWER_TYPE, SET_DRAWER_OPEN,
} from './actions'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_DARK:
      return { ...state, dark: action.payload }
    case SET_DRAWER_TYPE:
      return { ...state, dtype: action.payload, dopen: false }
    case SET_DRAWER_OPEN:
      return { ...state, dopen: action.payload }
    default:
      return state
  }
}
