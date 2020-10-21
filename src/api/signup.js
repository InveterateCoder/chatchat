import { dispatch } from '../store'
import { signup as signupRoute } from '../../shared/apiRoutes'
import { login } from '../store/actions'

async function signup(form) {
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
}
export default signup
