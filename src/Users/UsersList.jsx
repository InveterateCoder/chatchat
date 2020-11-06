import React from 'react'
import { List } from '@material-ui/core'
import Public from './Public.jsx'
import User from './User.jsx'

function UsersList() {
  return (
    <List>
      <Public />
      <User id="5fa148ea8665f17abe769d91" name="Setareh Grigoryan Shalmani" />
    </List>
  )
}

export default UsersList
