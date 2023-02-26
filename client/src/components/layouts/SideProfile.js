import React from 'react';
import DoctorsDP from '../../images/DoctorsDP.png';
import '../../CSSFiles/SideProfile.css'

const SideProfile = () => {
  return (
    <div className="sideProfile card px-2 py-2 mx-2 shadow-sm">
    <ul className="nav flex-column text-center" style={{fontSize:20}}>
      <div className="card px-2 py-2 mx-2 my-2 mt-4 shadow-sm">
        <li><img className="text-center rounded-circle my-2" src={DoctorsDP} width="55%" height="150" border="2"/></li>
        <li className="my-8">20bcs096@iiitdmj.ac.in</li>
        <li>Harsh Kushwaha</li>
        <li style={{fontSize:"2rem",color:"Green",margin:4}}>Doctor</li>
      </div>
      <h3 style={{margin:8}}>Schedule</h3>
      <li>Monday-Saturday</li>
      <li>9:00 AM - 5:00 PM</li>
    </ul>
    <div className="mt-auto">
      <form action="/doctor/profile">
        <div class="d-grid gap-2" href="/profile">
        <button class="btn btn-outline-primary" type="submit">Manage Profile</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default SideProfile
