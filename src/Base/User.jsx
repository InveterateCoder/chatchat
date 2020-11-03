import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar, makeStyles, ListItem, ListItemAvatar,
  ListItemText, ListItemSecondaryAction, IconButton,
  ButtonBase, Typography, Tooltip, Badge,
} from '@material-ui/core'
import { Message, VolumeMute } from '@material-ui/icons'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  name: {
    marginRight: '45px',
    '& > span': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  btn: {
    borderRadius: 20,
  },
}))

function User({ id, name, openAvatar }) {
  const classes = useStyles()
  const refava = useSelector((state) => state.refava)
  const avatarUrl = `/avatar/${id}?refava=${refava}`
  return (
    <ListItem>
      <ListItemAvatar>
        <ButtonBase disableRipple className={classes.btn} onClick={() => openAvatar(id)}>
          <Avatar src={avatarUrl} />
        </ButtonBase>
      </ListItemAvatar>
      <ListItemText
        className={classes.name}
        primary={(
          <Tooltip title={name}>
            <Typography variant="subtitle2">{name}</Typography>
          </Tooltip>
        )}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <VolumeMute />
        </IconButton>
        <IconButton edge="end">
          <Badge badgeContent={10} color="secondary">
            <Message />
          </Badge>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  openAvatar: PropTypes.func.isRequired,
}

export default User
