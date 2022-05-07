import React, { useState } from 'react'

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
      const apiUrl = 'http://localhost:8081/api/v1/records/'
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setRecord(data))
    }
  }

  fetchData()

  // console.log(record)

  return (
    <div className="content">

      <div className="database">
        <h1>My Records</h1>
        {/* {record !== null && <p>{record.artist} - {record.recordTitle}</p>} */}
        {record !== null && record.map((records) => (
          <div className="record" key={records.id}>
            <img className="cover-image" src={records.coverURL} alt="Cover" />
            <p><b>{records.artist} - {records.recordTitle}</b></p>
            <p className="small">Released: {records.releaseYear}, Format: {records.format}</p>
            <br />
          </div>
        )).reverse()}
        {record === null && <p>No records were found.</p>}
      </div>

    </div>
  )
}

export default Records
