import { dispatch } from '../store'
import { logout, setAuth, setConFailed } from '../store/actions'
import { Type, Package } from '../../interfaces/socketTypes'
import messageProcessor from '../infrastructure/messageProcessor'

const connect = (token: string) => {
  const loc = window.location
  let url = loc.protocol === 'https:' ? 'wss://' : 'ws://'
  url += loc.hostname
  url += `:${loc.port}/ws?token=` + token
  const ws = new window.WebSocket(url)

  ws.onopen = function () {
    setTimeout(() => {
      const auth: Package<any> = {
        type: Type.AUTH,
        payload: undefined,
      }
      ws.send(JSON.stringify(auth))
    }, 350)
  }
  ws.onmessage = (ev) => messageProcessor(ws, ev)
  ws.onclose = function (event) {
    window._WS = undefined
    if (event.code === 4001) {
      dispatch(logout())
    } else {
      window._WS = undefined
      dispatch(setAuth({ id: '', nick: '' }))
      dispatch(setConFailed(true))
    }
  }
}

export default connect
