/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import {
  Container, Avatar, TextField, FormControl, Link,
  makeStyles, Typography, Button, Grid, Badge,
  ButtonBase, Snackbar, IconButton, Slide
} from '@material-ui/core'
import { Photo, Close } from '@material-ui/icons'
import { Link as LinkDOM } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../shared/apiRoutes'
import { validateSignUpForm } from '../shared/validators'
import { setJWTToken } from './store/actions'

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
  snack: {
    whiteSpace: 'pre-line',
    '& > .MuiPaper-root': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))

function SignUp() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({
    nick: '',
    password: '',
    confirm: '',
    image: '',
  })
  const [error, setError] = useState({
    message: '',
    open: false,
  })
  const onFileChange = (ev) => {
    const file = ev.target.files[0]
    URL.revokeObjectURL(imageUrl)
    setImageUrl(URL.createObjectURL(file))
    setErrors({ ...errors, image: '' })
  }
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
    const validity = validateSignUpForm(variables)
    if (validity.valid) {
      try {
        const res = await fetch(signup, { method: 'POST', body: form })
        if (res.status === 200) {
          const token = await res.text()
          if (token) {
            dispatch(setJWTToken(token))
          } else {
            throw new Error('Something went wrong, please try again.')
          }
        } else {
          throw new Error(await res.text())
        }
      } catch (err) {
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
      <FormControl component="form" className={classes.form} onSubmit={onSubmit} encType="multipart/form-data">
        <input accept="image/*" type="file" id="image" name="image" className={classes.fileInput} onChange={onFileChange} />
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
            <Link component={LinkDOM} to="/signin">
              Sign In
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
export default SignUp
