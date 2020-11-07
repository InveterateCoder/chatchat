import React from 'react'
import {
  Avatar, makeStyles, ListItem, ListItemAvatar,
  ListItemText, ListItemSecondaryAction, IconButton,
  ButtonBase, Typography, Badge,
} from '@material-ui/core'
import { Message } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { setAvatar } from '../store/actions'

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

function Public() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const url = '/public.png'
  return (
    <ListItem selected>
      <ListItemAvatar>
        <ButtonBase
          disableRipple
          className={classes.btn}
          onClick={() => dispatch(setAvatar({ url, open: true }))}
        >
          <Avatar src={url} />
        </ButtonBase>
      </ListItemAvatar>
      <ListItemText
        className={classes.name}
        primary={(
          <Typography variant="subtitle2">Public</Typography>
        )}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Badge badgeContent={10} color="secondary">
            <Message />
          </Badge>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Public
