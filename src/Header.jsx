import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Header component.
 *
 * @return {*} Returns component.
 */
function Header() {
  return (
    <nav className="navbar">
      <h1><Link to="/">SONICRED</Link></h1>
      <input type="checkbox" id="toggler" />
      <label htmlFor="toggler"><i className="ri-menu-line">Menu</i></label>
      <div className="menu">
        <ul className="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/records">My Records</Link></li>
          <li><Link to="/create">Add Record</Link></li>
          <li><Link to="/Login">Login</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
