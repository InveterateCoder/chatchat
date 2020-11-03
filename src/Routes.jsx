/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector } from 'react-redux'
import Base from './Base'
import Main from './Main.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'

export default function Routes() {
  const creds = useSelector((state) => state.creds)
  const signup = useSelector((state) => state.signup)
  if (creds) {
    return (
      <>
        <Base />
        <Main />
      </>
    )
  }
  if (signup) {
    return <SignUp />
  }
  return <SignIn />
}
