import { string } from 'prop-types'

const WebSocket = require('ws')

export const wss = new WebSocket.Server({ noServer: true })

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'cool', data: 'Hello' }))
})

export function connectWS(server) {
  server.on('upgrade', (req, socket, head) => {
    const token = req.url.substr(req.url.indexOf('?token=') + 7)
    if (!token) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
      socket.destroy()
      return
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws)
    })
  })
}
