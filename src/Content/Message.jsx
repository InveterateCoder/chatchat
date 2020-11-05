import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    columnGap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  content: {
    display: 'inline-flex',
    flexDirection: 'column',
  },
  paper: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    borderRadius: '0 20px 20px 20px',
  },
}))

function Message({
  id, nick, time, text,
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Avatar />
      <div className={classes.content}>
        <Typography color="textSecondary" variant="subtitle2">{nick}</Typography>
        <div className={classes.paper}>
          <Typography variant="caption" color="textSecondary">{time}</Typography>
          <Typography variant="body2">{text}</Typography>
        </div>
      </div>
    </div>
  )
}
Message.propTypes = {
  id: PropTypes.string.isRequired,
  nick: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
export default Message
