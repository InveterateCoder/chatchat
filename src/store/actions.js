export const dType = {
  permanent: 'permanent',
  persistent: 'persistent',
  temporary: 'temporary',
}

export const SET_DARK = 'set_dark'
export const setDark = (dark) => ({
  type: SET_DARK,
  payload: dark,
})

export const SET_DRAWER_TYPE = 'set_drawer_type'
export const setDrawerType = (sm, md) => {
  const type = SET_DRAWER_TYPE
  let payload
  if (sm) payload = dType.temporary
  else if (md) payload = dType.persistent
  else payload = dType.permanent
  return { type, payload }
}

export const SET_DRAWER_OPEN = 'set_drawer_open'
export const setDrawerOpen = (open) => ({
  type: SET_DRAWER_OPEN,
  payload: open,
})

export const LOGIN = 'login'
export const login = (creds) => ({
  type: LOGIN,
  payload: creds,
})

export const LOGOUT = 'logout'
export const logout = () => ({
  type: LOGOUT,
})

export const OPEN_SETTINGS = 'open_settings'
export const openSettings = (state) => ({
  type: OPEN_SETTINGS,
  payload: state,
})
