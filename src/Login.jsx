/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import {
  Container, Avatar, TextField, FormControl, makeStyles, Typography, Button, Grid,
} from '@material-ui/core'
import { Lock } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    background: theme.palette.background.paper,
    rowGap: '1.5em',
    marginTop: '5em',
    boxShadow: theme.shadows[8],
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  btnLink: {
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
    '&:active': {
      color: theme.palette.secondary.main,
    },
  },
  input: {
    display: 'none',
  },
}))

function Login() {
  const classes = useStyles()
  return (
    <Container maxWidth="sm">
      <FormControl component="form" className={classes.form}>
        <Avatar className={classes.avatar}>
          <Lock color="action" style={{ fontSize: '1.3em' }} />
        </Avatar>
        <Typography variant="h5" style={{ marginTop: '-1em' }}>
          Sign In
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Code"
          placeholder="4 digit number"
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          placeholder="Your password"
          type="password"
        />
        <Button fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>Sign In</Button>
        <Grid container justify="space-between" style={{ marginTop: '-.7em' }}>
          <Grid item>
            <Button disableRipple className={classes.btnLink} variant="text" size="small" color="primary">Forgot password?</Button>
          </Grid>
          <Grid item>
            <Button disableRipple className={classes.btnLink} variant="text" size="small" color="primary">Sign Up</Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  )
}
export default Login
