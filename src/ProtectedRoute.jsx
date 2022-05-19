import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import LoginContext from './Context'
import User from './User'

/**
 * ProtectedRoute component.
 *
 * @return {*} Returns component.
 */
function ProtectedRoute() {
  const { loggedIn } = useContext(LoginContext)
  console.log(loggedIn)

  if (!loggedIn) {
    return <Navigate to={{ pathname: '/login' }} />
  } return <User />
}

export default ProtectedRoute
