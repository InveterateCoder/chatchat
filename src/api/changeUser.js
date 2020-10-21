import { dispatch, getState } from '../store'
import { changeUser as changeUserRoute } from '../../shared/apiRoutes'
import { login, refreshAvatar } from '../store/actions'

async function changeUser(form) {
  const { creds } = getState()
  const res = await fetch(changeUserRoute, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.token}`,
    },
    body: form,
  })
  if (res.status === 401 || res.status === 403) {
    dispatch(login(null))
    return
  }
  if (res.status !== 200) {
    throw new Error(await res.text())
  }
  if (form.get('nick')) {
    dispatch(login({ ...creds, nick: form.get('nick') }))
  }
  if (form.get('image')) {
    dispatch(refreshAvatar())
  }
}
export default changeUser
