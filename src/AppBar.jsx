import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar, Toolbar, IconButton,
  Typography, Button, makeStyles, Switch,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { setDark } from './store/actions'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  switch: {
    marginRight: theme.spacing(1),
  },
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

const mapStateToProps = ({ dark }) => ({ dark: dark || false })
const mapDispatchToProps = { makeDark: setDark }

function ChatAppBar({ dark, makeDark }) {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.aboveDrawer}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Chat-Chat
        </Typography>
        <Switch
          color="inherit"
          checked={dark}
          onChange={({ target: { checked } }) => makeDark(checked)}
          size="small"
          className={classes.switch}
        />
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

ChatAppBar.propTypes = {
  dark: PropTypes.bool.isRequired,
  makeDark: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppBar)
