import { Request,  } from 'express'
import { Socket, Server } from 'net'
import WebSocket from 'ws'

export const wss = new WebSocket.Server({ noServer: true })

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'cool', data: 'Hello' }))
})

export function connectWS(server: Server) {
  server.on('upgrade', (req: Request, socket: Socket, head: any) => {
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
