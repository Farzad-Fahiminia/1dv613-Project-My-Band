import React, { useState } from 'react'

/**
 * Home component.
 *
 * @return {*} Returns component.
 */
function Home() {
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

  // const test = () => {
  //   fetch('http://localhost:8081/api/v1/records/62616235caa79834ef629410', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(() => {
  //      // history.go(-1)
  //     // history.push('/');
  //   })
  // }

  return (
    <div>
      <div className="header-section">
        <div className="content">

          <div className="left-part">
            <h1 className="frontpage-headline">music<br />playing<br />on stage.</h1>
            {record !== null && (
              <p>Performing now {record[record.length - 1].artist}</p>
            )}
          </div>

          <div className="right-part">
            {/* <h2>Recently added record</h2> */}
            {/* {record !== null && <p>{record.artist} - {record.recordTitle}</p>} */}
            {record !== null && (
              <div className="latest-record">
                <h2 className="recently-added">Recently added</h2>
                <img className="cover-image" src={record[record.length - 1].coverURL} alt="Cover" />
                <p className="band-title">{record[record.length - 1].artist}</p>
                <p className="band-album center">{record[record.length - 1].recordTitle}</p>
                <p className="center small">
                  Release Year: {record[record.length - 1].releaseYear},
                  Format: {record[record.length - 1].format}
                </p>
                <br />
              </div>
            )}
            {record === null && <p>No records were found.</p>}
          </div>

        </div>
      </div>
      <div className="block content">
        <h2>En ny sektion med innehåll?</h2>
        <p>En ny sektion med innehåll?</p>
      </div>

    </div>
  )
}

export default Home
