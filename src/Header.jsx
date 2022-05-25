import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
import LoginContext from './Context'

/**
 * Header component.
 *
 * @return {*} Returns component.
 */
function Header() {
  const { loggedIn } = useContext(LoginContext)
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(LoginContext)

  const signout = async () => {
    try {
      await signOut(auth)
      setLoggedIn(false)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="header-wrapper">
      <nav className="navbar">
        <h1><NavLink to="/">\SONICRED\</NavLink></h1>
        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler"><i className="ri-menu-line">Menu</i></label>
        <div className="menu">
          <ul className="list">
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Home</NavLink></li>
            <li><NavLink to="/records" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>My Records</NavLink></li>
            {loggedIn === true && <li><NavLink to="/user" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>User</NavLink></li>}
            {loggedIn === true && <li><NavLink to="/register" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Register</NavLink></li>}
            {loggedIn === true && <li><NavLink to="/" onClick={signout}>Signout</NavLink></li>}
            {loggedIn === false && <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Login</NavLink></li>}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
