import { dispatch } from '../store'
import { setError } from '../store/actions'
import { Type } from '../../interfaces/socketTypes'
import processors from './processors'


function messageHub(event: MessageEvent) {
  try {
    const { type, payload }: { type: string, payload: any } = JSON.parse(event.data)
    switch (type) {
      case Type.AUTH:
        processors.authenticate(payload)
        break
      case Type.CHANGE_USER:
        processors.changeUser(payload)
        break
    }
  } catch (err) {
    dispatch(setError({ message: err.message, open: true }))
  }
}
export default messageHub
