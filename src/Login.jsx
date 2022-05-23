import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword,
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
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(LoginContext)

  const register = async (event) => {
    try {
      event.preventDefault()
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async (event) => {
    try {
      event.preventDefault()
      setPersistence(auth, browserSessionPersistence)
      const response = await signInWithEmailAndPassword(auth, username, password)
      if (response.user.email) {
        const authenticate = getAuth()
        const token = await getIdToken(authenticate.currentUser)
        console.log(token)
        setLoggedIn(true)
        navigate('/user')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h1 className="center extreme">Login.</h1>
      <div className="content create">
        <form>
          <label>Email:</label>
          <input type="email" required onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={login}>Login</button>
        </form>
        {/* <button type="submit" onClick={signout}>Signout</button> */}
        <br />
        <hr />
        <br />
        <h2 className="center">Register.</h2>
        <form>
          <label>Email:</label>
          <input type="email" required onChange={(e) => setRegisterEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" required onChange={(e) => setRegisterPassword(e.target.value)} />
          <button type="submit" onClick={register}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Login
