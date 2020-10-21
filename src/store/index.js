import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
export const { dispatch } = store
export const { getState } = store
export default store
