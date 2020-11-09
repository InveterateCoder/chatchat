import React from 'react'
import {
  Avatar, makeStyles, ListItem, ListItemAvatar,
  ListItemText, ListItemSecondaryAction, IconButton,
  ButtonBase, Typography, Tooltip, Badge,
} from '@material-ui/core'
import { Message, VolumeMute } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../store/actions'
import { Store } from '../../interfaces/storeTypes'

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

function User({ id, name }: { id: string, name: string }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const refava = useSelector((state: Store) => state.refava)
  const avatarUrl = `/avatar/${id}?refava=${refava}`

  return (
    <ListItem>
      <ListItemAvatar>
        <ButtonBase
          disableRipple
          className={classes.btn}
          onClick={() => dispatch(setAvatar({ url: avatarUrl, open: true }))}
        >
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
export default User
