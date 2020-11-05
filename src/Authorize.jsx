import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { receiveAuth } from './store/apiActions'

function Authorize() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(receiveAuth())
  }, [])
  return (
    <BarLoader
      loading
      color="#3f51b5"
      width="100%"
    />
  )
}
export default Authorize
