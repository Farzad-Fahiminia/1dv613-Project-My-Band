import React, { useState } from 'react'

/**
 * Home component.
 *
 * @return {*} Returns component.
 */
function Records() {
  const [record, setRecord] = useState(null)

  // const record = fetch('http://localhost:8081/api/v1/records/62616235caa79834ef629410', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  //   // body: JSON.stringify(record)
  // }).then(() => {
  //   console.log('Get record REACT')
  //   // setIsPending(false)
  //   // history.go(-1)
  //   // history.push('/')
  // })
  // console.log(record)

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

  // const test = () => {
  //   fetch('http://localhost:8081/api/v1/records/62616235caa79834ef629410', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(() => {
  //     // history.push('/');
  //   })
  // }

  return (
    <div className="content">

      <div className="database">
        <h2>Recently added record</h2>
        {/* {record !== null && <p>{record.artist} - {record.recordTitle}</p>} */}
        {record !== null && record.map((records) => (
          <div className="record" key={records.id}>
            <p>{records.artist} - {records.recordTitle}, {records.releaseYear}
              ({records.format})
            </p>
            <br />
          </div>
        ))}
        {record === null && <p>No records were found.</p>}
      </div>

      {/* <div className="database">
        <h2>Recently added record</h2>
        {record !== null && (
          <div>
            <p>Artist: {record[record.length - 1].artist}</p>
            <p>Album: {record[record.length - 1].recordTitle}</p>
            <p>Year: {record[record.length - 1].releaseYear}</p>
            <p>Format: {record[record.length - 1].format}</p>
            <br />
          </div>
        )}
        {record === null && <p>No records were found.</p>}
      </div> */}

    </div>
  )
}

export default Records
