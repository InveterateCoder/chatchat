import React from 'react'
import { IconButton, makeStyles, TextField } from '@material-ui/core'
import { EmojiEmotions, AttachFile, Send } from '@material-ui/icons'
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
      paddingTop: 0,
      paddingBottom: 0,
      '& .MuiInputBase-input': {
        padding: `${theme.spacing(1.5)}px 0`,
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
        multiline
        rowsMax={8}
        InputProps={{
          endAdornment: (
            <>
              <IconButton style={{ alignSelf: 'flex-end' }}>
                <EmojiEmotions />
              </IconButton>
              <IconButton
                edge="end"
                style={{ alignSelf: 'flex-end' }}
              >
                <Send />
              </IconButton>
            </>
          ),
          startAdornment: (
            <IconButton style={{ marginLeft: -10, marginRight: 5, alignSelf: 'flex-end' }}>
              <AttachFile />
            </IconButton>
          ),
        }}
      />
    </div>
  )
}
export default Input
