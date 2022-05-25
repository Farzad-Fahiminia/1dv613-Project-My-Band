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
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      const response = await signInWithEmailAndPassword(auth, registerEmail, registerPassword)
      if (response.user.email) {
        const authenticate = getAuth()
        await getIdToken(authenticate.currentUser)
        setLoggedIn(true)
        navigate('/user')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h1 className="extreme center">Register.</h1>
      <div className="content create">
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
