import React, { useContext } from "react";
import DoctorsDP from "../../images/DoctorsDP.png";
import "../../CSSFiles/SideProfile.css";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorSP = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate = useNavigate();
  return (
    <div className='sideProfile card px-2 py-2 mx-2 shadow-sm'>
      <ul className='nav flex-column text-center' style={{ fontSize: 20 }}>
        <div className='card px-2 py-2 mx-2 my-2 mt-4 shadow-sm'>
          <li>
            <img
              className='text-center rounded-circle my-2'
              src={DoctorsDP}
              width='55%'
              height='150'
              border='2'
            />
          </li>
          <li classNmae='my-8'>{user ? user.email : "email"}</li>
          <li>{user ? user.name : "name"}</li>
          <li style={{ fontSize: "2rem", color: "Green", margin: 4 }}>
            Doctor
          </li>
        </div>
        <h3 style={{ margin: 8 }}>Schedule</h3>
        <li>Monday-Saturday</li>
        <li>9:00 AM - 5:00 PM</li>
      </ul>
      <div className='mt-auto'>
        <div class='d-grid gap-2'>
          <button
            class='btn btn-outline-primary'
            onClick={() => navigate("/doctor/profile")}
          >
            Manage Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSP;
