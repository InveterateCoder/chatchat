/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import {
  useMediaQuery, useTheme, SwipeableDrawer, makeStyles,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import UsersList from './UsersList.jsx'
import { setDrawerType, setDrawerOpen } from '../store/actions'
import { dType } from '../store/types'

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
      open={dopen}
      variant={dtype === dType.temporary ? 'temporary' : 'persistent'}
      onClose={() => dispatch(setDrawerOpen(false))}
      onOpen={() => dispatch(setDrawerOpen(true))}
      classes={{ paper: clsx(classes.drawer, { [classes.pad]: dtype !== dType.temporary }) }}
    >
      <UsersList />
    </SwipeableDrawer>
  )
}

export default AppDrawer
