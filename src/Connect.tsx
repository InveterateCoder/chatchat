import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@material-ui/core'
import { BarLoader } from 'react-spinners'
import connect from './wsHub/connect'
import { Store } from '../interfaces/storeTypes'
import { setConFailed } from './store/actions'

function Connect({ token }: { token: string }) {
  const dispatch = useDispatch()
  const failed = useSelector((state: Store) => state.conFailed)
  useEffect(() => {
    connect(token)
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
              dispatch(setConFailed(false))
              connect(token)
            }}>
              Retry
            </Button>
          </div>
        </Container>
      }
    </>
  )
}
export default Connect
