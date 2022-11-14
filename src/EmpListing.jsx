import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);

  const history = useHistory();

  const LoadDetail = (id) => {
    // window.location.href = "/employee/details/" + id
    history.push("/employee/details/" + id)
  }
  const LoadEdit = (id) => {
    history.push("/employee/edit/" + id)
  }
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch(`http://localhost:8000/employee/${id}`, {
        method: "DELETE",
      }).then((res) => {
        alert("Removed successfully")
        window.location.reload();
      }).catch((err) => {
        console.log(err.message);
      })
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/employee").then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <div className='container'>
        <div className="card">
          <div className="card-title">
            <h2>Employee Listing</h2>
          </div>
          <div className="card-body">
            <div className='divbtn'>
              <Link to="employee/create" className='btn btn-success'>Add Employee ( + )</Link>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr className='bg-dark text-white'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {empdata && empdata.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a onClick={() => { LoadDetail(item.id) }} className='btn btn-primary'>View</a> |
                      <a onClick={() => { LoadEdit(item.id) }} className='btn btn-warning'>Edit</a> |
                      <a onClick={() => { Removefunction(item.id) }} className='btn btn-danger'>Delete</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmpListing