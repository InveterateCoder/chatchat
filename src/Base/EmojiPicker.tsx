/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FocusEvent } from 'react'
import { useSelector } from 'react-redux'
import { Grow, makeStyles, useMediaQuery } from '@material-ui/core'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Store } from '../store/types'

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    bottom: 47,
    '&:focus': {
      outline: 'none',
    },
  },
}))

function EmojiPicker({ open, onFocusLose }: { open: boolean, onFocusLose: () => void }) {
  const classes = useStyles()
  const dark = useSelector((state: Store) => state.dark)
  const isCenter = useMediaQuery('(max-width:500px)')
  const isSmall = useMediaQuery('(max-width:345px)')
  const onBlur = (ev: FocusEvent<HTMLElement>) => {
    if (ev.currentTarget === ev.relatedTarget
      || ev.currentTarget.contains(ev.relatedTarget as Node)
      || (ev.relatedTarget && (ev.relatedTarget as HTMLElement).id === 'emojbtn')) {
      return
    }
    onFocusLose()
  }
  return (
    <Grow in={open} unmountOnExit>
      <div
        className={classes.wrapper}
        style={{ right: isCenter ? '50%' : 0 }}
        onBlur={onBlur}
        onKeyDown={({ key }) => (key === 'Escape') && onFocusLose()}
        tabIndex={-1}
      >
        <Picker
          style={{ position: 'relative', right: isCenter ? '-50%' : 0 }}
          autoFocus
          native
          theme={dark ? 'dark' : 'light'}
          perLine={isSmall ? 8 : 9}
        />
      </div>
    </Grow>
  )
}

export default EmojiPicker
