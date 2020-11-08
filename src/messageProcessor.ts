import WebSocket from 'ws'
import { Type, Auth } from '../shared/types'
import { dispatch } from './store'
import { setWS } from './store/actions'
import { WS } from './store/types'

function messageProcessor(ws: WS, event: MessageEvent) {
  const { type, payload }: { type: string, payload: any } = JSON.parse(event.data)
  switch (type) {
    case Type.AUTH:
      const auth = payload as Auth
      
  }
}
export default messageProcessor
