import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Header component.
 *
 * @return {*} Returns component.
 */
function Header() {
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
            <li><NavLink to="/edit" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Edit Record</NavLink></li>
            <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Login</NavLink></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
