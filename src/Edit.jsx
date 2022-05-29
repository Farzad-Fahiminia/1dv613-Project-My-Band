import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Edit component.
 *
 * @param {String} {
 *   artist, recordTitle, releaseYear, format, coverURL, id, session
 * }
 * @return {JSX} Returns component.
 */
function Edit({
  artist, recordTitle, releaseYear, format, coverURL, id, session
}) {
  const [thisArtist, setThisArtist] = useState('')
  const [thisRecordTitle, setThisRecordTitle] = useState('')
  const [thisReleaseYear, setReleaseYear] = useState('')
  const [thisFormat, setThisFormat] = useState('')
  const [thisCoverURL, setThisCoverURL] = useState('')
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const record = {
      artist: thisArtist || artist,
      recordTitle: thisRecordTitle || recordTitle,
      releaseYear: thisReleaseYear || releaseYear,
      format: thisFormat || format,
      coverURL: thisCoverURL || coverURL
    }

    setIsPending(true)

    // fetch(`http://localhost:8081/api/v1/records/${id}`, {
    fetch(`https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.stsTokenManager.accessToken}`
      },
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
