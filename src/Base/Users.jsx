import React, { useState } from 'react'
import {
  Avatar, Dialog, DialogContent, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core'
import { HomeSharp as HomeIcon } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import User from './User.jsx'

function Users() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const refava = useSelector((state) => state.refava)
  const openAvatar = (id) => {
    setAvatarUrl(`/avatar/${id}?refava=${refava}`)
    setAvatarOpen(true)
  }
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ overflow: 'hidden', whiteSpace: 'hidden' }} primary="Main" />
      </ListItem>
      <User id="" name="Setareh Grigoryan" openAvatar={openAvatar} />

      <Dialog onClose={() => setAvatarOpen(false)} open={avatarOpen}>
        <DialogContent>
          <img width="100%" src={avatarUrl} alt="avatar" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Users
