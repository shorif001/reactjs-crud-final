import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';

const EmpEdit = () => {
  // routing a j id-name use korbo shei id-name tai ei id te dite hobe. example:
  // <Route exact path="/employee/details/:id" component={EmpDetails}></Route>
  const { id } = useParams();

  //const [empdata, empdatachange] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8000/employee/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      console.log(resp)
      // empdatachange(resp);
      nameChange(resp.name);
      emailChange(resp.email);
      phoneChange(resp.phone);
      activeChange(resp.isactive);
    }).catch((err) => {
      console.log(err)
    })
  }, [])



  // const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [active, activeChange] = useState(true);
  const [validation, valchange] = useState(false);

  const history = useHistory();

  const handlesubmit = (e) => {
    e.preventDefault();
    // console.log({ id, name, email, phone, active })
    const empdata = ({ id, name, email, phone, active })

    fetch(`http://localhost:8000/employee/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata)
    }).then((res) => {
      alert("Updated successfully")
      window.location.href = "/"
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ "textAlign": "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled="disabled" className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input required value={name} onMouseDown={e => valchange(true)} onChange={e => nameChange(e.target.value)} className='form-control' />
                      {name.length == 0 && validation && <span className='text-danger'>Enter the Name</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input value={email} onChange={e => emailChange(e.target.value)} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input value={phone} onChange={e => phoneChange(e.target.value)} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input checked={active} onChange={e => activeChange(e.target.checked)} type="checkbox" className='form-check-input' />
                      <label className='form-check-label'>Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className='btn btn-success' type='submit'>Save</button>
                      <Link to="/" className='btn btn-danger' >Back</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EmpEdit