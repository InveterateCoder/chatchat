import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { dType } from './store/actions'

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.baseShiftTop,
  },
  contentOpen: {
    marginLeft: theme.drawerWidth,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentOpenNoTrans: {
    marginLeft: theme.drawerWidth,
  },
}))

function Main() {
  const classes = useStyles()
  const dtype = useSelector((state) => state.dtype)
  const dopen = useSelector((state) => state.dopen || false)

  return (
    <main
      className={
        clsx(classes.content,
          {
            [classes.contentOpen]: dopen && dtype !== dType.temporary,
            [classes.contentOpenNoTrans]: dtype === dType.permanent,
          })
      }
    >
      <Typography variant="h1">Hello</Typography>
    </main>
  )
}

export default Main
