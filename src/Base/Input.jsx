import React, { useState } from 'react'
import {
  IconButton, makeStyles, TextField,
} from '@material-ui/core'
import { EmojiEmotions, AttachFile, Send } from '@material-ui/icons'
import clsx from 'clsx'
import useAlignBodyStyle from '../hooks/useAlignBodyStyle'
import EmojiPicker from './EmojiPicker.jsx'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
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
      fontSize: '.85rem',
      '& .MuiInputBase-input': {
        margin: `${theme.spacing(1.5)}px 0`,
      },
    },
  },
  action: {
    alignSelf: 'flex-end',
    height: 40,
    width: 40,
    margin: theme.spacing(0.4),
  },
}))

function Input() {
  const classes = useStyles()
  const alignBodyStyle = useAlignBodyStyle()
  const [emojiOpen, setEmojiOpen] = useState(false)

  const toggleEmojies = () => {
    setEmojiOpen(!emojiOpen)
  }
  return (
    <div className={clsx(classes.root, alignBodyStyle)}>
      <EmojiPicker open={emojiOpen} onFocusLose={() => setEmojiOpen(false)} />
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
              <IconButton
                id="emojbtn"
                className={classes.action}
                onClick={toggleEmojies}
                style={{ color: emojiOpen && '#fbd043' }}
              >
                <EmojiEmotions />
              </IconButton>
              <IconButton
                edge="end"
                className={classes.action}
              >
                <Send />
              </IconButton>
            </>
          ),
          startAdornment: (
            <IconButton style={{ marginLeft: -10, marginRight: 5 }} className={classes.action}>
              <AttachFile />
            </IconButton>
          ),
        }}
      />
    </div>
  )
}
export default Input
