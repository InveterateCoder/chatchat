import { WebSocket } from 'ws'
import User from '../../models/UserModel'
import Jimp from 'jimp'
import { ChangeUser, Type, Package } from '../../../interfaces/socketTypes'

async function changeUser(ws: WebSocket, payload: any) {
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
export default changeUser
