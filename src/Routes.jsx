/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Base from './Base'
import Main from './Main.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'

export default function Routes() {
  const creds = useSelector((state) => state.creds)
  if (creds) {
    return (
      <>
        <Route component={Base} />
        <Switch>
          <Route path="/main" exact component={Main} />
          <Redirect to="/main" />
        </Switch>
      </>
    )
  }
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Redirect to="/signin" />
    </Switch>
  )
}
