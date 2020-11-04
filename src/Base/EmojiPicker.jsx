/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Grow, makeStyles, useMediaQuery } from '@material-ui/core'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles(() => ({
  wrapper: {
    '&:focus': {
      outline: 'none',
    },
  },
}))

function EmojiPicker({ open, onFocusLose }) {
  const classes = useStyles()
  const dark = useSelector((state) => state.dark)
  const isCenter = useMediaQuery('(max-width:500px)')
  const isSmall = useMediaQuery('(max-width:345px)')
  const onBlur = (ev) => {
    if (ev.currentTarget === ev.relatedTarget
      || ev.currentTarget.contains(ev.relatedTarget)
      || (ev.relatedTarget && ev.relatedTarget.id === 'emojbtn')) {
      return
    }
    onFocusLose()
  }
  return (
    <Grow in={open} unmountOnExit>
      <div
        className={classes.wrapper}
        style={{ alignSelf: isCenter ? 'center' : 'flex-end' }}
        onBlur={onBlur}
        onKeyDown={({ key }) => (key === 'Escape') && onFocusLose()}
        tabIndex="-1"
      >
        <Picker
          autoFocus
          native
          theme={dark ? 'dark' : 'light'}
          perLine={isSmall ? 8 : 9}
          onBlur={onBlur}
        />
      </div>
    </Grow>
  )
}
EmojiPicker.propTypes = {
  open: PropTypes.bool.isRequired,
  onFocusLose: PropTypes.func.isRequired,
}

export default EmojiPicker
