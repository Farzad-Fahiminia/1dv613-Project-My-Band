import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import Create from './Create'
import Edit from './Edit'
import Records from './Records'

/**
 * App component.
 *
 * @return {*} Returns component.
 */
function App() {
  return (
    // <div>
    //   <Header />
    //   <Home />
    //   <Footer />
    // </div>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/records" element={<Records />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
