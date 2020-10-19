import React, { useState } from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import User from './User.jsx'

function Users() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const openAvatar = (id) => {
    setAvatarUrl(`/avatar/${id}`)
    setAvatarOpen(true)
  }
  return (
    <>
      <User id="5f8ac135e867a50d30237766" name="Setareh Grigoryan" openAvatar={openAvatar} />

      <Dialog onClose={() => setAvatarOpen(false)} open={avatarOpen}>
        <DialogContent>
          <img width="100%" src={avatarUrl} alt="avatar" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Users
