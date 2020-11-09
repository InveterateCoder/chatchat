import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { setDark } from './actions'
import { themeType } from '../../interfaces/storeTypes'

const store = createStore(reducer, applyMiddleware(thunk))

const setAutoDark = ({ matches }: { matches: boolean }) => {
  const { theme } = store.getState()
  if (theme === themeType.auto) {
    store.dispatch(setDark(matches))
  }
}

const mediaMatch = window.matchMedia('(prefers-color-scheme: dark)')
mediaMatch.addEventListener('change', setAutoDark)

export const dispatch = store.dispatch
export const getState = store.getState

export default store
