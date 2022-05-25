import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  getIdToken, getAuth
} from 'firebase/auth'
import { auth } from './firebase-config'
import LoginContext from './Context'

/**
 * Login component.
 *
 * @return {*} Returns component.
 */
function Register() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(LoginContext)

  const register = async (event) => {
    try {
      event.preventDefault()
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
      const response = await signInWithEmailAndPassword(auth, registerEmail, registerPassword)
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
      <div className="content create">
        <h1 className="center">Register.</h1>
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

export default Register
