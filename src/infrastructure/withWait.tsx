import React, { useState, } from 'react'
import { css } from '@emotion/core'
import { DotLoader } from 'react-spinners'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.modal,
  },
}))

const override = css`
margin: auto;
`

const withWait = (Cmpnnt: any) => (props: any) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const load = (state: boolean) => {
    if (state) {
      (document.activeElement as HTMLElement)?.blur()
    }
    setLoading(state)
  }
  return (
    <>
      <div className={classes.root} style={{ display: loading ? 'flex' : 'none' }}>
        <DotLoader
          css={override}
          size={150}
          color="#123abc"
          loading={loading}
        />
      </div>
      <Cmpnnt {...props} load={load} />
    </>
  )
}
export default withWait
