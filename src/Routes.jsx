/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppBar from './AppBar.jsx'
import Drawer from './Drawer.jsx'
import Body from './Body.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Restore from './Restore.jsx'

export default function Routes() {
  const token = useSelector((state) => state.token)
  if (token) {
    return (
      <Route render={
        (routeProps) => {
          <>
            <AppBar {...routeProps} />
            <Drawer {...routeProps} />
            <Body {...routeProps} />
          </>
        }
      }
      />
    )
  }
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/restore" component={Restore} />
      <Redirect to="/signin" />
    </Switch>
  )
}
