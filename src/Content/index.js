/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { makeStyles, Typography, Container } from '@material-ui/core'
import clsx from 'clsx'
import useAlignRightStyle from '../hooks/useAlignBodyStyle'
import PublicMessage from './PublicMessage.jsx'
import MyMessage from './MyMessage.jsx'

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
    paddingTop: theme.spacing(4.5),
    paddingBottom: theme.baseShiftBottom,
  },
}))

function Content() {
  const classes = useStyles()
  const alignRightStyle = useAlignRightStyle()

  return (
    <main className={clsx(classes.root, alignRightStyle)}>
      <Container maxWidth="md" className={classes.content}>
        <PublicMessage
          id="5fa148ea8665f17abe769d91"
          nick="Setareh Grigoryan Shalmani"
          time="2020-8-5 / 01:02"
          text="Hello there"
        />
        <PublicMessage
          text="forgot to tell you"
        />
        <MyMessage
          id="5fa14368d19c3c73cc7946e7"
          time="13:40"
          text="Hello people"
        />
        <MyMessage
          text="what's going on?"
        />
        <MyMessage
          time="13:42"
          text="shut up!"
        />
        <PublicMessage
          id="5fa148ea8665f17abe769d91"
          nick="Setareh Grigoryan Shalmani"
          time="2020-8-5 / 01:02"
          text="Hello there"
        />
        <PublicMessage
          text="a"
        />
      </Container>
      <Typography className={clsx(classes.header, alignRightStyle)} variant="h6">Public</Typography>
    </main>
  )
}

export default Content
