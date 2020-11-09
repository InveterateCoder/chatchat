import { Type, Auth, ChangeUser } from '../../interfaces/socketTypes'
import { dispatch } from '../store'
import { setAuth, setNick, setError, openSettings, setURL } from '../store/actions'


function messageProcessor(event: MessageEvent) {
  try {
    const { type, payload }: { type: string, payload: any } = JSON.parse(event.data)
    switch (type) {
      case Type.AUTH: {
        const auth = payload as Auth
        dispatch(setAuth(auth))
        break;
      }
      case Type.CHANGE_USER: {
        const user = payload as ChangeUser
        if (user.nick) {
          dispatch(setNick(user.nick))
        }
        if (user.url) {
          dispatch(setURL(user.url))
        }
        dispatch(openSettings(false))
      }
    }
  } catch (err) {
    dispatch(setError({ message: err.message, open: true }))
  }
}
export default messageProcessor
