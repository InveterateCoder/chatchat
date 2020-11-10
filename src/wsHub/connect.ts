import { dispatch } from '../store'
import { logout, setAuth, setConFailed } from '../store/actions'
import { Type, Package } from '../../interfaces/socketTypes'
import messageHub from './messageHub'

const connect = (token: string) => {
  if (window._WS && (window._WS.readyState === window._WS.OPEN || window._WS.readyState === window._WS.CONNECTING)) {
    window._WS.close()
    return
  }
  const loc = window.location
  let url = loc.protocol === 'https:' ? 'wss://' : 'ws://'
  url += loc.hostname
  url += `:${loc.port}/ws?token=` + token
  const ws = new window.WebSocket(url)
  window._WS = ws
  ws.onopen = function () {
    setTimeout(() => {
      const auth: Package<any> = {
        type: Type.AUTH,
        payload: undefined,
      }
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(auth))
      }
    }, 350)
  }
  ws.onmessage = messageHub
  ws.onclose = function (event) {
    if (event.code === 4001) {
      dispatch(logout())
    } else {
      if (window._WS) {
        window._WS = undefined
        dispatch(setAuth({ id: '', nick: '', url: '' }))
        dispatch(setConFailed(true))
      }
    }
  }
}

export default connect
