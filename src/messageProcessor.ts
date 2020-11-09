import { Type, Auth, ChangeUser } from '../interfaces/socketTypes'
import { dispatch } from './store'
import { setAuth, setNick, refreshAvatar, setError, openSettings } from './store/actions'


function messageProcessor(ws: any, event: MessageEvent) {
  try {
    const { type, payload }: { type: string, payload: any } = JSON.parse(event.data)
    switch (type) {
      case Type.AUTH: {
        const auth = payload as Auth
        window._WS = ws
        dispatch(setAuth(auth))
        break;
      }
      case Type.CHANGE_USER: {
        const user = payload as ChangeUser
        if (user.nick) {
          dispatch(setNick(user.nick))
        }
        if (user.image) {
          dispatch(refreshAvatar())
        }
        dispatch(openSettings(false))
      }
    }
  } catch (err) {
    dispatch(setError({ message: err.message, open: true }))
  }
}
export default messageProcessor
