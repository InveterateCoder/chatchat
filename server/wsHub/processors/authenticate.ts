import { WebSocket } from 'ws'
import { Type, Package, Auth } from '../../../interfaces/socketTypes'

function authenticate(ws: WebSocket, payload: any) {
  const auth: Package<Auth> = {
    type: Type.AUTH,
    payload: {
      id: ws.id,
      nick: ws.nick,
      url: ws.ava
    }
  }
  ws.send(JSON.stringify(auth))
}

export default authenticate
