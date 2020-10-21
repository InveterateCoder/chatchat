/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { useSelector } from 'react-redux'
import AppBar from './AppBar.jsx'
import Drawer from './Drawer.jsx'
import Body from './Body.jsx'
import Settings from './Settings.jsx'

function Home() {
  const sopen = useSelector((state) => state.sopen)
  return (
    <>
      <AppBar />
      <Drawer />
      <Body />
      {sopen && <Settings />}
    </>
  )
}
export default Home
