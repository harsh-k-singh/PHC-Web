import React,{useContext,useState,useEffect} from 'react';
import patientsDP from '../../images/patientsDP.jpg';
import AuthContext from "../../context/auth/AuthContext";
import '../../CSSFiles/SideProfile.css'

const PatientsSP = () => {
  const authContext = useContext(AuthContext);
  const {user} = authContext;
  const [age, setAge]= useState('Age here');
  
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
    }
    user?setAge(getAge(user.birth)):setAge('Age here');
  }, [user]);

  return (
    <div className="sideProfile card px-2 py-2 mx-2 shadow-sm">
    <ul className="nav flex-column text-center" style={{fontSize:20}}>
      <div className="card px-2 py-2 mx-2 my-2 mt-4 shadow-sm">
        <li><img className="text-center rounded-circle my-2" src={patientsDP} width="55%" height="150" border="2"/></li>
        <li className="my-8">{user ? user.email : 'email'}</li>
        <li>{user ? user.name : 'name'}</li>
        <li style={{fontSize:"2rem",color:"blue",margin:4}}>{user ? user.role : 'role'}</li>
      </div>
      <h3 style={{margin:8}}>Details</h3>
      <li>{user ? user.gender : 'Gender'}</li>
      <li>{user ? age : 'Age'}</li>
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
