import React, { useEffect } from 'react'
import { useMediaQuery, useTheme, SwipeableDrawer } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setDrawerType, setDrawerOpen } from './store/actions'
import DrawerContent from './DrawerContent.jsx'

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
    <SwipeableDrawer
      anchor="left"
      swipeAreaWidth={70}
      open={dopen}
      variant={dtype}
      onClose={() => dispatch(setDrawerOpen(false))}
      onOpen={() => dispatch(setDrawerOpen(true))}
    >
      <DrawerContent />
    </SwipeableDrawer>
  )
}

export default AppDrawer
