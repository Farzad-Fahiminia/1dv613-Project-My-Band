import React, { useState } from 'react'

/**
 * Home component.
 *
 * @return {*} Returns component.
 */
function Home() {
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

  // console.log(data)

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
      {/* <p>Homepage...</p>
      <br />
      <div className="event">
        <h1>Latest event</h1>
        <h2>
          {events[0].artist}
          {events[0].venue}
        </h2>
        <p>
          {events[0].country}
          ,Date:
          {events[0].year}
        </p>
        <br />
        <h4>Setlist</h4>
        <p>
          {events[0].setlist.map((song) => <p>{song}</p>)}
        </p>
      </div>

      <br />

      <div className="event">
        <h2>Recently added record</h2>
        <h3>
          {records[0].artist}
          {' '}
          -
          {records[0].album}
        </h3>
        <p>
          {records[0].format}
          ,
          {records[0].year}
        </p>
        <br />
        <h4>Playlist</h4>
        <p>
          {records[0].playlist.map((song) => <p>{song}</p>)}
        </p>
      </div>

      <br /> */}

      <div className="database">
        <h2>Recently added record</h2>
        {/* {record !== null && <p>{record.artist} - {record.recordTitle}</p>} */}
        {record !== null && record.map((records) => (
          <div>
            <p>{records.artist} - {records.recordTitle}, {records.releaseYear}</p>
            <p>{records.format}</p>
            <br />
          </div>
        ))}
        {/* <p>
          {record[0].format}
          ,
          {record[0].year}
        </p> */}
        {/* <br />
        <h4>Playlist</h4>
        <p>
          {record[0].playlist.map((song) => <p>{song}</p>)}
        </p> */}
      </div>
    </div>
  )
}

export default Home
