import { Server } from "ws";
import state from '../state'
import handleMessage from './handleMessage'

function initializeWs(wss: Server) {
  wss.on('connection', (ws) => {
    state.connections.add(ws)
    ws.on('close', () => {
      state.connections.remove(ws)
    })
    ws.on('error', (err) => {
      console.error(err.message)
    })
    ws.on('message', handleMessage)
  })
}

export default initializeWs
