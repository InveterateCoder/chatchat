import { Request, } from 'express'
import { Socket, Server } from 'net'
import WebSocket from 'ws'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel'
import initializeWs from './initializeWs'

export const wss = new WebSocket.Server({ noServer: true })

initializeWs(wss)

export function connectWS(server: Server) {
  server.on('upgrade', async (req: Request, socket: Socket, head: any) => {
    try {
      const [url, token] = req.url.split('?token=')
      if (url !== '/ws' || !token) {
        throw new Error('Access is denied')
      }
      const secret = process.env.jwtSecret || 'a very very hard secret phrase'
      wss.handleUpgrade(req, socket, head, async (ws) => {
        try {
          const { data: { id } } = <any>jwt.verify(token, secret)
          const user = await User.findById(id).select({ image: 0 }).exec()
          if (!user) throw new Error('User not found')
          ws.id = user._id.toString()
          ws.nick = user.nick
          wss.emit('connection', ws)
        } catch (err) {
          ws.close(4001)
        }
      })
    } catch (err) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
      socket.destroy()
    }
  })
}
