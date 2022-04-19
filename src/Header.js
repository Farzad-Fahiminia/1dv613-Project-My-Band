// import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar">
      <h1>Logo</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/addalbum">Add Album</a>
        {/* <Link to='/'>Home</Link>
        <Link to='/create'>Add Album</Link> */}
      </div>
    </nav>
  )
}

export default Header
