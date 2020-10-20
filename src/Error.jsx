import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, IconButton, makeStyles, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  snackError: {
    whiteSpace: 'pre-line',
    '& > .MuiPaper-root': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))

function Error({ open, message, onOpenClose }) {
  const classes = useStyles()
  return (
    <Snackbar
      className={classes.snackError}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      message={message}
      TransitionComponent={Slide}
      action={(
        <IconButton
          color="inherit"
          onClick={() => onOpenClose(false)}
        >
          <CloseIcon />
        </IconButton>
      )}
    />
  )
}
Error.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onOpenClose: PropTypes.func.isRequired,
}
export default Error
