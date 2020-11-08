import { Error } from 'mongoose'
import { WebSocket } from '../ws/types'


interface Connections {
  [key: string]: Array<WebSocket>
}

class WSConnections {
  private connections: Connections
  constructor() {
    this.connections = {}
  }
  add(ws: WebSocket) {
    let sockets = this.connections[ws.id]
    if (sockets) {
      if (sockets.length >= 3) throw new Error('Maximum allowed connections are reached.')
      sockets.push(ws)
    } else {
      sockets = [ws]
      this.connections[ws.id] = sockets
    }
  }
  remove(ws: WebSocket) {
    let sockets = this.connections[ws.id]
    if (!sockets) throw new Error('Wrong connection id')
    sockets.splice(sockets.indexOf(ws), 1)
    if (sockets.length === 0) {
      delete this.connections[ws.id]
    }
  }
}

class State {
  connections: WSConnections
  constructor() {
    this.connections = new WSConnections()
  }
}

const state = new State()

export default state
