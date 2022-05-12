import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Edit component.
 *
 * @return {*} Returns component.
 */
function Edit() {
  const [artist, setArtist] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [format, setFormat] = useState('Vinyl');
  const [coverURL, setCoverURL] = useState('');
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const [getRecord, setRecord] = useState(null)

  /**
   * Fetches records.
   *
   * @returns {*} - Nothing.
   */
  function fetchData() {
    if (getRecord === null) {
      const apiUrl = 'http://localhost:8081/api/v1/records/'
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setRecord(data))
    }
  }

  fetchData()

  console.log(getRecord)

  const handleSubmit = (event) => {
    event.preventDefault()
    const record = {
      artist, recordTitle, releaseYear, format, coverURL
    }

    setIsPending(true)

    // fetch('http://localhost:8081/api/v1/records', {
    fetch('https://sonicred-resource-server.herokuapp.com/api/v1/records', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).then(() => {
      console.log(record)
      console.log('Record edited')
      setIsPending(false)
      // history.go(-1)
      navigate('/records')
    })
  }

  return (
    <div className="content create">
      <h2>Edit record</h2>
      <form onSubmit={handleSubmit}>
        <label>Artist:</label>
        <input type="text" required value={artist} onChange={(e) => setArtist(e.target.value)} />
        <label>Record title:</label>
        <input type="text" required value={recordTitle} onChange={(e) => setRecordTitle(e.target.value)} />
        <label>Release year:</label>
        <input type="number" required value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
        <label>Cover image URL:</label>
        <input type="text" required value={coverURL} onChange={(e) => setCoverURL(e.target.value)} />
        <label>Record format:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="Vinyl">Vinyl</option>
          <option value="CD">CD</option>
        </select>
        { !isPending && <button type="submit">Save Edit</button> }
        { isPending && <button disabled type="submit">Save Edit...</button> }
      </form>
    </div>
  )
}

export default Edit
