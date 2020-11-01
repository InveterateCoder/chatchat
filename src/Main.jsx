import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'
import useAlignRightStyle from './useAlignBodyStyle'

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.baseShiftTop,
  },
  contentOpen: {
    marginLeft: theme.drawerMaxWidth,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentOpenNoTrans: {
    marginLeft: theme.drawerMaxWidth,
  },
}))

function Main() {
  const classes = useStyles()
  const alignRightStyle = useAlignRightStyle()

  return (
    <main className={clsx(classes.content, alignRightStyle)}>
      <Typography variant="h1">Hello</Typography>
    </main>
  )
}

export default Main
