import React from 'react'
import { useSelector } from 'react-redux'
import AppBar from './AppBar'
import Input from './Input'
import Avatar from './Avatar'
import Settings from './Settings'
import { Store } from '../../interfaces/storeTypes'

function Home() {
  const sopen = useSelector((state: Store) => state.sopen)
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
