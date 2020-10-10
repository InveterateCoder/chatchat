import React from 'react'
import {
  Container, Avatar, TextField, FormControl,
  makeStyles, Typography, Button, Grid, Link
} from '@material-ui/core'
import { Lock } from '@material-ui/icons'
import { Link as LinkDOM } from 'react-router-dom'

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

function SignIn() {
  const classes = useStyles()

  const onSubmit = (ev) => {
    ev.preventDefault()
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
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Password"
          placeholder="Your password"
          type="password"
        />
        <Button type="submit" size="small" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>Sign In</Button>
        <Grid container justify="space-between" style={{ marginTop: '-.7em' }}>
          <Grid item>
            <Link component={LinkDOM} to="/restore">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={LinkDOM} to="/signup">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  )
}
export default SignIn
