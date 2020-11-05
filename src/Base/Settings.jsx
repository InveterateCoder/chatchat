import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField,
  Avatar, makeStyles, ButtonBase, DialogActions,
  FormControl, Tooltip, IconButton,
} from '@material-ui/core'
import { Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { openSettings, setError } from '../store/actions'
import { changeUser } from '../store/apiActions'
import { validateChangeUserForm, validateImageType } from '../../shared/validators'

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
  const auth = useSelector((state) => state.auth)
  const refava = useSelector((state) => state.refava)
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const [nickErr, setNickErr] = useState('')
  const [disabled, setDisabled] = useState(false)
  const classes = useStyles()

  const onFileChange = ({ target }) => {
    const file = target.files[0]
    URL.revokeObjectURL(imageUrl)
    if (!validateImageType(file)) {
      setImageUrl(URL.createObjectURL(file))
    } else {
      // eslint-disable-next-line no-param-reassign
      target.value = ''
      setImageUrl('')
      dispatch(setError({
        message: 'Wrong image type.',
        open: true,
      }))
    }
  }

  const onChange = () => {
    if (nickErr) setNickErr('')
  }

  const cancel = () => {
    URL.revokeObjectURL(imageUrl)
    dispatch(openSettings(false))
  }

  const submit = (ev) => {
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
      if (variables.nick === auth.nick) {
        form.delete('nick')
      }
      if (Array.from(form.keys()).length > 0) {
        dispatch(changeUser(setDisabled, form))
      }
      URL.revokeObjectURL(imageUrl)
    } else {
      if (validity.errors.nick) {
        setNickErr(validity.errors.nick)
      }
      if (validity.errors.image) {
        dispatch(setError({
          message: validity.errors.image,
          open: true,
        }))
      }
    }
  }

  const avaUrl = `/avatar/${auth.id}?refava=${refava}`
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
            disabled={disabled}
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
                defaultValue={auth.nick}
                helperText={nickErr}
                error={Boolean(nickErr)}
                name="nick"
                onChange={onChange}
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Cancel" placement="top">
            <IconButton
              color="secondary"
              onClick={cancel}
              disabled={disabled}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save" placement="top">
            <IconButton
              color="primary"
              type="submit"
              disabled={disabled}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </FormControl>
    </Dialog>
  )
}

export default Settings
