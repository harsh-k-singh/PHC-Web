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
    <ul className='nav flex-column text-center'>
      <div className='card  border-2 mb-2 mt-3 shadow-sm' style={{width: '18rem',margin:"auto", fontSize:"1.4rem"}}>
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
       <div class="card mt-2 mb-4 border-2 shadow-sm" style={{width: '18rem',margin:"auto", fontSize:"1.1rem",fontFamily:"monospace"}}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Monday - {user ? user.timing.monAT : "name"} - {user ? user.timing.monDT : "name"}</li>
          <li class="list-group-item">Tuseday - {user ? user.timing.tueAT : "name"} - {user ? user.timing.tueDT : "name"}</li>
          <li class="list-group-item">Wednesday - {user ? user.timing.wedAT : "name"} - {user ? user.timing.wedDT : "name"}</li>
          <li class="list-group-item">Thursday - {user ? user.timing.thuAT : "name"} - {user ? user.timing.thuDT : "name"}</li>
          <li class="list-group-item">Friday - {user ? user.timing.friAT : "name"} - {user ? user.timing.friDT : "name"}</li>
          <li class="list-group-item">Saturday - {user ? user.timing.satAT : "name"} - {user ? user.timing.satDT : "name"}</li>
          <li class="list-group-item">Sunday - {user ? user.timing.sunAT : "name"} - {user ? user.timing.sunDT : "name"}</li>
        </ul>
      </div>
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

