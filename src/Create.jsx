import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Create component.
 *
 * @return {*} Returns component.
 */
function Create() {
  const [artist, setArtist] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [format, setFormat] = useState('Vinyl');
  const [coverURL, setCoverURL] = useState('');
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const record = {
      artist, recordTitle, releaseYear, format, coverURL
    }

    setIsPending(true)

    fetch('http://localhost:8081/api/v1/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).then(() => {
      console.log(record)
      console.log('new record added')
      setIsPending(false)
      // history.go(-1)
      navigate('/records')
    })
  }

  return (
    <div className="content create">
      <h2>Add a new record</h2>
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
        { !isPending && <button type="submit">Add Record</button> }
        { isPending && <button disabled type="submit">Add Record...</button> }
      </form>
    </div>
  )
}

export default Create
