/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'
import useAlignRightStyle from '../useAlignBodyStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.baseShiftTop,
  },
  header: {
    position: 'fixed',
    top: theme.baseShiftTop - 2,
    paddingTop: 2,
    left: 0,
    right: 0,
    borderRadius: 0,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 7px 1px ${theme.palette.grey[500]}`,
  },
  content: {
    padding: `${theme.spacing(3.5)}px ${theme.spacing(2)}px`,
    paddingBottom: theme.baseShiftBottom,
  },
}))

function Content() {
  const classes = useStyles()
  const alignRightStyle = useAlignRightStyle()

  return (
    <main className={clsx(classes.root, alignRightStyle)}>
      <Typography className={clsx(classes.header, alignRightStyle)} variant="h6">Public</Typography>
      <div className={classes.content}>
        <p style={{ paddingBottom: 2000 }}>helo</p>
        <p>Hello</p>
      </div>
    </main>
  )
}

export default Content
