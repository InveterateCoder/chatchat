import React from 'react'
import {
  Snackbar, IconButton, makeStyles, Slide,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from './store/actions'

const useStyles = makeStyles((theme) => ({
  snackError: {
    whiteSpace: 'pre-line',
    '& > .MuiPaper-root': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))

function Error() {
  const classes = useStyles()
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()
  return (
    <Snackbar
      className={classes.snackError}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={error.open}
      message={error.message}
      TransitionComponent={Slide}
      action={(
        <IconButton
          color="inherit"
          onClick={() => dispatch(setError({ open: false }))}
        >
          <CloseIcon />
        </IconButton>
      )}
    />
  )
}

export default Error
