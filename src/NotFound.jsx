import React from 'react'
import { NavLink } from 'react-router-dom'

/**
  * Not found component.
  *
  * @returns {*} - Nothing.
  */
function NotFound() {
  return (
    <div className="content center">
      <h2 className="extreme">404</h2>
      <h3>Not found</h3>
      <p>Page cannot be found.</p><br />
      <NavLink to="/">Back to the homepage</NavLink>
    </div>
  )
}

export default NotFound
