import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import Edit from './Edit'

/**
 * Records component.
 *
 * @return {*} Returns component.
 */
function Records() {
  const [record, setRecord] = useState(null)

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

  // console.log(record)

  return (
    <div>
      <div className="record-header">
        <h1 className="center light-text">My Records</h1>
        <NavLink to="/create"><button className="fixedbutton" type="submit">+ Add Record</button></NavLink>
        <p className="small center light-text">Collection</p>
      </div>
      <div className="content">

        <div className="database">
          {/* {record !== null && <p>{record.artist} - {record.recordTitle}</p>} */}
          {record !== null && record.map((records) => (
            <div className="record" key={records.id}>
              <img className="cover-image" src={records.coverURL} alt="Cover" />
              <p><b>{records.artist} - {records.recordTitle}</b></p>
              <p className="small">Released: {records.releaseYear}, Format: {records.format}</p>
              <p>Edit knapp</p>
              {/* <Edit /> */}
              <br />
            </div>
          )).reverse()}
          {record === null && <p>No records were found.</p>}
        </div>

      </div>
    </div>
  )
}

export default Records
