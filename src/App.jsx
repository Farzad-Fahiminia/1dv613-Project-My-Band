import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import Create from './Create'
import Edit from './Edit'
import Records from './Records'
import Login from './Login'
import User from './User'

/**
 * App component.
 *
 * @return {*} Returns component.
 */
function App() {
  const [componentToRender, setComponentToRender] = useState(null)

  const onEditHandler = ({
    artist, recordTitle, releaseYear, format, coverURL, id
  }) => {
    // eslint-disable-next-line max-len
    setComponentToRender(<Edit artist={artist} recordTitle={recordTitle} releaseYear={releaseYear} format={format} coverURL={coverURL} id={id} />)
  }

  // setComponentToRender(<Records onEditHandler={onEditHandler} />)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/records" element={<Records onEditHandler={onEditHandler} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={componentToRender || <Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
