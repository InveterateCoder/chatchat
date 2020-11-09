import React, { useState } from 'react'
import {
  AppBar, Toolbar, IconButton, Box,
  Typography, Tooltip, makeStyles, Grow, Avatar,
  Dialog, DialogContent, ButtonBase,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'
import {
  Brightness2 as DarkIcon,
  WbSunny as LightIcon,
  BrightnessAuto as AutoIcon,
} from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  setTheme, setDrawerOpen, logout, openSettings,
} from '../store/actions'
import { dType, themeType, Store } from '../../interfaces/storeTypes'

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
  },
  boxOpen: {
    marginLeft: theme.spacing(-4),
  },
  nick: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

function ChatAppBar() {
  const theme = useSelector((state: Store) => state.theme)
  const dopen = useSelector((state: Store) => state.dopen)
  const dtype = useSelector((state: Store) => state.dtype)
  const id = useSelector((state: Store) => state.id)
  const nick = useSelector((state: Store) => state.nick)
  const refava = useSelector((state: Store) => state.refava)
  const dispatch = useDispatch()
  const [avaOpen, setAvaOpen] = useState(false)
  const classes = useStyles()

  const avaUrl = `/avatar/${id}?refava=${refava}`

  let BrightnessIcon = null
  let nextBrightnessState: string

  if (theme === themeType.auto) {
    BrightnessIcon = AutoIcon
    nextBrightnessState = themeType.dark
  } else if (theme === themeType.dark) {
    BrightnessIcon = DarkIcon
    nextBrightnessState = themeType.light
  } else {
    BrightnessIcon = LightIcon
    nextBrightnessState = themeType.auto
  }

  return (
    <AppBar elevation={1} position="fixed" className={classes.aboveDrawer} color="default">
      <Toolbar variant="dense">
        <Grow in={dtype !== dType.permanent}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(setDrawerOpen(!dopen))}
          >
            {
              dopen ? <CloseIcon /> : <MenuIcon />
            }
          </IconButton>
        </Grow>
        <Box className={clsx(classes.box, { [classes.boxOpen]: dtype === dType.permanent })}>
          <ButtonBase disableRipple style={{ borderRadius: 20 }} onClick={() => setAvaOpen(true)}>
            <Avatar src={avaUrl} />
          </ButtonBase>
          <Typography variant="subtitle1" className={classes.nick}>
            {nick}
          </Typography>
        </Box>
        <Tooltip title="Theme">
          <IconButton onClick={() => dispatch(setTheme(nextBrightnessState))}>
            <BrightnessIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton onClick={() => dispatch(openSettings(true))}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Signout">
          <IconButton onClick={() => dispatch(logout())}>
            <SignoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Dialog onClose={() => setAvaOpen(false)} open={avaOpen}>
        <DialogContent>
          <img width="100%" src={avaUrl} alt="avatar" />
        </DialogContent>
      </Dialog>
    </AppBar>
  )
}

export default ChatAppBar
