import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container, Avatar, TextField, FormControl,
  makeStyles, Typography, Button, Grid, Link,
  IconButton, Snackbar, Slide,
} from '@material-ui/core'
import { Lock, Close } from '@material-ui/icons'
import { Link as LinkDOM } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { validateSignInForm } from '../shared/validators'
import { signin } from '../shared/apiRoutes'
import { login } from './store/actions'
import withWait from './withWait.jsx'

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
  snack: {
    whiteSpace: 'pre-line',
    '& > .MuiPaper-root': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))

function SignIn({ load }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({
    nick: '',
    password: '',
  })
  const [error, setError] = useState({
    message: '',
    open: false,
  })

  const onChange = ({ target: { name } }) => {
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const form = new FormData(ev.target)
    const variables = {}
    Array.from(form.entries()).forEach(([key, val]) => {
      variables[key] = val
    })
    const validity = validateSignInForm(variables)
    if (validity.valid) {
      try {
        load(true)
        const res = await fetch(signin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(variables),
        })
        if (res.status === 200) {
          const token = await res.text()
          if (token) {
            dispatch(login(token))
          } else {
            throw new Error('Something went wrong, please try again.')
          }
        } else {
          throw new Error(await res.text())
        }
      } catch (err) {
        load(false)
        setError({
          message: err.message,
          open: true,
        })
      }
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
            <Link component={LinkDOM} to="/signup" color="inherit">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </FormControl>
      <Snackbar
        className={classes.snack}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={error.open}
        onClose={() => setError({ ...error, open: false })}
        message={error.message}
        TransitionComponent={Slide}
        action={(
          <IconButton color="inherit" onClick={() => setError({ ...error, open: false })}>
            <Close />
          </IconButton>
        )}
      />
    </Container>
  )
}
SignIn.propTypes = {
  load: PropTypes.func.isRequired,
}
export default withWait(SignIn)
