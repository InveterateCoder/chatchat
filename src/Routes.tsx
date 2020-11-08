import React from 'react'
import { useSelector } from 'react-redux'
import Base from './Base/Index'
import Users from './Users/Index'
import Content from './Content/Index'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Connect from './Connect'
import { Store } from './store/types'

export default function Routes() {
  const token = useSelector((state: Store) => state.token)
  const id = useSelector((state: Store) => state.id)
  const signup = useSelector((state: Store) => state.signup)
  if (token) {
    if (!id) {
      return <Connect token={token} />
    }
    return (
      <>
        <Users />
        <Content />
        <Base />
      </>
    )
  }
  if (signup) {
    return <SignUp />
  }
  return <SignIn />
}
