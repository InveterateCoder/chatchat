import { login, setError, refreshAvatar } from './actions'
import {
  signin as signinRoute,
  signup as signupRoute,
  changeUser as changeUserRoute,
} from '../../shared/apiRoutes'

export const signin = (load, data) => async (dispatch) => {
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
      const creds = await res.json()
      if (creds) {
        dispatch(login(creds))
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

export const signup = (load, form) => async (dispatch) => {
  try {
    load(true)
    const res = await fetch(signupRoute, {
      method: 'POST',
      body: form,
    })
    if (res.status === 200) {
      const creds = await res.json()
      if (creds) {
        dispatch(login(creds))
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

export const changeUser = (setDisabled, form) => async (dispatch, getState) => {
  try {
    setDisabled(true)
    const { creds } = getState()
    const res = await fetch(changeUserRoute, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.token}`,
      },
      body: form,
    })
    if (res.status === 401 || res.status === 403) {
      dispatch(login(null))
      return
    }
    if (res.status !== 200) {
      throw new Error(await res.text())
    }
    if (form.get('nick')) {
      dispatch(login({ ...creds, nick: form.get('nick') }))
    }
    if (form.get('image')) {
      dispatch(refreshAvatar())
    }
  } catch (err) {
    setDisabled(false)
    dispatch(setError({ message: err.message, open: true }))
  }
}
