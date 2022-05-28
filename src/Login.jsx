import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  setPersistence, signInWithEmailAndPassword,
  getIdToken, getAuth, browserSessionPersistence
} from 'firebase/auth'
import { auth } from './firebase-config'
import LoginContext from './Context'

/**
 * Login component.
 *
 * @return {*} Returns component.
 */
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(LoginContext)
  const [errorMessage, setErrorMessage] = useState('')

  const login = async (event) => {
    try {
      event.preventDefault()
      setPersistence(auth, browserSessionPersistence)
      const response = await signInWithEmailAndPassword(auth, username, password)
      if (response.user.email) {
        const authenticate = getAuth()
        await getIdToken(authenticate.currentUser)
        setLoggedIn(true)
        navigate('/user')
      }
    } catch (error) {
      console.log(error.message)
      setErrorMessage('Email or password does not match!')
      setTimeout(() => {
        setErrorMessage('Email or password does not match!')
      }, 5000)
    }
  }

  return (
    <div>
      <h1 className="center extreme">Login.</h1>
      <div className="content create">
        <form onSubmit={login}>
          {errorMessage && (<p className="error"> {errorMessage} </p>)}
          <label>Email:</label>
          <input type="email" required onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        {/* <button type="submit" onClick={signout}>Signout</button> */}
      </div>
    </div>
  )
}

export default Login
