/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import {
  Container, Avatar, TextField, FormControl, Link,
  makeStyles, Typography, Button, Grid, Badge, ButtonBase,
} from '@material-ui/core'
import { Photo } from '@material-ui/icons'
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
  const onFileChange = (ev) => {
    const file = ev.target.files[0]
    URL.revokeObjectURL(imageUrl)
    setImageUrl(URL.createObjectURL(file))
  }
  const onSubmit = (ev) => {
    ev.preventDefault()
  }
  return (
    <Container maxWidth="sm">
      <FormControl component="form" className={classes.form} onSubmit={onSubmit} encType="multipart/form-data">
        <input accept="image/*" type="file" id="avatar" name="ava" className={classes.fileInput} onChange={onFileChange} />
        <ButtonBase component="label" htmlFor="avatar" className={classes.fileBtnRadius}>
          <Badge badgeContent="!" color="error" className={classes.fileBtnRadius} invisible={imageUrl}>
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
