import React from 'react'

const events = [
  {
    id: 1,
    artist: 'Pearl Jam',
    setlist: ['Go', 'Animal', 'Oceans'],
    venue: 'Sjöhistoriska Museet',
    country: 'Germany',
    city: 'Berlin',
    year: 2018
  }
]

const records = [
  {
    id: 1,
    artist: 'Foo Fighters',
    playlist: ['Everlong', 'My Hero', 'Shame'],
    album: 'The Colour and the Shape',
    year: 1996,
    format: 'Vinyl'
  }
]

/**
 * Home component.
 *
 * @return {*} Returns component.
 */
function Home() {
  const fetchData = async () => {
    const data = await fetch('http://localhost:8081/api/v1/records/62616235caa79834ef629410')
    const jsonData = await data.json()
    // console.log(jsonData)
    return jsonData
  }

  fetchData()

  // console.log(fetchData)

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
      <p>Homepage...</p>

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

      <br />

      <div className="database">
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
    </div>
  )
}

export default Home
