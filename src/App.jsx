import React, { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import Create from './Create'
import Edit from './Edit'
import Records from './Records'
import Login from './Login'
import User from './User'
import LoginContext from './Context'
import ProtectedRoute from './ProtectedRoute'
import NotFound from './NotFound'

/**
 * App component.
 *
 * @return {*} Returns component.
 */
function App() {
  const session = JSON.parse(sessionStorage.getItem(Object.keys(sessionStorage)
    .filter((session) => session.includes('firebase'))[0]))
  // const hasSession = session ? session.stsTokenManager.accessToken : false
  const hasSession = session !== null || false
  const [loggedIn, setLoggedIn] = useState(hasSession)

  console.log(hasSession)

  const loggedInValue = useMemo(() => ({
    loggedIn, setLoggedIn
  }), [loggedIn])

  const [componentToRender, setComponentToRender] = useState(null)
  const onEditHandler = ({
    artist, recordTitle, releaseYear, format, coverURL, id
  }) => {
    setComponentToRender(<Edit
      artist={artist}
      recordTitle={recordTitle}
      releaseYear={releaseYear}
      format={format}
      coverURL={coverURL}
      id={id}
      session={session}
    />)
  }

  return (
    <div className="App">
      <LoginContext.Provider value={loggedInValue}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/records" element={<Records onEditHandler={onEditHandler} />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<Create />} />
              <Route path="/edit" element={componentToRender || <Edit />} />
              <Route path="/user" element={<User />} />
            </Route>
            <Route path="/login" element={<Login session={session} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  )
}

export default App
