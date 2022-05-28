import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useFetch from './useFetch'

/**
 * Home component.
 *
 * @return {*} Returns component.
 */
function Home() {
  const [record, setRecord] = useState(null)
  const { data, error, isPending } = useFetch('https://sonicred-resource-server.herokuapp.com/api/v1/records')

  /**
   * Fetches records.
   *
   * @returns {*} - Nothing.
   */
  function fetchData() {
    if (record === null) {
      // const apiUrl = 'http://localhost:8081/api/v1/records/'
      const apiUrl = 'https://sonicred-resource-server.herokuapp.com/api/v1/records'
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setRecord(data))
    }
  }

  fetchData()

  return (
    <div className="bg">
      <div className="scroll">
        <h1 className="frontpage-headline" id="scroll-text">music playing on stage.</h1>
      </div>
      <div className="content">
        { error && <div>{ error }</div> }
        <p className="uppercase medium text-bg light-text">Performing now </p>
        { isPending && <div className="loading">Loading...</div> }
        { data && record !== null && (
          <div>
            <p className="extra-large text-bg light-text">{record[record.length - 1].artist}</p>
            <p className="uppercase medium text-bg light-text">{record[record.length - 1].recordTitle}</p>
          </div>
        )}
        <NavLink to="/records/" className="uppercase white">See more records</NavLink>
      </div>
    </div>
  )
}

export default Home
