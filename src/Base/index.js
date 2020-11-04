/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { useSelector } from 'react-redux'
import AppBar from './AppBar.jsx'
import Input from './Input.jsx'
import Avatar from './Avatar.jsx'
import Settings from './Settings.jsx'

function Home() {
  const sopen = useSelector((state) => state.sopen)
  return (
    <>
      <AppBar />
      <Input />
      <Avatar />
      {sopen && <Settings />}
    </>
  )
}
export default Home
