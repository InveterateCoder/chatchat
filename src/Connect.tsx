import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Container, Typography } from '@material-ui/core'
import { BarLoader } from 'react-spinners'
import { logout, setAuth } from './store/actions'
import { Type, Package } from '../interfaces/socketTypes'
import messageProcessor from './messageProcessor'

function Authorize({ token }: { token: string }) {
  const dispatch = useDispatch()
  const [failed, setFailed] = useState(false)
  const connectWS = () => {
    const loc = window.location
    let url = loc.protocol === 'https:' ? 'wss://' : 'ws://'
    url += loc.hostname
    url += `:${loc.port}/ws?token=` + token
    const ws = new window.WebSocket(url)

    ws.onopen = function () {
      setTimeout(() => {
        const auth: Package<any> = {
          type: Type.AUTH,
          payload: undefined,
        }
        ws.send(JSON.stringify(auth))
      }, 350)
    }
    ws.onmessage = (ev) => messageProcessor(ws, ev)
    ws.onclose = function (event) {
      window._WS = undefined
      if (event.code === 4001) {
        dispatch(logout())
      } else {
        dispatch(setAuth({ id: '', nick: '' }))
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
            <Button variant="outlined" color="primary" onClick={() => {
              setFailed(false)
              connectWS()
            }}>
              Retry
            </Button>
          </div>
        </Container>
      }
    </>
  )
}
export default Authorize
