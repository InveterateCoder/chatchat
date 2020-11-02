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
import { Brightness2 as DarkIcon, Brightness7 as LightIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  setDark, setDrawerOpen, dType, logout, openSettings,
} from '../store/actions'

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
  const dark = useSelector((state) => state.dark || false)
  const dopen = useSelector((state) => state.dopen)
  const dtype = useSelector((state) => state.dtype)
  const creds = useSelector((state) => state.creds)
  const refava = useSelector((state) => state.refava)
  const dispatch = useDispatch()
  const [avaOpen, setAvaOpen] = useState(false)
  const classes = useStyles()

  const avaUrl = `/avatar/${creds.id}?refava=${refava}`

  return (
    <AppBar elevation="1" position="fixed" className={classes.aboveDrawer} color="default">
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
          <Typography variant="h6" className={classes.nick}>
            {creds.nick}
          </Typography>
        </Box>
        <Tooltip title="Theme">
          <IconButton onClick={() => dispatch(setDark(!dark))}>
            {
              dark
                ? <LightIcon />
                : <DarkIcon />
            }
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
