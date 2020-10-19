import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField,
  Avatar, makeStyles, ButtonBase, DialogActions, Button,
} from '@material-ui/core'
import { Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { openSettings } from './store/actions'

const useStyles = makeStyles(() => ({
  fileInput: {
    display: 'none',
  },
  avaBtn: {
    borderRadius: '20px',
  },
  nickGrid: {
    flexGrow: 1,
  },
}))

function Settings() {
  const creds = useSelector((state) => state.creds)
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const classes = useStyles()

  const onFileChange = ({ target: { files } }) => {
    const file = files[0]
    if (['image/png', 'image/jpeg'].includes(file.type)) {
      URL.revokeObjectURL(imageUrl)
      setImageUrl(URL.createObjectURL(file))
    } else {
      alert("not supported")
    }
  }

  const cancel = () => {
    URL.revokeObjectURL(imageUrl)
    dispatch(openSettings(false))
  }

  const avaUrl = `/avatar/${creds.id}`
  return (
    <Dialog fullWidth maxWidth="sm" open>
      <DialogTitle>User settings</DialogTitle>
      <DialogContent>
        <input
          accept=".jpg,.png"
          type="file"
          id="image"
          name="image"
          className={classes.fileInput}
          onChange={onFileChange}
        />
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <ButtonBase component="label" htmlFor="image" className={classes.avaBtn}>
              <Avatar src={imageUrl || avaUrl} />
            </ButtonBase>
          </Grid>
          <Grid item className={classes.nickGrid}>
            <TextField
              fullWidth
              label="Nickname"
              defaultValue={creds.nick}
              helperText={error}
              error={Boolean(error)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CancelIcon />}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Settings
