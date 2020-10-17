import React from 'react'
import {
  AppBar, Toolbar, IconButton, Box,
  Typography, Button, makeStyles, Grow, Avatar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { Brightness2 as DarkIcon, Brightness7 as LightIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  setDark, setDrawerOpen, dType, logout,
} from './store/actions'

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(2)}px`,
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
  brighness: {
    marginRight: theme.spacing(1),
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
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.aboveDrawer} color="default">
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
          <Avatar src={`/avatar/${creds.id}`} />
          <Typography variant="h6" className={classes.nick}>
            {creds.nick}
          </Typography>
        </Box>
        <IconButton
          color="default"
          onClick={() => dispatch(setDark(!dark))}
          className={classes.brighness}
        >
          {
            dark
              ? <LightIcon />
              : <DarkIcon />
          }
        </IconButton>
        <Button
          color="inherit"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default ChatAppBar
