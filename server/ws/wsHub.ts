import { Request, } from 'express'
import { Socket, Server } from 'net'
import WebSocket from 'ws'
import jwt from 'jsonwebtoken'
import { Error } from 'mongoose'
import initializeWs from './initializeWs'

export const wss = new WebSocket.Server({ noServer: true })

initializeWs(wss)

export function connectWS(server: Server) {
  server.on('upgrade', (req: Request, socket: Socket, head: any) => {
    try {
      const [url, token] = req.url.split('?token=')
      if (url !== '/ws' || !token) {
        throw new Error('Access is denied')
      }
      const secret = process.env.jwtSecret || 'a very very hard secret phrase'
      const { data: { id } } = <any>jwt.verify(token, secret)
      wss.handleUpgrade(req, socket, head, (ws) => {
        ws.id = id
        wss.emit('connection', ws)
      })
    } catch (err) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
      socket.destroy()
    }
  })
}
