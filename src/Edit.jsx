import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Create component.
 *
 * @param {*} props - Specific record.
 * @return {*} Returns component.
 */
function Edit({
  artist, recordTitle, releaseYear, format, coverURL
}) {
  // const [artist, setArtist] = useState('');
  // const [recordTitle, setRecordTitle] = useState('');
  // const [releaseYear, setReleaseYear] = useState('');
  // const [format, setFormat] = useState('Vinyl');
  // const [coverURL, setCoverURL] = useState('');
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

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
      setIsPending(false)
      // history.go(-1)
      navigate('/records')
    })
  }

  return (
    <div>
      <h1 className="center extreme">Edit record.</h1>
      <div className="content create">
        <form onSubmit={handleSubmit}>
          <label>Artist:</label>
          {/* <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} /> */}
          <input type="text" required value={artist} />
          <label>Record title:</label>
          <input type="text" required value={recordTitle} />
          <label>Release year:</label>
          <input type="number" required value={releaseYear} />
          <label>Cover image URL:</label>
          <input type="text" required value={coverURL} />
          <label>Record format:</label>
          <select value={format}>
            <option value="Vinyl">Vinyl</option>
            <option value="CD">CD</option>
          </select>
          { !isPending && <button type="submit">Save Edit</button> }
          { isPending && <button disabled type="submit">Save Edit...</button> }
        </form>
      </div>
    </div>
  )
}

export default Edit
