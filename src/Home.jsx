import React from 'react'
import AppBar from './AppBar.jsx'
import Drawer from './Drawer.jsx'
import Main from './Main.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import keys from './keys'

export default function Home() {
  if (keys.token) {
    return (
      <>
        <AppBar />
        <Drawer />
        <Main />
      </>
    )
  }
  return <SignUp />
}
