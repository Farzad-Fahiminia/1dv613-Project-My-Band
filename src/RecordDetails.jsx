import React, { useState, useContext } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import LoginContext from './Context'
import useFetch from './useFetch'

/**
 * Records component.
 *
 * @param {Object} { onEditHandler, session }
 * @return {*} Returns component.
 */
function RecordDetails({ onEditHandler, session }) {
  const { id } = useParams()
  const [record, setRecord] = useState(null)
  const [records, setRecords] = useState(null)
  const navigate = useNavigate()
  const { loggedIn } = useContext(LoginContext)
  const { data, error, isPending } = useFetch(`https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`)

  /**
   * Fetches records.
   *
   * @returns {*} - Nothing.
   */
  function fetchData() {
    if (records === null) {
      fetch('https://sonicred-resource-server.herokuapp.com/api/v1/records')
        .then((response) => response.json())
        .then((data) => setRecords(data))

      // const apiUrl = 'http://localhost:8081/api/v1/records/'
      const apiUrl = `https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setRecord(data))
    }
  }

  fetchData()

  const onClickHandler = (event) => {
    event.preventDefault()
    onEditHandler({
      artist: event.target.querySelector('input[name="artist"]').value || '',
      recordTitle: event.target.querySelector('input[name="recordTitle"]').value || '',
      releaseYear: event.target.querySelector('input[name="releaseYear"]').value || '',
      format: event.target.querySelector('input[name="format"]').value || '',
      coverURL: event.target.querySelector('input[name="coverURL"]').value || '',
      id: event.target.querySelector('input[name="id"]').value || ''
    })
    navigate('/edit')
  }

  const handleRemove = (id) => {
    const newList = records.filter((item) => item.id !== id)

    setRecords(newList)

    fetch(`https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.stsTokenManager.accessToken}`
      },
      body: JSON.stringify(records)
    }).then(() => {
      navigate('/records')
    })
  }

  return (
    <div>
      <div className="record-header">
        {loggedIn === true && <NavLink to="/create"><button className="fixedbutton" type="button">+ Add Record</button></NavLink>}
      </div>
      <div className="content">

        <div className="database row-record">
          { isPending && <div className="loading">Loading...</div> }
          { error && <div>{ error }</div> }
          { data && record !== null && (
            <form onSubmit={onClickHandler} className="col-record" key={record.id}>
              <input type="hidden" name="id" value={record.id} />
              <div className="left">
                <img className="cover-image cover-big float-left" src={record.coverURL} alt="Cover" />
                <input type="hidden" name="coverURL" value={record.coverURL} />
              </div>
              <div className="right">
                <h1 className="large">{record.artist}</h1>
                <input type="hidden" name="artist" value={record.artist} />
                <p>Album: {record.recordTitle}</p>
                <input type="hidden" name="recordTitle" value={record.recordTitle} />
                <p>Release Year: {record.releaseYear}</p>
                <input type="hidden" name="releaseYear" value={record.releaseYear} />
                <p>Format: {record.format}</p>
                <input type="hidden" name="format" value={record.format} />
                <br />
                <p className="medium uppercase">Tracklist</p>
                <p>Coming Soon</p>
              </div>
              <br />
              <div className="button-container">
                {loggedIn === true && <button type="submit">Edit record</button>}
                {loggedIn === true && <button type="button" onClick={() => handleRemove(record.id)}>Remove</button>}
              </div>
              <br />
            </form>
          )}
          {record === null && <p>No records were found.</p>}
        </div>

      </div>
    </div>
  )
}

export default RecordDetails
