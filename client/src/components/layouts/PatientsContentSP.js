import React, { useContext,useState,useEffect} from "react";
import PatientsDP from "../../images/patientsDP.jpg";
import styles from "../../CSSFiles/SideProfile.module.css";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const PatientsContentSP = (props) => {
    const [age, setAge] = useState("Age here");
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const { isMobile } = props;
    const navigate = useNavigate();
    useEffect(() => {
        const getAge = (dateString) => {
          var today = new Date();
          var birthDate = new Date(dateString);
          var curr = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            curr--;
          }
          return curr;
        };
        user ? setAge(getAge(user.birth)) : setAge("Age here");
      }, [user]);
  return (
    <div className={`${styles.sideProfile} card px-2 py-2 mx-2 shadow-sm  ${isMobile?'border-0':''}`}>
    <ul className='nav flex-column text-center'>
      <div className='card  border-2 mb-2 mt-3 shadow-sm' style={{width: '18rem',margin:"auto", fontSize:"1.4rem"}}>
        <li>
          <img
            className='text-center rounded-circle my-2'
            src={PatientsDP}
            width='45%'
            height='80%'
            border='2px solid black'
          />
        </li>
        <li className='my-8'>{user ? user.email : "email"}</li>
        <li>{user ? user.name : "name"}</li>
        <li style={{ fontSize: "2rem", color: "blue", margin: 4 }}>
          Patient
        </li>
      </div>
      <h3 style={{ margin: 8 }}>Details</h3>
      <li>{user ? user.gender : "Gender"}</li>
      <li>Age - {user ? age : "Age"}</li>
    </ul>
    <div className='mt-auto'>
      <div class='d-grid gap-2'>
        <button
          class='btn btn-outline-primary'
          onClick={() => navigate("/patient/profile")}
        >
          Manage Profile
        </button>
      </div>
    </div>
  </div>
  )
}

export default PatientsContentSP
