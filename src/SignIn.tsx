import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  Container, Avatar, TextField, FormControl,
  makeStyles, Typography, Button, Grid,
} from '@material-ui/core'
import { Lock } from '@material-ui/icons'
import { validateSignInForm } from '../shared/validators'
import { setSignUP } from './store/actions'
import { signin } from './store/apiActions'
import withWait from './withWait'

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

function SignIn({ load }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({
    nick: '',
    password: '',
  })

  const onChange = ({ target: { name } }) => {
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const form = new FormData(ev.target)
    const variables = {}
    Array.from(form.entries()).forEach(([key, val]) => {
      variables[key] = val
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
SignIn.propTypes = {
  load: PropTypes.func.isRequired,
}
export default withWait(SignIn)
