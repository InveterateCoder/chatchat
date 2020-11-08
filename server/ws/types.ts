import { WebSocket as _WebSocket } from 'ws'

export interface WebSocket extends _WebSocket {
  id: string,
  nick: string,
}