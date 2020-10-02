export const SET_DARK = 'set_dark'
export const SET_DRAWER_TYPE = 'set_drawer_type'
export const SET_DRAWER_OPEN = 'set_drawer_open'

export const dType = {
  permanent: 'permanent',
  persistent: 'persistent',
  temporary: 'temporary',
}

export const setDark = (dark) => ({
  type: SET_DARK,
  payload: dark,
})

export const setDrawerType = (sm, md) => {
  const type = SET_DRAWER_TYPE
  let payload
  if (sm) payload = dType.temporary
  else if (md) payload = dType.persistent
  else payload = dType.permanent
  return { type, payload }
}

export const setDrawerOpen = (open) => ({
  type: SET_DRAWER_OPEN,
  payload: open,
})
