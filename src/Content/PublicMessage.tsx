import React from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import {
  Avatar, makeStyles, Typography, ButtonBase
} from '@material-ui/core'
import { setAvatar } from '../store/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    columnGap: theme.spacing(1),
    marginTop: theme.spacing(0.2),
  },
  newMargin: {
    marginTop: theme.spacing(2),
  },
  content: {
    display: 'inline-flex',
    flexDirection: 'column',
    rowGap: `${theme.spacing(0.15)}px`,
  },
  paper: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[9],
    borderRadius: '0 20px 20px 20px',
  },
  bradContinue: {
    borderRadius: 20,
  },
  avaSpace: {
    width: 40,
  },
}))

function PublicMessage({ nick, url, time, text }: {
  nick?: string,
  url?: string
  time?: string,
  text: string,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <div className={clsx(classes.root, { [classes.newMargin]: url })}>
      {
        url
          ?
          <ButtonBase
            style={{ alignSelf: 'flex-start', borderRadius: 20 }}
            disableRipple
            onClick={() => dispatch(setAvatar({ url, open: true }))}
          >
            <Avatar src={url} />
          </ButtonBase>
          :
          <div className={classes.avaSpace} />
      }
      <div className={classes.content}>
        {
          nick && <Typography color="textSecondary" variant="subtitle2">{nick}</Typography>
        }
        <div className={clsx(classes.paper, { [classes.bradContinue]: !url })}>
          {
            time && <Typography variant="caption" color="textSecondary">{time}</Typography>
          }
          <Typography variant="body2" component="pre">{text}</Typography>
        </div>
      </div>
    </div>
  )
}
PublicMessage.defaultProps = {
  id: null,
  nick: null,
  time: null,
}
export default PublicMessage
