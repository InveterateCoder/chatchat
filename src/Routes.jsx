/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector } from 'react-redux'
import Base from './Base'
import Users from './Users'
import Content from './Content'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Authorize from './Authorize.jsx'

export default function Routes() {
  const token = useSelector((state) => state.token)
  const auth = useSelector((state) => state.auth)
  const signup = useSelector((state) => state.signup)
  const connect = () => {
    const loc = window.location
    let url = loc.protocol === 'https:' ? 'wss://' : 'ws://'
    url += loc.hostname
    url += `:${loc.port}?token=hello`
    const socket = new window.WebSocket(url)
    socket.onmessage = function(event) {
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
