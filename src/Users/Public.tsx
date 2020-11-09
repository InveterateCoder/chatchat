import React from 'react'
import {
  Avatar, ListItem, ListItemAvatar,
  ListItemText, Typography, Badge,
} from '@material-ui/core'

function Public() {
  const url = '/public.png'
  return (
    <ListItem button>
      <ListItemAvatar>
        <Badge badgeContent={10} color="secondary">
          <Avatar src={url} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={(
          <Typography variant="subtitle2">Public</Typography>
        )}
      />
    </ListItem>
  )
}

export default Public
