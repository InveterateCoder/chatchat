import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Avatar, makeStyles, Typography } from '@material-ui/core'

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

function PublicMessage({
  id, nick, time, text,
}) {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root, { [classes.newMargin]: id })}>
      {
        id ? <Avatar src={`/avatar/${id}`} />
          : <div className={classes.avaSpace} />
      }
      <div className={classes.content}>
        {
          nick && <Typography color="textSecondary" variant="subtitle2">{nick}</Typography>
        }
        <div className={clsx(classes.paper, { [classes.bradContinue]: !id })}>
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
PublicMessage.propTypes = {
  id: PropTypes.string,
  nick: PropTypes.string,
  time: PropTypes.string,
  text: PropTypes.string.isRequired,
}
export default PublicMessage
