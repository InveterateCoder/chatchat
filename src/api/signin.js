import { dispatch } from '../store'
import { signin as signinRoute } from '../../shared/apiRoutes'
import { login } from '../store/actions'

async function signin(data) {
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
}
export default signin
