import React, { useContext } from "react";
import AdminsDP from "../../images/AdminsDP.jpg";
import styles from "../../CSSFiles/SideProfile.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const AdminContentSP = (props) => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const { isMobile } = props;
    const navigate = useNavigate();
  return (
    <div className={`${styles.sideProfile} card px-2 py-2 mx-2 shadow-sm  ${isMobile?'border-0':''}`}>
    <ul className='nav flex-column text-center' style={{ fontSize: 20 }}>
      <div className='card px-2 py-2 mx-2 my-2 mt-4 shadow-sm'>
        <li>
          <img
            className='text-center rounded-circle my-2'
            src={AdminsDP}
            width='45%'
            height='80%'
            border='2px solid black'
          />
        </li>
        <li className='my-8'>{user ? user.email : "email"}</li>
        <li>{user ? user.name : "name"}</li>
        <li style={{ fontSize: "2rem", color: "Red", margin: 4 }}>Admin</li>
      </div>
    </ul>
    <div className='mt-auto'>
      <div class='d-grid gap-2'>
        <button
          class='btn btn-outline-primary'
          onClick={() => navigate("/admin/profile")}
        >
          Manage Profile
        </button>
      </div>
    </div>
  </div>
  )
}

export default AdminContentSP
