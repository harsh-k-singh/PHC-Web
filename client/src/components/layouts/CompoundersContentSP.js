import React, { useContext, useState, useEffect } from "react";
import CompoundersDP from "../../images/compoundersDP.jpg";
import styles from "../../CSSFiles/SideProfile.module.css";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CompoundersContentSP = (props) => {
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
            src={CompoundersDP}
            width='45%'
           height="80%"
            border='2px solid black'
          />
        </li>
        <li classNmae='my-8'>{user ? user.email : "email"}</li>
        <li>{user ? user.name : "name"}</li>
        <li style={{ fontSize: "2rem", color: "Red", margin: 4 }}>
          Compounder
        </li>
      </div>
      <h3 style={{ margin: 8 }}>Schedule</h3>
    </ul>
    <div className='mt-auto'>
      <div class='d-grid gap-2'>
        <button
          class='btn btn-outline-primary'
          onClick={() => navigate("/compounder/profile")}
        >
          Manage Profile
        </button>
      </div>
    </div>
  </div>
  )
}

export default CompoundersContentSP

