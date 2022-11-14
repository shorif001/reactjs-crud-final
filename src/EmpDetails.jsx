import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EmpDetails = () => {
  // routing a j id-name use korbo shei id-name tai ei id te dite hobe. example:
  // <Route exact path="/employee/details/:id" component={EmpDetails}></Route>
  const { id } = useParams();

  const [empdata, empdatachange] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8000/employee/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      console.log(resp)
      empdatachange(resp);
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <>
      {empdata &&
        <div>
          <h2>The Employee Name is : <b>{empdata.name}</b> ({empdata.id})</h2>
          <h3>Contact Details</h3>
          <h5>Email is : {empdata.email}</h5>
          <h5>Phone is : {empdata.phone}</h5>
          <Link className='btn btn-danger' to="/">Back to Listing</Link>
        </div>
      }
    </>
  )
}

export default EmpDetails