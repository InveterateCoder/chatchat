import _WS from 'ws'

declare module "ws" {
  export class WebSocket extends _WS {
    id: string
    nick: string
  }
}