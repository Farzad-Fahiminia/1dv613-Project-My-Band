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
  const { data, error, isPending } = useFetch('https://sonicred-resource-server.herokuapp.com/api/v1/records');

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
    <div>
      <div className="header-section">
        <div className="content">
          { isPending && <div className="loading">Loading...</div> }
          { error && <div>{ error }</div> }

          <div className="left-part">
            <h1 className="frontpage-headline">music<br />playing<br />on stage.</h1>
            { data && record !== null && (
              <p>Performing now {record[record.length - 1].artist}</p>
            )}
          </div>

          <div className="right-part">
            { data && record !== null && (
              <div className="latest-record">
                <h2 className="recently-added">Recently added</h2>
                <NavLink to={`/records/${record[record.length - 1].id}`}>
                  <img className="cover-image" src={record[record.length - 1].coverURL} alt="Cover" />
                  <p className="band-title">{record[record.length - 1].artist}</p>
                  <p className="band-album center">{record[record.length - 1].recordTitle}</p>
                  <p className="center small">
                    Release Year: {record[record.length - 1].releaseYear},
                    Format: {record[record.length - 1].format}
                  </p>
                </NavLink>
                <br />
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="block content" />

    </div>
  )
}

export default Home
