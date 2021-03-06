import React, { BaseSyntheticEvent, useState } from 'react'
import {
  Container, Avatar, TextField, FormControl,
  makeStyles, Typography, Button, Grid, Badge, ButtonBase,
} from '@material-ui/core'
import { Photo } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import withWait from './infrastructure/withWait'
import { setSignUP, setError } from './store/actions'
import { signup } from './store/apiActions'
import { SignUpErrors, validateSignUpForm, validateImageType } from '../shared/validators'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    background: theme.palette.background.paper,
    rowGap: '1.7em',
    marginTop: '5em',
    boxShadow: theme.shadows[8],
  },
  fileInput: {
    display: 'none',
  },
  fileBtnRadius: {
    borderRadius: 35,
  },
}))

function SignUp({ load }: { load: (state: boolean) => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors]: [errors: SignUpErrors, setErrors: (errors: SignUpErrors) => void] = useState({
    nick: '',
    password: '',
    confirm: '',
    image: '',
  })
  const onFileChange = ({ target }: { target: HTMLInputElement }) => {
    if (!target.files) return
    const file = target.files[0]
    URL.revokeObjectURL(imageUrl)
    if (!validateImageType(file)) {
      setImageUrl(URL.createObjectURL(file))
      setErrors({ ...errors, image: '' })
    } else {
      target.value = ''
      setImageUrl('')
      dispatch(setError({
        message: 'File type is not supported.',
        open: true,
      }))
    }
  }
  const onChange = ({ target: { name } }: { target: { name: string } }) => {
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }
  const onSubmit = async (ev: BaseSyntheticEvent) => {
    ev.preventDefault()
    const form = new FormData(ev.target)
    const variables: {
      [key: string]: string | File | undefined,
      nick: string,
      password: string,
      confirm: string,
      image?: File,
    } = {
      nick: '',
      password: '',
      confirm: ''
    }
    Array.from(form.entries()).forEach(([key, val]) => {
      variables[key] = val
    })
    const validity = validateSignUpForm(variables)
    if (validity.valid) {
      dispatch(signup(load, form))
    } else {
      setErrors(validity.errors)
    }
  }
  return (
    <Container maxWidth="sm">
      <FormControl component="form" className={classes.form} onSubmit={onSubmit}>
        <input accept=".jpg,.png" type="file" id="image" name="image" className={classes.fileInput} onChange={onFileChange} />
        <ButtonBase component="label" htmlFor="image" className={classes.fileBtnRadius}>
          <Badge badgeContent="Required" color="error" className={classes.fileBtnRadius} invisible={!errors.image}>
            <Avatar src={imageUrl}>
              <Photo />
            </Avatar>
          </Badge>
        </ButtonBase>
        <Typography variant="h5" style={{ marginTop: '-.7em' }}>
          Sign Up
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Nickname"
          placeholder="Create a nickname"
          name="nick"
          helperText={errors.nick}
          error={Boolean(errors.nick)}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Password"
          placeholder="Your password"
          type="password"
          name="password"
          helperText={errors.password}
          error={Boolean(errors.password)}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Confirm Password"
          placeholder="Your password again"
          type="password"
          name="confirm"
          helperText={errors.confirm}
          error={Boolean(errors.confirm)}
          onChange={onChange}
        />
        <Button type="submit" size="small" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>Sign Up</Button>
        <Grid container justify="space-between" style={{ marginTop: '-.7em' }}>
          <Grid item />
          <Grid item>
            <Button onClick={() => dispatch(setSignUP(false))} color="inherit">
              Sign In
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  )
}
export default withWait(SignUp)
