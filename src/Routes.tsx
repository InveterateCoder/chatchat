import React from 'react'
import { useSelector } from 'react-redux'
import Base from './Base/Index'
import Users from './Users/Index'
import Content from './Content/Index'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Authorize from './Authorize'
import { Store } from './store/types'

export default function Routes() {
  const token = useSelector((state: Store) => state.token)
  const auth = useSelector((state: Store) => state.auth)
  const signup = useSelector((state: Store) => state.signup)
  const connect = () => {
    const loc = window.location
    let url = loc.protocol === 'https:' ? 'wss://' : 'ws://'
    url += loc.hostname
    url += `:${loc.port}?token=hello`
    const socket = new window.WebSocket(url)
    socket.onmessage = function (event) {
      console.log(event)
    }
  }
  if (token) {
    if (!auth) {
      return <Authorize />
    }
    connect()
    return (
      <>
        <Users />
        <Content />
        <Base />
      </>
    )
  }
  if (signup) {
    return <SignUp />
  }
  return <SignIn />
}
