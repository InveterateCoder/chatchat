import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Container, Typography } from '@material-ui/core'
import { BarLoader } from 'react-spinners'
import { logout } from './store/actions'
import { WS } from './store/types'
import { Auth, Type, Package } from '../shared/types'
import messageProcessor from './messageProcessor'

function Authorize({ token }: { token: string }) {
  const dispatch = useDispatch()
  const [failed, setFailed] = useState(true)
  const connectWS = () => {
    const loc = window.location
    let url = loc.protocol === 'https:' ? 'wss://' : 'ws://'
    url += loc.hostname
    url += `:${loc.port}/ws?token=` + token
    const socket: WS = new window.WebSocket(url)
    // todo delete this def
    window._WS = socket
    socket.onmessage = (ev) => messageProcessor(socket, ev)
    socket.onopen = function (ev) {
      const auth: Package<any> = {
        type: Type.AUTH,
        payload: undefined,
      }
      socket.send(JSON.stringify(auth))
    }
    socket.onerror = function (err) {
      console.error(err)
    }
    socket.onclose = function (event) {
      if (event.code === 4001) {
        dispatch(logout())
      } else {
        setFailed(true)
      }
    }
  }
  useEffect(() => {
    connectWS()
  }, [])
  return (
    <>
      <BarLoader
        loading
        color="#3f51b5"
        width="100%"
      />
      {
        failed && <Container maxWidth="sm">
          <br />
          <Typography variant="h3" color="error" align="center">
            Connection Failed
          </Typography>
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button variant="outlined" color="primary" onClick={connectWS}>
              Retry
            </Button>
          </div>
        </Container>
      }
    </>
  )
}
export default Authorize
