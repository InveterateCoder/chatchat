import { Dispatch } from 'redux'
import {
  login, setError,
} from './actions'
import {
  signin as signinRoute,
  signup as signupRoute,
} from '../../shared/apiRoutes'
import { iSignIn } from './types'

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

// export const changeUser = (setDisabled: (state: boolean) => void, form) => async (dispatch: Dispatch, getState: () => Store) => {
//   try {
//     setDisabled(true)
//     const { token } = getState()
//     const res = await fetch(changeUserRoute, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: form,
//     })
//     if (res.status === 401 || res.status === 403) {
//       dispatch(login({ token: null, auth: null }))
//       return
//     }
//     if (res.status !== 200) {
//       throw new Error(await res.text())
//     }

//     if (form.get('nick')) {
//       const { auth } = await res.json()
//       dispatch(setAuth(auth))
//     }
//     if (form.get('image')) {
//       dispatch(refreshAvatar())
//     }
//     dispatch(openSettings(false))
//   } catch (err) {
//     setDisabled(false)
//     dispatch(setError({ message: err.message, open: true }))
//   }
// }

// export const receiveAuth = () => async (dispatch: Dispatch, getState: () => Store) => {
//   try {
//     const { token } = getState()
//     const res = await fetch(authRoute, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (res.status === 401 || res.status === 403) {
//       dispatch(login({ token: null, auth: null }))
//       return
//     }
//     if (res.status !== 200) {
//       throw new Error(await res.text())
//     }
//     dispatch(setAuth(await res.json()))
//   } catch (err) {
//     dispatch(setError({ message: err.message, open: true }))
//   }
// }
