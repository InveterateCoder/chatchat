import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Avatar, makeStyles, Typography } from '@material-ui/core'
import { yellow as color } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    columnGap: theme.spacing(1),
    marginTop: theme.spacing(0.2),
    justifyContent: 'flex-end',
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
    backgroundColor: color[900],
    boxShadow: theme.shadows[9],
    borderRadius: '20px 0 20px 20px',
    textAlign: 'right',
  },
  bradContinue: {
    borderRadius: 20,
  },
  avaSpace: {
    width: 40,
  },
}))

function PublicMessage({ id, time, text }) {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root, { [classes.newMargin]: id })}>
      <div className={classes.content}>
        <div className={clsx(classes.paper, { [classes.bradContinue]: !id })}>
          {
            time && <Typography variant="caption" color="inherit" style={{ opacity: 0.7 }}>{time}</Typography>
          }
          <Typography variant="body2" component="pre">{text}</Typography>
        </div>
      </div>
      {
        id ? <Avatar src={`/avatar/${id}`} />
          : <div className={classes.avaSpace} />
      }
    </div>
  )
}
PublicMessage.defaultProps = {
  id: null,
  time: null,
}
PublicMessage.propTypes = {
  id: PropTypes.string,
  time: PropTypes.string,
  text: PropTypes.string.isRequired,
}
export default PublicMessage
