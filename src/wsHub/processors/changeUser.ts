import { ChangeUser } from '../../../interfaces/socketTypes'
import { dispatch } from '../../store'
import { setNick, setURL, openSettings } from '../../store/actions'

function changeUser(payload: any) {
  const user = payload as ChangeUser
  if (user.nick) {
    dispatch(setNick(user.nick))
  }
  if (user.url) {
    dispatch(setURL(user.url))
  }
  dispatch(openSettings(false))
}
export default changeUser
