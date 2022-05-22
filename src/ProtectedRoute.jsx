import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import LoginContext from './Context'
import Login from './Login'

/**
 * ProtectedRoute component.
 *
 * @return {*} Returns component.
 */
function ProtectedRoute() {
  const { loggedIn } = useContext(LoginContext)
  console.log(loggedIn)
  return loggedIn ? <Outlet /> : <Login />
}

export default ProtectedRoute
