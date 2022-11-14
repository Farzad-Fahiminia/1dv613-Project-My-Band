import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useFetch from './useFetch'

/**
 * User component.
 *
 * @return {JSX} Returns component.
 */
function User() {
  const [record, setRecord] = useState(null)
  // const { data, error, isPending } = useFetch('https://sonicred-resource-server.herokuapp.com/api/v1/records')
  const { data, error, isPending } = useFetch('https://web-production-8fdc.up.railway.app/api/v1/records')

  /**
  * Fetches records.
  *
  * @returns {*} - Records.
  */
  function fetchData() {
    if (record === null) {
      // const apiUrl = 'http://localhost:8081/api/v1/records/'
      // const apiUrl = 'https://sonicred-resource-server.herokuapp.com/api/v1/records'
      const apiUrl = 'https://web-production-8fdc.up.railway.app/api/v1/records'
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setRecord(data))
    }
  }
  fetchData()

  return (
    <div>
      <h1 className="center extreme">User</h1>
      <div className="content create">
        <p>Welcome to the dashboard, User</p>
        <NavLink to="/records/">View more records</NavLink>
      </div>

      { error && <div>{ error }</div> }
      { isPending && <div className="loading">Loading...</div> }
      <br />
      <div className="light-text">
        { data && record !== null && (
          <div className="latest-record center-div">
            <h2 className="recently-added light-text">Recently added</h2>
            <NavLink to={`/records/${record[record.length - 1].id}`}>
              <img className="cover-image" src={record[record.length - 1].coverURL} alt="Cover" />
              <p className="band-title light-text">{record[record.length - 1].artist}</p>
              <p className="band-album center light-text">{record[record.length - 1].recordTitle}</p>
              <p className="center small light-text">
                Release Year: {record[record.length - 1].releaseYear},
                Format: {record[record.length - 1].format}
              </p>
            </NavLink>
            <br />
          </div>
        )}
      </div>
    </div>
  )
}

export default User
