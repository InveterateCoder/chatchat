import React, { useState } from 'react'
import {
  Avatar, Dialog, DialogContent, ListItem, IconButton, Badge,
  ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles,
} from '@material-ui/core'
import { HomeSharp as HomeIcon, Message } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import User from './User.jsx'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.warning.main,
  },
}))

function Users() {
  const classes = useStyles()
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const refava = useSelector((state) => state.refava)
  const openAvatar = (id) => {
    setAvatarUrl(`/avatar/${id}?refava=${refava}`)
    setAvatarOpen(true)
  }
  return (
    <>
      <ListItem selected>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Main" />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <Badge badgeContent={4} color="secondary">
              <Message />
            </Badge>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <User id="5fa01b9ce6cd320447f49b10" name="Setareh Grigoryan Salmani" openAvatar={openAvatar} />

      <Dialog onClose={() => setAvatarOpen(false)} open={avatarOpen}>
        <DialogContent>
          <img width="100%" src={avatarUrl} alt="avatar" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Users
