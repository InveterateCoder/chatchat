/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  Dialog, DialogContent, DialogContentText,
  DialogTitle, Grid, IconButton, makeStyles, Paper,
} from '@material-ui/core'
import { Close as CloseIcon, Maximize as ExpandIcon } from '@material-ui/icons'
import Draggable from 'react-draggable'

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

function PaperComponent(props) {
  return (
    <Draggable handle="#private-window-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

function Private() {
  const classes = useStyles()
  return (
    <Dialog
      open
      PaperComponent={PaperComponent}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle style={{ cursor: 'move' }} id="private-window-title">
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            Hello
          </Grid>
          <Grid item>
            <Grid container direction="row" style={{ columnGap: 10 }}>
              <Grid item>
                <IconButton className={classes.closeBtn} disableRipple size="small" color="inherit">
                  <ExpandIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton className={classes.closeBtn} disableRipple size="small" color="secondary">
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hello there
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default Private
