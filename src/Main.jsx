import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'
import useAlignRightStyle from './useAlignBodyStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.baseShiftTop,
  },
  header: {
    position: 'sticky',
    top: theme.baseShiftTop - 10,
    borderRadius: 0,
    paddingTop: theme.spacing(0.4),
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 7px 1px ${theme.palette.grey[500]}`,
  },
  content: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    paddingBottom: theme.baseShiftBottom,
  },
}))

function Main() {
  const classes = useStyles()
  const alignRightStyle = useAlignRightStyle()

  return (
    <main className={clsx(classes.root, alignRightStyle)}>
      <Typography className={classes.header} variant="h6">Main</Typography>
      <div className={classes.content}>
        <p style={{ paddingBottom: 2000 }}>helo</p>
        <p>Hello</p>
      </div>
    </main>
  )
}

export default Main
