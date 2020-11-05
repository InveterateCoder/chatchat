import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  inner: {

  },
}))

function Message({ id, sender, time, text }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Avatar />
      <div className={classes.inner}>

      </div>
      <p style={{ marginBottom: 2000 }} />
    </div>
  )
}
Message.propTypes = {
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
export default Message
