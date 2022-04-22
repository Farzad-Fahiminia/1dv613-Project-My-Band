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
      <Link to="/"><h1>LOGO</h1></Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </div>
    </nav>
  )
}

export default Header
