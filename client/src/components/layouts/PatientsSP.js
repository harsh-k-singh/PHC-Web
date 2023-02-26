import React from 'react';
import patientsDP from '../../images/patientsDP.jpg';
import '../../CSSFiles/SideProfile.css'

const PatientsSP = () => {

  return (
    <div className="sideProfile card px-2 py-2 mx-2 shadow-sm">
    <ul className="nav flex-column text-center" style={{fontSize:20}}>
      <div className="card px-2 py-2 mx-2 my-2 mt-4 shadow-sm">
        <li><img className="text-center rounded-circle my-2" src={patientsDP} width="55%" height="150" border="2"/></li>
        <li className="my-8">email</li>
        <li>Harsh Kushwaha</li>
        <li style={{fontSize:"2rem",color:"blue",margin:4}}>User</li>
      </div>
      <h3 style={{margin:8}}>Details</h3>
      <li>Male</li>
      <li>Age-21</li>
    </ul>
    <div className="mt-auto">
      <form action="/patient/profile">
        <div class="d-grid gap-2" href="/profile">
        <button class="btn btn-outline-primary" type="submit">Manage Profile</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default PatientsSP
