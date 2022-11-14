import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Create component.
 *
 * @return {JSX} Returns component.
 */
function Create({ token }) {
  const [artist, setArtist] = useState('')
  const [recordTitle, setRecordTitle] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [format, setFormat] = useState('Vinyl')
  const [coverURL, setCoverURL] = useState('')
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const record = {
      artist, recordTitle, releaseYear, format, coverURL
    }

    setIsPending(true)

    // fetch('http://localhost:8081/api/v1/records', {
    // fetch('https://sonicred-resource-server.herokuapp.com/api/v1/records', {
    fetch('https://web-production-8fdc.up.railway.app/api/v1/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(record)
    }).then(() => {
      setIsPending(false)
      navigate('/records')
    })
  }

  return (
    <div>
      <h1 className="center extreme">Add a new record.</h1>
      <div className="content create">
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
    </div>
  )
}

export default Create
