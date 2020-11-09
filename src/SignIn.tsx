import React, { BaseSyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Container, Avatar, TextField, FormControl,
  makeStyles, Typography, Button, Grid,
} from '@material-ui/core'
import { Lock } from '@material-ui/icons'
import { SignInErrors, validateSignInForm } from '../shared/validators'
import { setSignUP } from './store/actions'
import { signin } from './store/apiActions'
import withWait from './infrastructure/withWait'
import { iSignIn } from '../interfaces/storeTypes'

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
}))

function SignIn({ load }: { load: (state: boolean) => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [errors, setErrors]: [errors: SignInErrors, setErrors: (s: SignInErrors) => void] = useState({
    nick: '',
    password: '',
  })

  const onChange = ({ target: { name } }: { target: { name: string } }) => {
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const onSubmit = (ev: BaseSyntheticEvent) => {
    ev.preventDefault()
    const form = new FormData(ev.target)
    const variables: iSignIn = {
      nick: '',
      password: '',
    }
    Array.from(form.entries()).forEach(([key, val]) => {
      variables[key] = val.toString()
    })
    const validity = validateSignInForm(variables)
    if (validity.valid) {
      dispatch(signin(load, variables))
    } else {
      setErrors(validity.errors)
    }
  }
  return (
    <Container maxWidth="sm">
      <FormControl component="form" className={classes.form} onSubmit={onSubmit}>
        <Avatar>
          <Lock />
        </Avatar>
        <Typography variant="h5" style={{ marginTop: '-.7em' }}>
          Sign In
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Nickname"
          placeholder="Your nickname"
          name="nick"
          error={Boolean(errors.nick)}
          helperText={errors.nick}
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
          error={Boolean(errors.password)}
          helperText={errors.password}
          onChange={onChange}
        />
        <Button type="submit" size="small" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>Sign In</Button>
        <Grid container justify="space-between" style={{ marginTop: '-.7em' }}>
          <Grid item />
          <Grid item>
            <Button onClick={() => dispatch(setSignUP(true))} color="inherit">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  )
}
export default withWait(SignIn)
