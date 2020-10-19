import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField,
  Avatar, makeStyles, ButtonBase, DialogActions,
} from '@material-ui/core'

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
  const sopen = useSelector((state) => state.sopen)
  const creds = useSelector((state) => state.creds)
  const [imageUrl, setImageUrl] = useState('')
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

  const avaUrl = `/avatar/${creds.id}`
  return (
    <Dialog fullWidth maxWidth="sm" open={sopen}>
      <DialogTitle>User settings</DialogTitle>
      <DialogContent>
        <input accept=".jpg,.png" type="file" id="image" name="image" className={classes.fileInput} onChange={onFileChange} />
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
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  )
}

export default Settings
