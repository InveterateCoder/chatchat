import React from 'react'
import { Drawer, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: theme.mixins.toolbar,
}))

function AppDrawer() {
  const classes = useStyles()

  return (
    <>
      <Drawer anchor="left" open variant="permanent">
        <h3>Hello</h3>
      </Drawer>
      <Typography variant="h1">Hello</Typography>
    </>
  )
}

export default AppDrawer
