import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Create component.
 *
 * @param {*} props - Specific record.
 * @return {*} Returns component.
 */
function Edit({
  artist, recordTitle, releaseYear, format, coverURL, id
}) {
  const [thisArtist, setThisArtist] = useState('')
  const [thisRecordTitle, setThisRecordTitle] = useState('')
  const [thisReleaseYear, setReleaseYear] = useState('')
  const [thisFormat, setThisFormat] = useState('')
  const [thisCoverURL, setThisCoverURL] = useState('')
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault()
    const record = {
      artist: thisArtist,
      recordTitle: thisRecordTitle,
      releaseYear: thisReleaseYear,
      format: thisFormat,
      coverURL: thisCoverURL
    }

    setIsPending(true)

    // fetch('http://localhost:8081/api/v1/records', {
    fetch(`https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).then(() => {
      setIsPending(false)
      navigate('/records')
    })
  }

  const cancel = () => {
    navigate('/records')
  }

  return (
    <div>
      <h1 className="center extreme">Edit record.</h1>
      <div className="content create">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={id} />
          <label>Artist:</label>
          {/* <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} /> */}
          <input type="text" required defaultValue={artist} onChange={(e) => setThisArtist(e.target.value)} />
          <label>Record title:</label>
          <input type="text" required defaultValue={recordTitle} onChange={(e) => setThisRecordTitle(e.target.value)} />
          <label>Release year:</label>
          <input type="number" required defaultValue={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
          <label>Cover image URL:</label>
          <input type="text" required defaultValue={coverURL} onChange={(e) => setThisCoverURL(e.target.value)} />
          <label>Record format:</label>
          <select defaultValue={format} onChange={(e) => setThisFormat(e.target.value)}>
            <option value="Vinyl">Vinyl</option>
            <option value="CD">CD</option>
          </select>
          <button type="button" onClick={cancel}>Cancel</button>
          { !isPending && <button type="submit">Save Edit</button> }
          { isPending && <button disabled type="submit">Save Edit...</button> }
        </form>
      </div>
    </div>
  )
}

export default Edit
