import { Data, WebSocket } from 'ws'
import processors from './processors'
import { Type } from '../../interfaces/socketTypes'

function messageHub(this: any, data: Data) {
  const ws = this as WebSocket
  const { type, payload }: { type: Type, payload: any } = JSON.parse(data.toString('utf8'))
  switch (type) {
    case Type.AUTH:
      processors.authenticate(ws, payload)
      break
    case Type.CHANGE_USER: {
      processors.changeUser(ws, payload)
      break
    }
  }
}

export default messageHub
