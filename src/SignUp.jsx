/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import {
  Container, Avatar, TextField, FormControl,
  makeStyles, Typography, Button, Grid, Badge, IconButton, ButtonBase,
} from '@material-ui/core'
import { Photo } from '@material-ui/icons'

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
    width: '3.5em',
    height: '3.5em',
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
  fileInput: {
    display: 'none',
  },
  fileBtnRadius: {
    borderRadius: 35,
  },
}))

function SignUp() {
  const classes = useStyles()
  return (
    <Container maxWidth="sm">
      <FormControl component="form" className={classes.form}>
        <input accept="image/*" type="file" id="avatar" name="ava" className={classes.fileInput} />
        <ButtonBase component="label" htmlFor="avatar" className={classes.fileBtnRadius}>
          <Badge badgeContent="!" color="error" className={classes.fileBtnRadius}>
            <Avatar
              className={classes.avatar}
              src=""
            >
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
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Password"
          placeholder="Your password"
          type="password"
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Confirm Password"
          placeholder="Your password again"
          type="password"
        />
        <Button size="small" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>Sign In</Button>
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
export default SignUp
