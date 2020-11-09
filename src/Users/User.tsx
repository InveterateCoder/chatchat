import React from 'react'
import {
  Avatar, ListItem, ListItemAvatar,
  ListItemText, ListItemSecondaryAction, IconButton,
  Typography, Tooltip, Badge,
} from '@material-ui/core'
import { VolumeMute } from '@material-ui/icons'

function User({ url, name }: { url: string, name: string }) {

  return (
    <ListItem button>
      <ListItemAvatar>
        <Badge badgeContent={10} color="secondary">
          <Avatar src={url} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
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
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default User
