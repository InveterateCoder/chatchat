import { dispatch } from '../../store'
import { setAuth } from '../../store/actions'
import { Auth } from '../../../interfaces/socketTypes'

function authenticate(payload: any) {
  const auth = payload as Auth
  dispatch(setAuth(auth))
}

export default authenticate
