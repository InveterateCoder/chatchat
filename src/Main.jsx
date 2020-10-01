import React from 'react'
import {
  AppBar, Toolbar, IconButton,
  Typography, Button, makeStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Main() {
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ChatChat
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
