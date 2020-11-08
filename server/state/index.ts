import WSConnections from './WSConnections'

class State {
  connections: WSConnections
  constructor() {
    this.connections = new WSConnections()
  }
}

const state = new State()

export default state
