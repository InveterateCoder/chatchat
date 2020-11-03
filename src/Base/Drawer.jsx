import React, { useEffect } from 'react'
import {
  useMediaQuery, useTheme, SwipeableDrawer, makeStyles, List,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import Users from './Users.jsx'
import { setDrawerType, setDrawerOpen, dType } from '../store/actions'

const useStyles = makeStyles((theme) => ({
  drawer: {
    maxWidth: theme.drawerMaxWidth,
    width: theme.drawerWidth,
    height: 'auto',
    bottom: 0,
  },
  pad: {
    top: theme.baseShiftTop,
  },
}))

function AppDrawer() {
  const dtype = useSelector((state) => state.dtype)
  const dopen = useSelector((state) => state.dopen)
  const dispatch = useDispatch()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    dispatch(setDrawerType(sm, md))
  }, [sm, md])
  const classes = useStyles()
  const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  return (
    <SwipeableDrawer
      disableBackdropTransition={!IOS}
      disableDiscovery={IOS}
      anchor="left"
      swipeAreaWidth={70}
      open={dopen}
      variant={dtype}
      onClose={() => dispatch(setDrawerOpen(false))}
      onOpen={() => dispatch(setDrawerOpen(true))}
      classes={{ paper: clsx(classes.drawer, { [classes.pad]: dtype !== dType.temporary }) }}
    >
      <List>
        <Users />
      </List>
    </SwipeableDrawer>
  )
}

export default AppDrawer
