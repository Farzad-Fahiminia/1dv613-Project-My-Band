import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginContext from './Context'
import useFetch from './useFetch'

/**
 * Records component.
 *
 * @param {Object} { onEditHandler, session }
 * @return {JSX} Returns component.
 */
function Records({ onEditHandler, token }) {
  const [record, setRecord] = useState(null)
  const navigate = useNavigate()
  const { loggedIn } = useContext(LoginContext)
  const { data, error, isPending } = useFetch('https://sonicred-resource-server.herokuapp.com/api/v1/records')

  /**
   * Fetches records.
   *
   * @returns {*} - Records.
   */
  function fetchData() {
    if (record === null) {
      // const apiUrl = 'http://localhost:8081/api/v1/records/'
      const apiUrl = 'https://sonicred-resource-server.herokuapp.com/api/v1/records'
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
    const newList = record.filter((item) => item.id !== id)

    setRecord(newList)

    fetch(`https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(record)
    })
  }

  return (
    <div>
      <div className="record-header">
        <h1 className="center extreme">My records.</h1>
        {loggedIn === true && <NavLink to="/create"><button className="fixedbutton" type="button">+ Add Record</button></NavLink>}
      </div>
      <div className="content">

        <div className="database row">
          { isPending && <div className="loading">Loading...</div> }
          { error && <div>{ error }</div> }
          { data && record !== null && record.map((records) => (
            <form onSubmit={onClickHandler} className="record col" key={records.id}>
              <NavLink to={`/records/${records.id}`}>
                <input type="hidden" name="id" value={records.id} />
                <img className="cover-image" src={records.coverURL} alt="Cover" />
                <input type="hidden" name="coverURL" value={records.coverURL} />
                <p><b>{records.artist} - {records.recordTitle}</b></p>
                <input type="hidden" name="artist" value={records.artist} />
                <input type="hidden" name="recordTitle" value={records.recordTitle} />
                <p className="small">Released: {records.releaseYear}, Format: {records.format}</p>
                <input type="hidden" name="releaseYear" value={records.releaseYear} />
                <input type="hidden" name="format" value={records.format} />
              </NavLink>
              <br />
              {loggedIn === true && <button type="submit" className="removeBtnStyle">Edit record</button>}<br />
              {loggedIn === true && <button type="button" className="removeBtnStyle" onClick={() => handleRemove(records.id)}>Remove</button>}
              <br />
            </form>
          )).reverse()}
          {record === null && <p>No records were found.</p>}
        </div>

      </div>
    </div>
  )
}

export default Records
