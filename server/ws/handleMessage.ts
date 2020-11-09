import { Data, WebSocket } from 'ws'
import Jimp from 'jimp'
import User from '../models/UserModel'
import { Package, Type, Auth, ChangeUser } from '../../interfaces/socketTypes'

async function handleMessage(ws: WebSocket, data: Data) {
  const { type, payload }: { type: Type, payload: any } = JSON.parse(data.toString('utf8'))
  switch (type) {
    case Type.AUTH: {
      const auth: Package<Auth> = {
        type: Type.AUTH,
        payload: {
          id: ws.id,
          nick: ws.nick,
          url: ws.ava
        }
      }
      ws.send(JSON.stringify(auth))
      break
    }
    case Type.CHANGE_USER: {
      const change = payload as ChangeUser
      const update: {
        nick?: string,
        imageType?: string,
        image?: Buffer,
        url?: string,
      } = {}
      if (change.imageType && ['image/png', 'image/jpeg'].includes(change.imageType) && change.image && typeof change.image === 'string') {
        const image = Buffer.from(change.image, 'base64')
        update.imageType = change.imageType
        update.image = await Jimp.read(image)
          .then((img) => img.cover(500, 500)
            .getBufferAsync(change.imageType || ''))
        update.url = `/avatar/${ws.id}?ref=${Date.now()}`
      }
      if (change.nick) {
        update.nick = change.nick
      }
      await User.updateOne({ _id: ws.id }, update).exec()
      const pkg: Package<ChangeUser> = {
        type: Type.CHANGE_USER,
        payload: {
          nick: update.nick,
          url: update.url
        }
      }
      ws.send(JSON.stringify(pkg))
    }
  }
}

export default handleMessage
