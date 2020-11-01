import React from 'react'
import { makeStyles, TextField } from '@material-ui/core'
import clsx from 'clsx'
import useAlignBodyStyle from '../useAlignBodyStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
  },
  textField: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 7px 1px ${theme.palette.grey[500]}`,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
        borderRadius: 0,
      },
    },
  },
}))

function Input() {
  const classes = useStyles()
  const alignBodyStyle = useAlignBodyStyle()
  return (
    <div className={clsx(classes.root, alignBodyStyle)}>
      <TextField
        className={classes.textField}
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
      />
    </div>
  )
}
export default Input
