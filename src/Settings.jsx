import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField,
  Avatar, makeStyles, ButtonBase, DialogActions, Button,
  FormControl,
} from '@material-ui/core'
import { Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import Error from './Error.jsx'
import { openSettings } from './store/actions'
import { validateChangeUserForm } from '../shared/validators'
import { changeUser } from '../shared/apiRoutes'

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
  const [nickErr, setNickErr] = useState('')
  const [error, setError] = useState({
    message: '',
    open: false,
  })
  const classes = useStyles()

  const onFileChange = ({ target }) => {
    const file = target.files[0]
    URL.revokeObjectURL(imageUrl)
    if (['image/png', 'image/jpeg'].includes(file.type)) {
      setImageUrl(URL.createObjectURL(file))
    } else {
      // eslint-disable-next-line no-param-reassign
      target.value = ''
      setImageUrl('')
      setError({
        message: 'Wrong image type.',
        open: true,
      })
    }
  }

  const onChange = () => {
    if (nickErr) setNickErr('')
  }

  const cancel = () => {
    URL.revokeObjectURL(imageUrl)
    dispatch(openSettings(false))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const form = new FormData(ev.target)
    const variables = {}
    Array.from(form.entries()).forEach(([key, val]) => {
      variables[key] = val
    })
    const validity = validateChangeUserForm(variables)
    if (validity.valid) {
      if (!variables.image.size) {
        form.delete('image')
      }
      if (variables.nick === creds.nick) {
        form.delete('nick')
      }
      if (Array.from(form.keys()).length > 0) {
        try {
          const res = await fetch(changeUser, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${creds.token}`,
            },
            body: form,
          })
          if (res.status !== 200) {
            throw new Error(await res.text())
          }
        } catch (err) {
          setError({
            message: err.message,
            open: true,
          })
        }
      }
      URL.revokeObjectURL(imageUrl)
      dispatch(openSettings(false))
    } else {
      if (validity.errors.nick) {
        setNickErr(validity.errors.nick)
      }
      if (validity.errors.image) {
        setError({
          message: validity.errors.image,
          open: true,
        })
      }
    }
  }

  const avaUrl = `/avatar/${creds.id}`
  return (
    <Dialog fullWidth maxWidth="sm" open>
      <DialogTitle>User settings</DialogTitle>
      <FormControl component="form" onSubmit={submit}>
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
                helperText={nickErr}
                error={Boolean(nickErr)}
                name="nick"
                onChange={onChange}
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
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </FormControl>
      <Error
        open={error.open}
        message={error.message}
        onOpenClose={(state) => setError({ ...error, open: state })}
      />
    </Dialog>
  )
}

export default Settings
