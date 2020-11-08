import { Data, WebSocket } from 'ws'
import state from '../state'
import { Package, Type, Auth } from '../../shared/types'

function handleMessage(ws: WebSocket, data: Data) {
  const { type, payload }: { type: Type, payload: any } = JSON.parse(data.toString('utf8'))
  switch (type) {
    case Type.AUTH: {
      const auth: Package<Auth> = {
        type: Type.AUTH,
        payload: {
          id: ws.id,
          nick: ws.nick,
        }
      }
      ws.send(JSON.stringify(auth))
    }
  }
}

export default handleMessage
