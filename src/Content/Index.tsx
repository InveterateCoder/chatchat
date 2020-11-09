import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Typography, Container } from '@material-ui/core'
import clsx from 'clsx'
import useAlignRightStyle from '../hooks/useAlignBodyStyle'
import PublicMessage from './PublicMessage'
import MyMessage from './MyMessage'
import { MyTheme } from '../infrastructure/theme'
import { Store } from '../../interfaces/storeTypes'

const useStyles = makeStyles((theme: MyTheme) => ({
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
  const avaUrl = useSelector((state: Store) => state.url)
  const alignRightStyle = useAlignRightStyle()

  return (
    <main className={clsx(classes.root, alignRightStyle)}>
      <Container maxWidth="md" className={classes.content}>
        <PublicMessage
          nick="Setareh"
          url="/avatar/5fa98a38315f37539594fd82?ref=1604946488213"
          time="2020-8-5 / 01:02"
          text="Hello there"
        />
        <PublicMessage
          text="forgot to tell you"
        />
        <MyMessage
          url={avaUrl}
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
          nick="Setareh"
          url="/avatar/5fa98a38315f37539594fd82?ref=1604946488213"
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
