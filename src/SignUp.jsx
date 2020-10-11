/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import {
  Container, Avatar, TextField, FormControl, Link,
  makeStyles, Typography, Button, Grid, Badge, ButtonBase,
} from '@material-ui/core'
import { Photo } from '@material-ui/icons'
import { Link as LinkDOM } from 'react-router-dom'
import { signup } from '../shared/apiRoutes'

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

function SignUp() {
  const classes = useStyles()
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({
    nick: '',
    password: '',
    confirm: '',
    image: true,
  })
  const onFileChange = (ev) => {
    const file = ev.target.files[0]
    URL.revokeObjectURL(imageUrl)
    setImageUrl(URL.createObjectURL(file))
    setErrors({ ...errors, image: true })
  }
  const validateForm = (form) => {
    const newErrors = {
      nick: '',
      password: '',
      confirm: '',
      image: true,
    }
    if (form.nick.length < 3 || form.nick.length > 40) {
      newErrors.nick = 'nickname must be from 3 to 40 characters long'
    }
    if (form.password.length < 6) {
      newErrors.password = 'password must be minimum 6 characters long'
    }
    if (form.password.length > 128) {
      newErrors.password = 'password\'s length exceeds 128 characters'
    }
    if (!newErrors.password && form.password !== form.confirm) {
      newErrors.confirm = 'failed to confirm, passwords do not match'
    }
    if (!imageUrl) {
      newErrors.image = false
    }
    setErrors(newErrors)
    if (newErrors.nick || newErrors.password || newErrors.confirm || !newErrors.image) {
      return false
    }
    return true
  }
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
    if (validateForm(variables)) {
      fetch(signup, {
        method: 'POST',
        body: form,
      }).then((res) => console.log(res.statusText))
    }
  }
  return (
    <Container maxWidth="sm">
      <FormControl component="form" className={classes.form} onSubmit={onSubmit} encType="multipart/form-data">
        <input accept="image/*" type="file" id="image" name="image" className={classes.fileInput} onChange={onFileChange} />
        <ButtonBase component="label" htmlFor="image" className={classes.fileBtnRadius}>
          <Badge badgeContent="Required" color="error" className={classes.fileBtnRadius} invisible={errors.image}>
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
    </Container>
  )
}
export default SignUp
