import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase-config'
// import { useNavigate } from 'react-router-dom'

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
  // const navigate = useNavigate()

  const register = async (event) => {
    try {
      event.preventDefault()
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
      // console.log(registerEmail)
      // console.log(registerPassword)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h1 className="center extreme">Login.</h1>
      <div className="content create">
        <form>
          <label>Username:</label>
          <input type="email" required value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>

        <h1 className="center extreme">Register.</h1>
        <form>
          <label>Username:</label>
          <input type="email" onChange={(e) => setRegisterEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" onChange={(e) => setRegisterPassword(e.target.value)} />
          <button type="submit" onClick={register}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Login
