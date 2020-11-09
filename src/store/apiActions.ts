import { Dispatch } from 'redux'
import {
  login, setError,
} from './actions'
import {
  signin as signinRoute,
  signup as signupRoute,
} from '../../shared/apiRoutes'
import { iSignIn } from '../../interfaces/storeTypes'

export const signin = (load: (state: boolean) => void, data: iSignIn) => async (dispatch: Dispatch) => {
  try {
    load(true)
    const res = await fetch(signinRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      const token = await res.text()
      if (token) {
        dispatch(login(token))
      } else {
        throw new Error('Something went wrong, please try again.')
      }
    } else {
      throw new Error(await res.text())
    }
  } catch (err) {
    load(false)
    dispatch(setError({ message: err.message, open: true }))
  }
}

export const signup = (load: (state: boolean) => void, form: FormData) => async (dispatch: Dispatch) => {
  try {
    load(true)
    const res = await fetch(signupRoute, {
      method: 'POST',
      body: form,
    })
    if (res.status === 200) {
      const token = await res.text()
      if (token) {
        dispatch(login(token))
      } else {
        throw new Error('Something went wrong, please try again.')
      }
    } else {
      throw new Error(await res.text())
    }
  } catch (err) {
    load(false)
    dispatch(setError({ message: err.message, open: true }))
  }
}
