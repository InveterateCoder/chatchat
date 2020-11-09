import React from 'react'
import { List } from '@material-ui/core'
import Public from './Public'
import User from './User'

function UsersList() {
  return (
    <List>
      <Public />
      <User url="/avatar/5fa98a38315f37539594fd82?ref=1604946488213" name="Setareh Grigoryan Shalmani" />
    </List>
  )
}

export default UsersList
