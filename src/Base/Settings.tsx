import React, { BaseSyntheticEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField,
  Avatar, makeStyles, ButtonBase, DialogActions,
  FormControl, Tooltip, IconButton,
} from '@material-ui/core'
import { Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { openSettings, setError } from '../store/actions'
import { validateChangeUserForm, validateImageType } from '../../shared/validators'
import { Type, Package, ChangeUser } from '../../shared/types'
import { Store } from '../store/types'

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
  const id = useSelector((state: Store) => state.id)
  const nick = useSelector((state: Store) => state.nick)
  const refava = useSelector((state: Store) => state.refava)
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const [nickErr, setNickErr] = useState('')
  const [disabled, setDisabled] = useState(false)
  const classes = useStyles()

  const onFileChange = ({ target }: { target: HTMLInputElement }) => {
    if (!target.files) return
    const file = target.files[0]
    URL.revokeObjectURL(imageUrl)
    if (!validateImageType(file)) {
      setImageUrl(URL.createObjectURL(file))
    } else {
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

  const submit = async (ev: BaseSyntheticEvent) => {
    try {
      ev.preventDefault()
      const form = new FormData(ev.target)
      const variables: {
        [key: string]: string | File | null | undefined,
        nick?: string,
        image?: File,
      } = {}
      Array.from(form.entries()).forEach(([key, val]) => {
        variables[key] = val
      })
      const validity = validateChangeUserForm(variables)
      if (validity.valid) {
        let image
        if (!variables.image?.size) {
          delete variables.image
        } else {
          const reader = new FileReader()
          await new Promise((resolve, reject) => {
            reader.onload = (ev) => {
              const binary = ev.target?.result
              if (typeof binary === 'string')
                image = btoa(binary)
              resolve()
            }
            if (variables.image)
              reader.readAsBinaryString(variables.image)
            else reject('Something went wrong. Contact the administration.')
          })
        }
        if (variables.nick === nick) {
          delete variables.nick
        }
        if (Object.keys(variables).length > 0) {
          setDisabled(true)
          const data: Package<ChangeUser> = {
            type: Type.CHANGE_USER,
            payload: {
              nick: variables.nick,
              image: image,
              imageType: variables.image?.type,
            }
          }
          window._WS?.send(JSON.stringify(data))
        } else {
          dispatch(openSettings(false))
        }
        URL.revokeObjectURL(imageUrl)
      } else {
        if (validity.errors.nick) {
          setNickErr(validity.errors.nick)
        }
        if (validity.errors.image) {
          throw new Error(validity.errors.image)
        }
      }
    } catch (err) {
      setDisabled(false)
      dispatch(setError({
        message: err.message,
        open: true,
      }))
    }
  }

  const avaUrl = `/avatar/${id}?refava=${refava}`
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
                defaultValue={nick}
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
