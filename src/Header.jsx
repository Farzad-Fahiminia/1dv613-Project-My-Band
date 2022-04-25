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
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add album</Link>
      </div>
    </nav>
  )
}

export default Header
