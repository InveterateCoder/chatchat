import React, { useEffect } from 'react'
import { Drawer, useMediaQuery, useTheme } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setDrawerType, setDrawerOpen } from './store/actions'
import Users from './Users.jsx'

function AppDrawer() {
  const dtype = useSelector((state) => state.dtype)
  const dopen = useSelector((state) => state.dopen || false)
  const dispatch = useDispatch()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    dispatch(setDrawerType(sm, md))
  }, [sm, md])
  return (
    <Drawer
      anchor="left"
      open={dopen}
      variant={dtype}
      onClose={() => dispatch(setDrawerOpen(false))}
    >
      <Users />
    </Drawer>
  )
}

export default AppDrawer
