import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent } from '@material-ui/core'
import { setAvatar } from '../store/actions'
import { Store } from '../../interfaces/storeTypes'

function Avatar() {
  const avatar = useSelector((state: Store) => state.avatar)
  const dispatch = useDispatch()
  return (
    <Dialog onClose={() => dispatch(setAvatar({ open: false }))} open={avatar.open}>
      <DialogContent>
        <img width="100%" src={avatar.url} alt="avatar" />
      </DialogContent>
    </Dialog>
  )
}

export default Avatar
