import { SET_DARK } from './actions'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_DARK:
      return { ...state, dark: action.payload }
    default:
      return state
  }
}
