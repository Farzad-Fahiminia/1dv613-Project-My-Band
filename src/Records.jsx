import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import Edit from './Edit'

/**
 * Records component.
 *
 * @return {*} Returns component.
 */
function Records({ onEditHandler }) {
  const [record, setRecord] = useState(null)
  const navigate = useNavigate()

  /**
   * Fetches records.
   *
   * @returns {*} - Nothing.
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

  // console.log(record)

  const onClickHandler = (event) => {
    event.preventDefault()
    onEditHandler({
      artist: event.target.querySelector('input[name="artist"]').value || '',
      recordTitle: event.target.querySelector('input[name="recordTitle"]').value || '',
      releaseYear: event.target.querySelector('input[name="releaseYear"]').value || '',
      format: event.target.querySelector('input[name="format"]').value || '',
      coverURL: event.target.querySelector('input[name="coverURL"]').value || ''
    })
    navigate('/edit')
  }

  /**
   *
   *
   * @param {*} id
   */
  function handleRemove(id) {
    console.log(id);
    const newList = record.filter((item) => item.id !== id);

    setRecord(newList);

    fetch(`https://sonicred-resource-server.herokuapp.com/api/v1/records/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).then(() => {
      // history.go(-1)
      // navigate('/records')
    })
  }

  return (
    <div>
      <div className="record-header">
        <h1 className="center extreme">My records.</h1>
        <NavLink to="/create"><button className="fixedbutton" type="submit">+ Add Record</button></NavLink>
      </div>
      <div className="content">

        <div className="database">
          {/* {record !== null && <p>{record.artist} - {record.recordTitle}</p>} */}
          {record !== null && record.map((records) => (
            <form onSubmit={onClickHandler} className="record" key={records.id}>
              <input type="hidden" name="id" value={records.id} />
              <img className="cover-image" src={records.coverURL} alt="Cover" />
              <input type="hidden" name="coverURL" value={records.coverURL} />
              <p><b>{records.artist} - {records.recordTitle}</b></p>
              <input type="hidden" name="artist" value={records.artist} />
              <input type="hidden" name="recordTitle" value={records.recordTitle} />
              <p className="small">Released: {records.releaseYear}, Format: {records.format}</p>
              <input type="hidden" name="releaseYear" value={records.releaseYear} />
              <input type="hidden" name="format" value={records.format} />
              <br />
              {/* <NavLink to="/edit" record="hej">Edit Record</NavLink> */}
              <button type="submit" className="edit">Edit record</button>
              <button type="button" onClick={() => handleRemove(records.id)}>
                Remove
              </button>
              {/* <Edit record={records} /> */}
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
