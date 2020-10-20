/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container, Avatar, TextField, FormControl, Link,
  makeStyles, Typography, Button, Grid, Badge, ButtonBase,
} from '@material-ui/core'
import { Photo } from '@material-ui/icons'
import { Link as LinkDOM } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import withWait from './withWait.jsx'
import { signup } from '../shared/apiRoutes'
import { validateSignUpForm } from '../shared/validators'
import { login } from './store/actions'
import Error from './Error.jsx'

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

function SignUp({ load }) {
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
  const onFileChange = ({ target }) => {
    const file = target.files[0]
    URL.revokeObjectURL(imageUrl)
    if (['image/png', 'image/jpeg'].includes(file.type)) {
      setImageUrl(URL.createObjectURL(file))
      setErrors({ ...errors, image: '' })
    } else {
      // eslint-disable-next-line no-param-reassign
      target.value = ''
      setImageUrl('')
      setError({
        message: 'File type is not supported.',
        open: true,
      })
    }
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
        load(true)
        const res = await fetch(signup, { method: 'POST', body: form })
        if (res.status === 200) {
          const creds = await res.json()
          if (creds) {
            dispatch(login(creds))
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
            <Link component={LinkDOM} to="/signin" color="inherit">
              Sign In
            </Link>
          </Grid>
        </Grid>
      </FormControl>
      <Error
        open={error.open}
        message={error.message}
        onOpenClose={(state) => setError({ ...error, open: state })}
      />
    </Container>
  )
}
SignUp.propTypes = {
  load: PropTypes.func.isRequired,
}
export default withWait(SignUp)
